---
title: "Poster Hall Finds: 11 Papers That Stopped Me at ICML 2026"
date: 2026-07-21 10:00:00
description: "Notes from wandering the ICML 2026 poster halls in Seoul: papers on LLM agents, education, and finance that anyone can actually read, plus why each one caught my attention."
tags: icml research llm-agents ai conferences
categories: research
---

Earlier this month I was in Seoul for ICML 2026, presenting our paper *When Agents Lie* at the NExT-Game workshop. Between sessions, I did what I always do at conferences: wander the poster halls until my feet gave out.

With thousands of papers at ICML, you need a filter. Mine is pretty simple:

- **Readable by a broad audience.** Anyone should be able to pick up the paper and understand it with minimal background.
- **AI applications in education and finance**, since those are the two worlds I keep one foot in each.
- **A clean one-sentence result.** If you can't summarize the takeaway in a sentence, I keep walking.

Here's what made the cut, in no particular order. For each paper: a quick overview, and why I stopped at the poster.

## [Discovering Ordinary Differential Equations with LLM-Based Qualitative and Quantitative Evaluation](https://arxiv.org/abs/2605.07323)

- **The gist:** Traditional methods for recovering ODEs from data often produce solutions with low error but very wrong equations. By using LLMs to provide context on the data and refine previous guesses through discussion, accuracy increases significantly.
- **Why I stopped:** I've TA'ed differential equations for four semesters and written multiple study guides for it, and LLM applications are my thing. This poster was basically built for me.

## [Strategic Exploitation in LLM Agent Markets: A Simulation Framework for E-Commerce Trust](https://arxiv.org/abs/2605.10059)

- **The gist:** Put a bunch of LLM agents in a buyer/seller environment and they can detect weaknesses in the market and adjust their strategies, including through strategic deception.
- **Why I stopped:** Deceptive behaviors in multi-agent systems are my research area, and I've been looking more into emergent deception specifically.

## [Solipsistic Superintelligence is Unlikely to be Cooperative](https://arxiv.org/abs/2606.03237)

- **The gist:** LLMs aren't cooperative because they've been trained in static environments. To become more cooperative, they need to be trained and tested in systems that actually react to them.
- **Why I stopped:** AI safety plus multi-agent systems. Straight down the middle of my interests.

## [Cooperate to Compete: Strategic Coordination in Multi-Agent Conquest](https://arxiv.org/abs/2604.25088)

- **The gist:** A testbed for comparing how humans negotiate and strategize against LLM agents. It turns out there are real behavioral differences, like humans playing more aggressively.
- **Why I stopped:** I'm working on a paper where AI agents play games with each other and we watch how they form alliances and break promises across different settings, so this is a natural comparison point.

## [Computational Arbitrage in AI Model Markets](https://arxiv.org/abs/2603.22404)

- **The gist:** You can make riskless profit by routing queries across different AI models, achieving a high success rate at a lower cost across benchmarks.
- **Why I stopped:** I have a background in quant finance. Arbitrage showing up in AI model markets is exactly the kind of crossover I hunt for.

## [Systematic Failures in Collective Reasoning under Distributed Information in Multi-Agent LLMs](https://arxiv.org/abs/2505.11556)

- **The gist:** When LLMs each hold different pieces of information and are asked to discuss and collaborate, they often fail. The culprit: they don't reason about what others might know, so conversations terminate too early.
- **Why I stopped:** I ran a small version of this experiment myself and saw similar results, so I'm glad someone formalized it properly.

## [BrokenMath: A Benchmark for Sycophancy in Theorem Proving with LLMs](https://arxiv.org/abs/2510.04721)

- **The gist:** Take olympiad problems and swap the final question for a statement that's actually false. LLMs will happily "prove" the false statement anyway.
- **Why I stopped:** Years of being a math TA means I've graded plenty of confident proofs of false things by humans. Watching LLMs do the same is both funny and concerning.

## [PaperBanana: Automating Academic Illustration for AI Scientists](https://arxiv.org/abs/2601.23265)

- **The gist:** A tool that automates publication-quality illustrations for research papers.
- **Why I stopped:** I've been using this tool for my own papers, so it was cool to finally see the paper and poster behind it at ICML.

## [Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge](https://arxiv.org/abs/2410.02736)

- **The gist:** Even the strongest LLMs carry biases when used as judges, picking up on emotion, sentiment, and response length. Models also tend to give higher scores to their own outputs.
- **Why I stopped:** I use LLM-as-a-judge constantly in my research. This matters to me and to basically everyone else who does empirical LLM work.

## [Kantian Equilibrium in the Age of Multi-Agent Systems](https://openreview.net/pdf?id=hizxbjrwxO)

- **The gist:** Instead of assuming everyone in a multi-player game works against each other, what happens when subgroups decide to collaborate?
- **Why I stopped:** I toyed with this exact idea as an extension of one of my papers (finding the optimal deviation given you're inside a subgroup), so it was fun to see it actually played out.

## [Benchmarking at the Edge of Comprehension](https://arxiv.org/abs/2602.14307)

- **The gist:** What happens when LLMs get smarter than the benchmarks we write for them? The paper proposes a structure where LLMs propose questions, other LLMs try to answer them, and the system decides which questions are good enough to keep.
- **Why I stopped:** I'm firmly on the side that there are currently too many benchmark papers, so a benchmark that generates itself is at least an interesting way out.

---

That's the list. If you were at ICML and caught a poster I missed that fits the "readable, applicable, one clean sentence" bar, send it my way at [JerickS.1380@gmail.com](mailto:JerickS.1380@gmail.com).
