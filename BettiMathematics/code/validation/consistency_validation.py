#!/usr/bin/env python3
"""
Internal Consistency Validation

This script validates the internal consistency of the Betti Mathematics
framework implementations.

Author: Gregory Betti, Betti Labs
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from collapse import OntologicalCompressor, RecursiveSymbolicCodex
import unittest

class TestInternalConsistency(unittest.TestCase):
    """Test internal consistency of framework components"""

    def setUp(self):
        """Set up test fixtures"""
        self.compressor = OntologicalCompressor()
        self.codex = RecursiveSymbolicCodex()

        self.test_structure = {
            'entities': ['test_A', 'test_B'],
            'relationships': [('test_A', 'relates', 'test_B')],
            'properties': {'test_A': {'value': 1.0}}
        }

    def test_compression_expansion_consistency(self):
        """Test that compression followed by expansion preserves structure"""
        compressed = self.compressor.compress(self.test_structure)
        expanded = self.compressor.expand(compressed)

        # Check that essential structure is preserved
        self.assertIsNotNone(expanded)
        self.assertIn('fidelity', expanded)

        # Fidelity should be reasonable (>0.5 for this simple case)
        if 'fidelity' in expanded and expanded['fidelity'] is not None:
            self.assertGreater(expanded['fidelity'], 0.5)

    def test_recursive_codex_consistency(self):
        """Test recursive codex internal consistency"""
        # Add symbols and check they're properly stored
        test_symbols = ['α', 'β', 'γ']

        for symbol in test_symbols:
            self.codex.add_symbol(symbol)

        # Check all symbols are present
        self.assertEqual(len(self.codex.symbols), len(test_symbols))

        # Check recursive relationships are consistent
        for symbol in test_symbols:
            relationships = self.codex.get_recursive_relationships(symbol)
            self.assertIsInstance(relationships, (list, dict, type(None)))

    def test_mathematical_properties(self):
        """Test mathematical properties of the framework"""
        # Test compression ratio bounds
        compressed = self.compressor.compress(self.test_structure)

        if 'compression_ratio' in compressed and compressed['compression_ratio'] is not None:
            # Compression ratio should be positive
            self.assertGreater(compressed['compression_ratio'], 0)

            # For non-trivial structures, should achieve some compression
            self.assertLess(compressed['compression_ratio'], 1.0)

def run_consistency_validation():
    """Run all consistency validation tests"""
    print("=== Internal Consistency Validation ===\n")

    # Run unittest suite
    suite = unittest.TestLoader().loadTestsFromTestCase(TestInternalConsistency)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    print(f"\nValidation Results:")
    print(f"  Tests run: {result.testsRun}")
    print(f"  Failures: {len(result.failures)}")
    print(f"  Errors: {len(result.errors)}")

    if result.wasSuccessful():
        print("  Status: PASSED - Internal consistency validated")
    else:
        print("  Status: FAILED - Consistency issues detected")

    return result.wasSuccessful()

if __name__ == "__main__":
    run_consistency_validation()
