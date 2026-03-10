---
layout: page
title: "Senior Thesis: Why Multi-Agent Conversations Cannot Fix LLM Forecasting"
description: Evidence from Convergence Analysis
img: assets/img/projects/deep_learning.jpeg
importance: 1
category: work
---

Large language models (LLMs) fail catastrophically at forecasting, performing 31-78% worse than random guessing due to systematic overconfidence in their predictions. This failure stems from models expressing high certainty regardless of accuracy, creating dangerous misalignment between confidence and performance that threatens deployment in critical decision-making domains.

We investigate whether multi-agent conversations provide natural calibration through structured disagreement that moderates individual overconfidence. Testing 483 binary forecasting questions reveals that conversational and mathematical calibration are functionally equivalent—both inject uncertainty without improving reasoning, converging to identical 0.25 Brier scores post-optimization.

Mid-sized models (7B-14B) benefit with 28.3% improvements through natural uncertainty moderation, while larger models (32B+) suffer from sophisticated echo chambers where elaborate arguments amplify rather than moderate overconfidence.

**Date:** May 2025

<a href="/assets/pdf/Multi_Agent_Forecasting.pdf" class="btn btn-sm z-depth-0" role="button" target="_blank">Paper (PDF)</a>
