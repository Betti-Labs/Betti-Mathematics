import React, { useState, useEffect } from 'react';
import { OntologicalCompressor } from './engine/BettiMath';
import { CheckCircle, XCircle, Activity } from 'lucide-react';

const Verification = () => {
    const [results, setResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const runVerification = () => {
        setIsRunning(true);

        // Simulate a small delay to show loading state
        setTimeout(() => {
            try {
                const compressor = new OntologicalCompressor();

                // 1. Create Structure
                const structure = compressor.createStructure(15, 0.4);

                // 2. Compress
                const compressed = compressor.compress(structure, 0.6);

                // 3. Analyze
                const coherence = compressor.codex.analyzeCoherence(compressed);
                const evolution = compressor.codex.evolve(3);

                setResults({
                    structure,
                    compressed,
                    coherence,
                    evolution,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                console.error("Verification failed:", error);
            } finally {
                setIsRunning(false);
            }
        }, 500);
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white font-mono">
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 border-b border-gray-700 pb-4">
                    <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                        <Activity /> Betti Math Engine Verification
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Compare these results with your local Python output to verify the JavaScript port.
                    </p>
                </header>

                <button
                    onClick={runVerification}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                >
                    {isRunning ? 'Running Simulation...' : 'Run Verification Suite'}
                </button>

                {results && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Section 1: Structure Creation */}
                        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-purple-400 mb-4">1. Ontological Structure</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Complexity:</span>
                                    <span>{results.structure.complexity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Relationships:</span>
                                    <span>{Object.keys(results.structure.relationships).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Semantic Concepts:</span>
                                    <span>{Object.keys(results.structure.semanticContent).length}</span>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Compression Results */}
                        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-green-400 mb-4">2. Compression Results</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Original Complexity:</span>
                                    <span>{results.compressed.originalComplexity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Compressed Complexity:</span>
                                    <span>{results.compressed.compressedComplexity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Compression Ratio:</span>
                                    <span className="font-bold text-blue-300">{results.compressed.compressionRatio.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Coherence Amplitude:</span>
                                    <span className="font-bold text-yellow-300">{results.compressed.coherenceAmplitude.toFixed(3)}</span>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Evolution Analysis */}
                        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-pink-400 mb-4">3. Recursive Evolution</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Stable Symbols:</span>
                                    <span>{results.evolution.stableSymbols.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Avg Coherence (History):</span>
                                    <span>
                                        {(results.evolution.coherenceHistory.reduce((a, b) => a + b, 0) / results.evolution.coherenceHistory.length).toFixed(3)}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-sm text-blue-200">
                            <strong>Verification Note:</strong> If these numbers align with your Python script's output (allowing for random seed differences), the JavaScript engine is valid.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Verification;
