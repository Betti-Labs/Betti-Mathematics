#!/usr/bin/env python3
"""
Recursive Symbolic Codex Demonstration

This example demonstrates the recursive symbolic codex functionality
of the Betti Mathematics framework.

Author: Gregory Betti, Betti Labs
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from collapse import RecursiveSymbolicCodex

def recursive_codex_demo():
    """Demonstrate recursive symbolic codex operations"""
    print("=== Recursive Symbolic Codex Demo ===\n")

    # Initialize codex
    codex = RecursiveSymbolicCodex()

    # Create symbolic structure
    symbols = ['α', 'β', 'γ', 'δ']

    print("Building recursive symbolic structure...")
    for symbol in symbols:
        codex.add_symbol(symbol, recursive_depth=3)

    # Demonstrate recursive operations
    print(f"\nCodex contains {len(codex.symbols)} symbols")

    # Show recursive relationships
    for symbol in symbols[:2]:  # Show first two for brevity
        relationships = codex.get_recursive_relationships(symbol)
        print(f"  {symbol}: {len(relationships)} recursive relationships")

    # Demonstrate compression through recursion
    compressed_codex = codex.recursive_compress()
    print(f"\nRecursive compression achieved {compressed_codex.compression_ratio:.2f}x reduction")

    return codex, compressed_codex

if __name__ == "__main__":
    recursive_codex_demo()
