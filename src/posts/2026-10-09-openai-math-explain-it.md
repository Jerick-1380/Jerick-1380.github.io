---
title: "My Hot Take: Mathematicians Aren't Being Replaced, They're Being Reassigned"
date: 2026-10-09 10:00:00
description: "OpenAI released hundreds of AI-written solutions to open math problems and most of the reaction has been panic. A hot take from a CS person who can't read most of them: the job that just opened up is explaining what any of it means, with an animation of one result to show what I mean."
tags: mathematics ai education research
categories: education
image: /assets/img/social/og-openai-math.png
---

A few days ago OpenAI [released solutions](https://github.com/openai/math/blob/main/CONTENTS.md) to hundreds of open math problems, all written by one of its models—and a lot of the math world is panicking. Many of these were problems that PhD students are working on right now, so the reaction has been some version of: current math PhDs are screwed, someone just finished a whole thesis on this, is there even a role for mathematicians anymore? A lot of mathematicians are angry and saying this is ruining math. Almost everything I've seen about it has been negative.

So here's my hot take. The release is not entirely a bad thing.

Two disclaimers. I'm not taking a side on whether AI doing mathematics is good or bad for the field or for society. Everyone has been talking about the bad parts, and I want to shed some light on what good this might bring. Also, my perspective is a computer scientist's. I have a math major, but it was mostly applied—and I have far less experience than most mathematicians or math PhD students. Take all of this with a grain of salt.

## Math is a pile of puzzles

Start with what math is and what these problems are. To me, math is a collection of puzzles, and the beauty of it is in solving them—finding a solution when you don't even know whether one exists, and coming up with something elegant. The results tend to fall into two categories. Some turn out to be useful in the real world. Others are just beautiful, or describe something that exists naturally.

That second category matters. It's a strange thing to hear from someone with an applied math background, but not all math needs an application. In some areas the solution itself—the way someone attacked the problem—is the whole point. I think that feeling comes from competition math. There are IMO problems where you're playing a very simple game and you're asked whether an optimal strategy exists. Nothing depends on the answer. They're just really cool to think about, and part of the beauty is seeing how elegant the solution turns out to be.

## What AI just handed us

Stay with the puzzle analogy. Think about Legos, or IKEA furniture. What the AI has done is hand us the instruction manual: how the pieces go together, how to solve these exact problems.

<div class="stats cols-3">
  <div class="stat"><div class="num">719</div><div class="lbl">manuscripts</div></div>
  <div class="stat"><div class="num">372</div><div class="lbl">results they cover</div></div>
  <div class="stat"><div class="num">242</div><div class="lbl">results with a Lean proof</div></div>
</div>

That is a huge change for the field, and I don't want to play it down. A big part of mathematics has always been writing those manuals—figuring out whether a problem has a solution at all and then how to reach it. On that front the AI is ahead of us. It may recognize these patterns faster than any of us can.

It isn't settled either. OpenAI [withdrew three of the manuscripts](https://retractionwatch.com/2026/10/08/openai-withdraws-preprints-722-manuscripts-unsolved-math-problems/) a day after posting them because of a sign error, and mathematicians are still checking the rest.

## I can't read most of it

I'm going to be very honest here. As someone who didn't come from a pure math or analysis background, I have no idea what most of these proofs mean. For a lot of them I don't even know what the theorem is saying.

One of the results claims a big step on the Riemann hypothesis. I'm not sure I could fully explain the Riemann hypothesis, let alone tell you which part the AI solved. When OpenAI announced a Navier–Stokes solution back in September, I didn't really know what the equation was, or what exactly had been claimed. That proof is now disputed, because the written version and the Lean version reportedly don't match, and I couldn't have caught that either.

<blockquote class="pull">We've been handed the instructions. Most of us still can't read them.</blockquote>

I'm sure most mathematicians look at these theorems and think, oh my god, I never would have thought of that. To the outside world, nobody knows what's going on. What are these proofs, and why do they matter? As I said, not everything needs an application. But then someone has to show us where the beauty is. Is it a clever play with numbers? A pattern that never occurred to anyone? An intuition borrowed from a completely different area?

## The gap that's getting bigger

So here is my claim. Mathematicians are not being replaced. They have a very different role to play, and one of the first steps is interpretability.

There are two gaps. The first is between how the AI understands these problems and how mathematicians do. The second is between mathematicians and everyone else.

<div class="spectrum">
  <div class="spec-cap">// two gaps, and who sits between them</div>
  <div class="spec-row">
    <div class="spec-stop"><span class="dot"></span><b>The AI's proofs</b><span class="note">719 manuscripts, arriving all at once</span></div>
    <div class="spec-stop mid"><span class="dot"></span><b>Mathematicians</b><span class="note">can read them, check them, and explain them</span></div>
    <div class="spec-stop"><span class="dot"></span><b>Everyone else</b><span class="note">has no idea what any of it means</span></div>
  </div>
</div>

I claim the second gap keeps getting larger, because AI is pulling the frontier upward so fast. We need people to bridge it. We need mathematicians, including the ones doing PhDs right now, to read these proofs, fully understand them, and verify that they're correct—with Lean, yes, and also from an intuitive standpoint. How could the AI have come up with this? Did it use a problem-solving technique we haven't seen? How did it piece things together, and what gap did it find that we never thought about?

Then comes the part I care about most, which is sharing it. I think beauty is the core of mathematics: the way things fall out cleanly when you put them together, or an approach almost nobody would have thought of. That deserves to reach more people than the ones who can read the paper.

## What I'd like to see

I want to see mathematicians take one of these results and make a video, or give a lecture, for a wider audience than other mathematicians. What is the problem? Why was it hard? Why is it important, or why is it beautiful?

Here's one I could follow. Result 158 in the collection is about coloring the plane. You have to color every point so that no two points exactly 1 apart share a color, and the question is how many colors you need. People have known for decades that the answer is somewhere between 4 and 7, and in 2018 Aubrey de Grey ruled out 4. OpenAI's model claims to rule out 5.

I said in my notes for this post that I might animate one of these, so I did:

<video class="article-video" controls muted loop playsinline preload="metadata" poster="/assets/video/plane-coloring-poster.jpg">
  <source src="/assets/video/plane-coloring.mp4" type="video/mp4">
</video>

That's thirty seconds, and it only gets you to the statement. It doesn't explain how the proof works, because I can't. That is exactly the job I'm describing: someone who understands the argument showing the rest of us why five colors fail.

## It isn't black and white

There are obviously bad parts to all of this. But the release also gives mathematicians a new kind of work. We've never had hundreds of new results show up at the same time, and that's a lot of material to interpret, verify, and explain.

I think it's also a real opportunity to show the rest of the world what mathematics is for—the beauty and the essence of it—which I feel has been fading from view for most people. And the release is a good reflection of how the role of a mathematician is changing in this new era.
