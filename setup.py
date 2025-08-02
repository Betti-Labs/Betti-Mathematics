from setuptools import setup, find_packages

setup(
    name="betti-mathematics",
    version="1.0.0",
    author="Gregory Betti",
    author_email="gorygrey@protonmail.com",
    description="Ontological Compression through Recursive Symbolic Codex",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/Betti-Labs/Betti-Mathematics",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Topic :: Scientific/Engineering :: Mathematics",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    python_requires=">=3.8",
    install_requires=[
        "numpy>=1.21.0",
        "pandas>=1.3.0",
        "matplotlib>=3.5.0",
        "seaborn>=0.11.0",
        "plotly>=5.0.0",
        "networkx>=2.6.0",
        "rich>=10.0.0",
    ],
    extras_require={
        "dev": ["pytest>=6.0.0", "jupyter>=1.0.0"],
        "interactive": ["ipywidgets>=7.0.0", "jupyter>=1.0.0"],
    },
)