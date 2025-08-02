#!/usr/bin/env python3
"""
Advanced Applications Demonstration

This example demonstrates advanced applications of the Betti Mathematics
framework including multi-level compression and ontological mapping.

Author: Gregory Betti, Betti Labs
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from collapse import OntologicalCompressor, RecursiveSymbolicCodex, CollapseExpansionDynamics

def advanced_applications_demo():
    """Demonstrate advanced framework applications"""
    print("=== Advanced Applications Demo ===\n")

    # Multi-level compression example
    print("1. Multi-level Ontological Compression")

    # Create complex nested structure
    complex_structure = {
        'level_1': {
            'entities': ['A1', 'A2', 'A3'],
            'sub_structures': {
                'level_2': {
                    'entities': ['B1', 'B2'],
                    'sub_structures': {
                        'level_3': {
                            'entities': ['C1', 'C2', 'C3', 'C4']
                        }
                    }
                }
            }
        }
    }

    compressor = OntologicalCompressor()
    multi_compressed = compressor.multi_level_compress(complex_structure)

    print(f"   Original complexity: {compressor.calculate_complexity(complex_structure)}")
    print(f"   Compressed complexity: {compressor.calculate_complexity(multi_compressed)}")

    # Collapse-Expansion Dynamics
    print("\n2. Collapse-Expansion Dynamics")

    dynamics = CollapseExpansionDynamics()

    # Simulate dynamic compression over time
    time_series = dynamics.simulate_compression_cycle(
        initial_structure=complex_structure,
        time_steps=10
    )

    print(f"   Simulated {len(time_series)} time steps")
    print(f"   Final compression ratio: {time_series[-1].get('compression_ratio', 'N/A')}")

    return multi_compressed, time_series

if __name__ == "__main__":
    advanced_applications_demo()
