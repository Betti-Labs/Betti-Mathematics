/**
 * Betti Mathematics: Ontological Compression through Recursive Symbolic Codex
 * Core Implementation - BettiMath.js
 * 
 * Ported from collapse.py
 */

// Utility for random generation (seeded if needed in future)
const random = () => Math.random();

/**
 * Represents an ontological structure for compression operations.
 */
export class OntologicalStructure {
    constructor({ complexity, relationships, semanticContent, structureId }) {
        this.complexity = complexity;
        this.relationships = relationships;
        this.semanticContent = semanticContent;
        this.structureId = structureId;
        this.metadata = {
            creationTimestamp: new Date().toISOString(),
            frameworkVersion: 'Betti-Math-0.1-JS-Port'
        };
    }
}

/**
 * Represents the result of ontological compression operations.
 */
export class CompressedStructure {
    constructor({
        originalComplexity,
        compressedComplexity,
        preservedRelationships,
        preservedSemantics,
        compressionRatio,
        coherenceAmplitude,
        structureId,
        compressionMetadata
    }) {
        this.originalComplexity = originalComplexity;
        this.compressedComplexity = compressedComplexity;
        this.preservedRelationships = preservedRelationships;
        this.preservedSemantics = preservedSemantics;
        this.compressionRatio = compressionRatio;
        this.coherenceAmplitude = coherenceAmplitude;
        this.structureId = structureId;
        this.compressionMetadata = compressionMetadata || {};
    }
}

/**
 * Implementation of Recursive Symbolic Codex.
 */
export class RecursiveSymbolicCodex {
    constructor(symbolSetSize = 10, maxIterations = 100) {
        this.symbolSet = this._initializeSymbolSet(symbolSetSize);
        this.maxIterations = maxIterations;
        this.evolutionHistory = [];
        this.coherenceThreshold = 0.7;
    }

    _initializeSymbolSet(size) {
        const symbols = {};
        for (let i = 0; i < size; i++) {
            symbols[`s_${i}`] = {
                value: random(),
                relationships: [],
                coherenceWeight: 1.0,
                recursiveDepth: 0
            };
        }
        return symbols;
    }

    _symbolicMerge(symbolA, symbolB) {
        if (!this.symbolSet[symbolA] || !this.symbolSet[symbolB]) {
            throw new Error("Symbols not found in current set");
        }

        const sA = this.symbolSet[symbolA];
        const sB = this.symbolSet[symbolB];

        const mergedValue = (sA.value + sB.value) / 2;
        const mergedCoherence = Math.min(sA.coherenceWeight, sB.coherenceWeight);

        return {
            value: mergedValue,
            relationships: [...sA.relationships, ...sB.relationships],
            coherenceWeight: mergedCoherence,
            recursiveDepth: Math.max(sA.recursiveDepth, sB.recursiveDepth) + 1
        };
    }

    _recursiveTransform(symbol, depth = 1) {
        if (!this.symbolSet[symbol]) {
            throw new Error(`Symbol ${symbol} not found`);
        }

        // Deep copy
        const current = JSON.parse(JSON.stringify(this.symbolSet[symbol]));

        for (let i = 0; i < depth; i++) {
            // Theoretical recursive transformation
            current.value = Math.sin(current.value * Math.PI) * current.coherenceWeight;
            current.recursiveDepth += 1;

            // Coherence decay
            current.coherenceWeight *= 0.95;
        }

        return current;
    }

    _coherenceStabilize(symbol) {
        if (!this.symbolSet[symbol]) return 0.0;

        const s = this.symbolSet[symbol];

        const baseCoherence = s.coherenceWeight;
        const depthPenalty = 1.0 / (1.0 + s.recursiveDepth * 0.1);
        const relationshipStability = s.relationships.length * 0.05;

        const coherenceAmplitude = baseCoherence * depthPenalty + relationshipStability;
        return Math.min(coherenceAmplitude, 1.0);
    }

    _identityCollapse(symbol) {
        const coherence = this._coherenceStabilize(symbol);
        return coherence > this.coherenceThreshold;
    }

    evolve(iterations = 1) {
        const evolutionData = {
            initialState: Object.keys(this.symbolSet).length,
            iterations: iterations,
            coherenceHistory: [],
            stableSymbols: []
        };

        for (let i = 0; i < iterations; i++) {
            const iterationCoherence = [];

            // Apply recursive operations
            Object.keys(this.symbolSet).forEach(symbolId => {
                const coherence = this._coherenceStabilize(symbolId);
                iterationCoherence.push(coherence);

                // Transform
                const transformed = this._recursiveTransform(symbolId);
                this.symbolSet[symbolId] = transformed;

                // Check stability
                if (this._identityCollapse(symbolId)) {
                    evolutionData.stableSymbols.push(symbolId);
                }
            });

            const avgCoherence = iterationCoherence.reduce((a, b) => a + b, 0) / iterationCoherence.length;
            evolutionData.coherenceHistory.push(avgCoherence);
        }

        this.evolutionHistory.push(evolutionData);
        return evolutionData;
    }

    analyzeCoherence(structure) {
        if (structure instanceof OntologicalStructure) {
            const complexityFactor = 1.0 / (1.0 + structure.complexity * 0.01);
            const relationshipFactor = Object.keys(structure.relationships).length * 0.1;
            const semanticFactor = Object.keys(structure.semanticContent).length * 0.05;

            const coherence = complexityFactor + relationshipFactor + semanticFactor;
            return Math.min(coherence, 1.0);
        } else if (structure instanceof CompressedStructure) {
            return structure.coherenceAmplitude;
        } else {
            throw new Error("Unsupported structure type");
        }
    }
}

/**
 * Core implementation of ontological compression operations.
 */
export class OntologicalCompressor {
    constructor(compressionAlgorithm = 'recursive_symbolic') {
        this.algorithm = compressionAlgorithm;
        this.compressionHistory = [];
        this.codex = new RecursiveSymbolicCodex();
    }

    createStructure(complexity, relationshipDensity = 0.3) {
        const numRelationships = Math.floor(complexity * relationshipDensity);
        const relationships = {};

        for (let i = 0; i < numRelationships; i++) {
            const relId = `rel_${i}`;
            relationships[relId] = {
                type: ['causal', 'semantic', 'structural'][Math.floor(random() * 3)],
                strength: random(),
                bidirectional: random() > 0.5
            };
        }

        const semanticContent = {};
        for (let i = 0; i < Math.floor(complexity / 2); i++) {
            semanticContent[`concept_${i}`] = {
                abstractionLevel: Math.floor(random() * 5) + 1,
                semanticWeight: random(),
                conceptualLinks: Math.floor(random() * 5)
            };
        }

        return new OntologicalStructure({
            complexity,
            relationships,
            semanticContent,
            structureId: `onto_struct_${this.compressionHistory.length}`
        });
    }

    compress(structure, targetRatio = 0.5) {
        const targetComplexity = Math.floor(structure.complexity * targetRatio);

        // Compress relationships
        const sortedRels = Object.entries(structure.relationships)
            .sort(([, a], [, b]) => (b.strength || 0) - (a.strength || 0));

        const numPreserveRels = Math.max(1, Math.floor(sortedRels.length * targetRatio));
        const preservedRelationships = Object.fromEntries(sortedRels.slice(0, numPreserveRels));

        // Compress semantics
        const sortedSemantics = Object.entries(structure.semanticContent)
            .sort(([, a], [, b]) => {
                if (b.semanticWeight !== a.semanticWeight) {
                    return (b.semanticWeight || 0) - (a.semanticWeight || 0);
                }
                return (b.abstractionLevel || 0) - (a.abstractionLevel || 0);
            });

        const numPreserveSem = Math.max(1, Math.floor(sortedSemantics.length * targetRatio));
        const preservedSemantics = Object.fromEntries(sortedSemantics.slice(0, numPreserveSem));

        // Coherence analysis
        const coherenceAmplitude = this.codex.analyzeCoherence(structure);
        const compressionEvolution = this.codex.evolve(5);

        const avgEvolutionCoherence = compressionEvolution.coherenceHistory.reduce((a, b) => a + b, 0) / compressionEvolution.coherenceHistory.length;
        const finalCoherence = coherenceAmplitude * avgEvolutionCoherence;

        const compressed = new CompressedStructure({
            originalComplexity: structure.complexity,
            compressedComplexity: targetComplexity,
            preservedRelationships,
            preservedSemantics,
            compressionRatio: targetRatio,
            coherenceAmplitude: finalCoherence,
            structureId: `compressed_${structure.structureId}`,
            compressionMetadata: {
                algorithm: this.algorithm,
                evolutionData: compressionEvolution,
                compressionTimestamp: new Date().toISOString()
            }
        });

        this.compressionHistory.push({
            original: structure,
            compressed,
            metrics: this._calculateCompressionMetrics(structure, compressed)
        });

        return compressed;
    }

    _calculateCompressionMetrics(original, compressed) {
        const complexityReduction = (original.complexity - compressed.compressedComplexity) / original.complexity;

        const originalRelCount = Object.keys(original.relationships).length;
        const preservedRelCount = Object.keys(compressed.preservedRelationships).length;
        const relationshipPreservation = preservedRelCount / Math.max(originalRelCount, 1);

        const originalSemCount = Object.keys(original.semanticContent).length;
        const preservedSemCount = Object.keys(compressed.preservedSemantics).length;
        const semanticPreservation = preservedSemCount / Math.max(originalSemCount, 1);

        return {
            complexityReduction,
            relationshipPreservation,
            semanticPreservation,
            coherenceAmplitude: compressed.coherenceAmplitude,
            compressionEfficiency: complexityReduction * compressed.coherenceAmplitude
        };
    }
}
