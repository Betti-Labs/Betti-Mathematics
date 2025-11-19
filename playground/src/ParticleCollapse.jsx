import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { OntologicalCompressor } from './engine/BettiMath';

const ParticleSystem = ({ isCollapsing, onComplete }) => {
    const count = 2000;
    const mesh = useRef();
    const [dummy] = useState(() => new THREE.Object3D());

    // Initialize particles with random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;

            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0, mz: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;

            if (isCollapsing) {
                // Collapse logic: Move towards center (0,0,0)
                particle.x += (0 - particle.x) * 0.05;
                particle.y += (0 - particle.y) * 0.05;
                particle.z += (0 - particle.z) * 0.05;

                // Add some swirl
                particle.x += Math.sin(t) * 0.1;
                particle.z += Math.cos(t) * 0.1;
            } else {
                // Idle logic: Float around
                t = particle.t += speed / 2;
                const a = Math.cos(t) + Math.sin(t * 1) / 10;
                const b = Math.sin(t) + Math.cos(t * 2) / 10;
                const s = Math.cos(t);

                particle.mx += (state.mouse.x * 10 - particle.mx) * 0.01;
                particle.my += (state.mouse.y * 10 - particle.my) * 0.01;

                dummy.position.set(
                    (particle.x + particle.mx) + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                    (particle.y + particle.my) + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                    (particle.z + particle.mz) + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                );
            }

            // Update matrix
            if (isCollapsing) {
                dummy.position.set(particle.x, particle.y, particle.z);
            }

            const scale = isCollapsing ? Math.max(0.1, 1 - (100 - Math.abs(particle.x)) / 100) : 1;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#00aaff" emissive="#0044aa" emissiveIntensity={0.5} />
        </instancedMesh>
    );
};

const ParticleCollapse = () => {
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [metrics, setMetrics] = useState(null);
    const compressor = useMemo(() => new OntologicalCompressor(), []);

    const handleCollapse = () => {
        setIsCollapsing(true);

        // Run actual compression in background
        setTimeout(() => {
            const structure = compressor.createStructure(50, 0.5);
            const compressed = compressor.compress(structure, 0.2);
            setMetrics({
                ratio: compressed.compressionRatio,
                coherence: compressed.coherenceAmplitude,
                original: compressed.originalComplexity,
                final: compressed.compressedComplexity
            });

            // Reset animation after delay
            setTimeout(() => setIsCollapsing(false), 3000);
        }, 500);
    };

    return (
        <div className="w-full h-screen bg-black relative">
            {/* UI Overlay */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
                    Ontological Singularity
                </h1>
                <p className="text-blue-200/70 text-sm tracking-widest uppercase">
                    Interactive 3D Compression Engine
                </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6">
                {metrics && (
                    <div className="flex gap-8 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-blue-500/30 text-blue-100 animate-fade-in-up">
                        <div className="text-center">
                            <div className="text-xs text-blue-400 uppercase tracking-wider">Compression</div>
                            <div className="text-2xl font-bold">{metrics.ratio}x</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-purple-400 uppercase tracking-wider">Coherence</div>
                            <div className="text-2xl font-bold">{metrics.coherence.toFixed(3)}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-cyan-400 uppercase tracking-wider">Entropy Reduction</div>
                            <div className="text-2xl font-bold">
                                {((1 - metrics.final / metrics.original) * 100).toFixed(0)}%
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleCollapse}
                    disabled={isCollapsing}
                    className={`
            px-8 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-500
            ${isCollapsing
                            ? 'bg-blue-900/50 text-blue-400 scale-95 cursor-wait'
                            : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(0,100,255,0.5)]'
                        }
          `}
                >
                    {isCollapsing ? 'COLLAPSING ONTOLOGY...' : 'INITIATE COMPRESSION'}
                </button>
            </div>

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 10, 50]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ParticleSystem isCollapsing={isCollapsing} />
                </Float>

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default ParticleCollapse;
