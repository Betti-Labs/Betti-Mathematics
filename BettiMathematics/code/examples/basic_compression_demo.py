#!/usr/bin/env python3
"""
Basic Ontological Compression Demonstration

This example demonstrates the fundamental concepts of ontological compression
using the Betti Mathematics framework.

Author: Gregory Betti, Betti Labs
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from collapse import OntologicalCompressor, RecursiveSymbolicCodex

def basic_compression_demo():
    """Demonstrate basic ontological compression"""
    print("=== Basic Ontological Compression Demo ===\n")

    # Create sample ontological structure
    sample_structure = {
        'entities': ['concept_A', 'concept_B', 'concept_C'],
        'relationships': [
            ('concept_A', 'relates_to', 'concept_B'),
            ('concept_B', 'contains', 'concept_C'),
            ('concept_C', 'influences', 'concept_A')
        ],
        'properties': {
            'concept_A': {'complexity': 0.8, 'abstraction': 0.6},
            'concept_B': {'complexity': 0.5, 'abstraction': 0.9},
            'concept_C': {'complexity': 0.3, 'abstraction': 0.4}
        }
    }

    print("Original Structure:")
    print(f"  Entities: {len(sample_structure['entities'])}")
    print(f"  Relationships: {len(sample_structure['relationships'])}")
    print(f"  Properties: {len(sample_structure['properties'])}")

    # Initialize compressor
    compressor = OntologicalCompressor()

    # Perform compression
    compressed = compressor.compress(sample_structure)

    print(f"\nCompressed Structure:")
    print(f"  Compression ratio: {compressed.get('compression_ratio', 'N/A')}")
    print(f"  Preserved relationships: {compressed.get('preserved_relationships', 'N/A')}")

    # Demonstrate expansion
    expanded = compressor.expand(compressed)

    print(f"\nExpanded Structure:")
    print(f"  Reconstruction fidelity: {expanded.get('fidelity', 'N/A')}")

    return compressed, expanded

if __name__ == "__main__":
    basic_compression_demo()
