import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, GitBranch, Box } from 'lucide-react';

const FractalCollapse = () => {
    const [input, setInput] = useState("Betti Mathematics: Ontological Compression through Recursive Symbolic Codex");
    const [nodes, setNodes] = useState([]);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [iteration, setIteration] = useState(0);

    // Initialize nodes from input
    useEffect(() => {
        if (!isCollapsing) {
            const words = input.split(' ').filter(w => w.length > 0);
            const newNodes = words.map((word, i) => ({
                id: `node-${i}`,
                text: word,
                x: (i + 1) * (800 / (words.length + 1)),
                y: 50,
                level: 0,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
            }));
            setNodes(newNodes);
            setIteration(0);
        }
    }, [input, isCollapsing]);

    const collapseStep = () => {
        if (nodes.length <= 1) return;

        setIsCollapsing(true);
        setIteration(prev => prev + 1);

        // Group nodes in pairs
        const nextNodes = [];
        for (let i = 0; i < nodes.length; i += 2) {
            if (i + 1 < nodes.length) {
                const left = nodes[i];
                const right = nodes[i + 1];
                nextNodes.push({
                    id: `node-${iteration + 1}-${i}`,
                    text: left.text.substring(0, 2) + right.text.substring(0, 2), // Symbolic hash
                    x: (left.x + right.x) / 2,
                    y: left.y + 60,
                    level: left.level + 1,
                    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    parents: [left, right]
                });
            } else {
                // Carry over odd node
                const node = nodes[i];
                nextNodes.push({
                    ...node,
                    y: node.y + 60
                });
            }
        }
        setNodes(nextNodes);
    };

    const reset = () => {
        setIsCollapsing(false);
        setIteration(0);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-xl shadow-2xl text-white">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Fractal Collapse Engine
                </h2>
                <p className="text-gray-400 mt-2">Recursive Symbolic Codex Visualization</p>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter text to compress..."
                    disabled={isCollapsing}
                />
                <button
                    onClick={collapseStep}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all active:scale-95"
                >
                    <Play size={18} /> Collapse
                </button>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all active:scale-95"
                >
                    <RefreshCw size={18} /> Reset
                </button>
            </div>

            <div className="relative h-[400px] bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <GitBranch size={200} />
                </div>

                <svg className="w-full h-full">
                    <AnimatePresence>
                        {nodes.map((node) => (
                            <g key={node.id}>
                                {node.parents && node.parents.map(parent => (
                                    <motion.line
                                        key={`link-${parent.id}-${node.id}`}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.5 }}
                                        x1={parent.x}
                                        y1={parent.y}
                                        x2={node.x}
                                        y2={node.y}
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth="2"
                                    />
                                ))}
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                >
                                    <circle
                                        r={20}
                                        fill={node.color}
                                        className="filter drop-shadow-lg"
                                    />
                                    <text
                                        y={5}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="10"
                                        fontWeight="bold"
                                        className="pointer-events-none"
                                    >
                                        {node.text.substring(0, 3)}
                                    </text>
                                </motion.g>
                            </g>
                        ))}
                    </AnimatePresence>
                </svg>

                <div className="absolute bottom-4 right-4 flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Box size={14} />
                        <span>Nodes: {nodes.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GitBranch size={14} />
                        <span>Iteration: {iteration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FractalCollapse;
