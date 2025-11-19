import React from 'react';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const CosmicEnvironment = () => {
    return (
        <>
            {/* Deep Space Background */}
            <color attach="background" args={['#020205']} />
            <fog attach="fog" args={['#020205', 10, 100]} />

            {/* Starfield */}
            <Stars
                radius={100}
                depth={50}
                count={7000}
                factor={4}
                saturation={0.5}
                fade
                speed={0.5}
            />

            {/* Post Processing for "Cinematic" Look */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.2}
                    mipmapBlur
                    intensity={1.5}
                    radius={0.5}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

            {/* Ambient Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4488ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4488" />
        </>
    );
};

export default CosmicEnvironment;
