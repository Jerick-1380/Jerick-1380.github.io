---
layout: page
title: "Master's Thesis: The Structure of Deception in Multi-Agent LLM Systems"
description: How LLM Agents Lie, Break Promises, and Exploit Trust
img: assets/img/projects/thesis_thumbnail.png
importance: 0
category: work
---

Large language models are increasingly deployed as autonomous agents that communicate, commit, and coordinate in multi-agent systems. Deception in such settings—including promise-breaking, selective information sharing, and exploitation of other agents' interpretive frameworks—introduces deployment risks that isolated-model evaluation cannot detect.

This thesis develops a unified framework for measuring LLM deception in multi-agent settings and populates it with empirical evaluations across three interaction structures:

**Key Contributions:**

1. **Unified Taxonomy**: Organizes fragmented literature along goal-directedness, object, and mechanism dimensions, revealing systematic benchmark coverage gaps across 35 existing benchmarks.

2. **Multi-Setting Empirical Evaluation**: Tests frontier LLMs in progressively less structured settings:
   - One-shot games with mandated announcements
   - Repeated games with endogenous announcements and heterogeneous model compositions
   - Resource-gathering simulation with narrative goals and no announcement protocol

3. **Qualitative Deception Profiles**: Demonstrates that aggregate lying rates obscure structurally distinct deceptive behaviors—deception in prescribed protocols takes the form of planned false commitments, while under narrative goals it manifests as strategic silence that message-level classification cannot observe.

4. **Monitoring Failure Modes**: Shows that three candidate monitoring approaches from existing literature each fail against specific failure modes, highlighting the inadequacy of one-size-fits-all detection methods.

**Central Claim**: LLM deception in multi-agent settings is not a single phenomenon but a family of structurally distinct failure modes, each shaped by different features of the interaction. Current benchmarks and monitoring approaches systematically underrepresent this variety.

**Thesis Committee**: Vincent Conitzer (Chair), Aditi Raghunathan
**Advisors**: Vincent Conitzer, Zhijing Jin
**CMU Technical Report**: CMU-CS-26-105

---

<div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
  <a href="/assets/pdf/masters_thesis.pdf" class="material-download" target="_blank" style="display: inline-block; background: var(--global-theme-color); color: var(--global-bg-color) !important; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">
    Download Thesis (PDF) →
  </a>
  <a href="https://youtu.be/Z3Q9AkriPxg" class="material-download" target="_blank" style="display: inline-block; background: var(--global-theme-color); color: var(--global-bg-color) !important; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">
    Watch Presentation (YouTube) →
  </a>
</div>
