---
type: 'Architecture'
title: 'KDD acceptance through e2e'
description: 'Trusted Node oracle connects reviewed KDD criteria to deterministic browser evidence.'
tags: ['kdd', 'e2e', 'acceptance']
---

# Architecture

The protected Node oracle starts the pinned e2e CLI with a new output directory.
Its report reader validates the full report-1 schema, exact expected case set,
timestamps, revision, clean tracked tree, attempts, cleanup and zero model use.
The production fixture keeps domain logic separate from DOM rendering.
KDD Board recognizes one outer Node test; evidence retains seven inner UI cases.

The quality policy protects the entire oracle dependency chain. Its approved
reference is selected explicitly by a human outside implementation control.
Local test evidence is locally_verified; remote CI verification requires a real
successful run and independent baseline approval. No agent-generated file grants
approval. Execution has the operator's permissions and is not sandboxed.

Serial suites, setup projects, permitted skips and AI judgments are outside this
initial acceptance profile and must fail explicitly if encountered.
