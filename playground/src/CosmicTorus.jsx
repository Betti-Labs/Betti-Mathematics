import React, { useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CosmicEnvironment from './components/CosmicEnvironment';
import TextShatter from './components/TextShatter';
import { OntologicalCompressor } from './engine/BettiMath';

const CosmicTorus = () => {
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
            setTimeout(() => {
                setIsCollapsing(false);
                setMetrics(null);
            }, 8000);
        }, 1000);
    };

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Cinematic UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none flex justify-between items-start">
                <div>
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 tracking-tighter drop-shadow-[0_0_10px_rgba(0,200,255,0.5)]">
                        BETTI MATHEMATICS
                    </h1>
                    <p className="text-blue-300/60 text-sm tracking-[0.3em] mt-2 uppercase font-light">
                        Ontological Compression Engine v2.0
                    </p>
                </div>

                <div className="text-right">
                    <div className="text-xs text-blue-400/50 uppercase tracking-widest mb-1">System Status</div>
                    <div className={`text-sm font-mono ${isCollapsing ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                        {isCollapsing ? '>> SINGULARITY FORMING <<' : '>> SYSTEM IDLE <<'}
                    </div>
                </div>
            </div>

            {/* Center Action Button */}
            {!isCollapsing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                        onClick={handleCollapse}
                        className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-none border border-blue-500/30 hover:border-blue-400 transition-all duration-500"
                    >
                        <div className="absolute inset-0 w-full h-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-500 blur-xl"></div>
                        <span className="relative text-blue-100 font-light tracking-[0.5em] text-lg group-hover:text-white transition-colors">
                            INITIATE
                        </span>
                    </button>
                </div>
            )}

            {/* Metrics HUD */}
            {metrics && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl flex justify-center gap-12 pointer-events-none animate-fade-in-up">
                    <div className="bg-black/40 backdrop-blur-md border-t border-blue-500/50 p-6 flex-1 text-center">
                        <div className="text-xs text-blue-400 uppercase tracking-widest mb-2">Compression Ratio</div>
                        <div className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,100,255,0.8)]">
                            {metrics.ratio}x
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border-t border-purple-500/50 p-6 flex-1 text-center">
                        <div className="text-xs text-purple-400 uppercase tracking-widest mb-2">Coherence Amplitude</div>
                        <div className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(200,0,255,0.8)]">
                            {metrics.coherence.toFixed(3)}
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border-t border-cyan-500/50 p-6 flex-1 text-center">
                        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">Entropy Reduction</div>
                        <div className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
                            {((1 - metrics.final / metrics.original) * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
            )}

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <CosmicEnvironment />
                    <TextShatter
                        text="BETTI MATH"
                        isCollapsing={isCollapsing}
                    />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={isCollapsing ? 2.0 : 0.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CosmicTorus;
