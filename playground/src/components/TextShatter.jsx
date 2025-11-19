import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader, TextGeometry, MeshSurfaceSampler } from 'three-stdlib';

const TextShatter = ({ text = "BETTI MATH", isCollapsing }) => {
    const mesh = useRef();
    const [dummy] = useState(() => new THREE.Object3D());

    // Load font asynchronously
    const font = useLoader(FontLoader, 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json');

    // 1. Generate Particles from Text Geometry
    const particles = useMemo(() => {
        const geometry = new TextGeometry(text, {
            font: font,
            size: 2,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        geometry.center();

        // Sample points from the surface of the text
        const tempMesh = new THREE.Mesh(geometry);
        const sampler = new MeshSurfaceSampler(tempMesh).build();
        const count = 3000; // Number of particles
        const tempParticles = [];
        const _position = new THREE.Vector3();
        const _normal = new THREE.Vector3();

        for (let i = 0; i < count; i++) {
            sampler.sample(_position, _normal);
            tempParticles.push({
                // Initial "Text" Position
                ox: _position.x,
                oy: _position.y,
                oz: _position.z,

                // Current Position
                x: _position.x,
                y: _position.y,
                z: _position.z,

                // Torus Target Position (Calculated later)
                tx: 0, ty: 0, tz: 0,

                // Animation State
                speed: 0.02 + Math.random() * 0.05,
                offset: Math.random() * 100,
                angle: Math.random() * Math.PI * 2, // For torus mapping
                tubeAngle: Math.random() * Math.PI * 2
            });
        }

        return tempParticles;
    }, [text, font]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        const R = 4; // Major radius of Torus
        const r = 1.5; // Minor radius of Torus

        particles.forEach((p, i) => {
            if (isCollapsing) {
                // === COLLAPSE PHASE: Text -> Torus ===

                // Calculate Torus Target Position
                // Torus parametric equation:
                // x = (R + r * cos(theta)) * cos(phi)
                // y = (R + r * cos(theta)) * sin(phi)
                // z = r * sin(theta)

                // Animate angles for swirling effect
                const theta = p.tubeAngle + time * p.speed * 2; // Tube rotation
                const phi = p.angle + time * p.speed;           // Ring rotation

                const tx = (R + r * Math.cos(theta)) * Math.cos(phi);
                const ty = (R + r * Math.cos(theta)) * Math.sin(phi);
                const tz = r * Math.sin(theta);

                // Interpolate towards Torus position
                p.x += (tx - p.x) * 0.03;
                p.y += (ty - p.y) * 0.03;
                p.z += (tz - p.z) * 0.03;

            } else {
                // === IDLE PHASE: Floating Text ===
                // Slight hover effect
                const hoverX = Math.sin(time + p.ox) * 0.05;
                const hoverY = Math.cos(time + p.oy) * 0.05;

                // Return to original text shape
                p.x += (p.ox + hoverX - p.x) * 0.1;
                p.y += (p.oy + hoverY - p.y) * 0.1;
                p.z += (p.oz - p.z) * 0.1;
            }

            // Update Instance Matrix
            dummy.position.set(p.x, p.y, p.z);

            // Scale particles based on state
            const scale = isCollapsing ? 0.08 : 0.05;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, particles.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={isCollapsing ? "#00ffff" : "#ffffff"}
                emissive={isCollapsing ? "#0088ff" : "#444444"}
                emissiveIntensity={2}
                toneMapped={false}
            />
        </instancedMesh>
    );
};

export default TextShatter;
