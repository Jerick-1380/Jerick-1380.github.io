---
title: "Three Levels of Understanding (And the Only One AI Hasn't Taken Yet)"
date: 2026-09-20 10:00:00
description: "3Blue1Brown's video on the IMO problem no model could solve, a framework for what understanding actually means, and why intuition is the only level educators still need to fight for."
tags: education ai mathematics intuition teaching
categories: education
---

3Blue1Brown put out a video a while back about Problem 6 from the 2025 IMO, the one none of the AI systems could solve. Before anything else: go watch it. The rest of this will still be here when you get back.

<div class="video-16x9">
  <iframe src="https://www.youtube.com/embed/Nbwv5wHQoj0" title="3Blue1Brown — the IMO problem AI couldn't solve" allowfullscreen loading="lazy"></iframe>
</div>

The solution is elegant and the video is worth it for that alone. But the part I haven't stopped thinking about is the question Grant asks near the end. Every major model failed Problem 6, and so did almost every human: only 6 of the 630 contestants solved it completely for the full 7 points. What did those six have?

<div class="stats cols-3">
  <div class="stat"><div class="num" data-count="630">0</div><div class="lbl">IMO 2025 contestants</div></div>
  <div class="stat"><div class="num" data-count="6">0</div><div class="lbl">full marks on problem 6</div></div>
  <div class="stat"><div class="num" data-count="0">0</div><div class="lbl">AI systems that solved it</div></div>
</div>

The phrase he lands on is a *motivated* explanation. An argument where you can see why someone would reach for each step, so that by the end the solution feels like the only thing you could have done. I've been calling that same thing intuition for years, and I think it's the last piece we've got.

Six out of 630 is worth sitting with, though, because it means the thing I'm about to spend a whole post defending isn't exactly widespread among us either. On a problem that hard, six people in the world had it that day.

## Three levels of understanding

I've been carrying a rough framework around for a while, mostly to work out what I'm actually supposed to be doing when I teach. For any concept, any theorem, any technique, there are three different things that "understanding it" can mean.

<div class="grid-3">
  <div class="card tilt"><span class="chip blue">LEVEL 01</span><h3>Application</h3><p>You have the concept and you can use it. Someone hands you a problem, you recognize what it wants, you turn the crank.</p></div>
  <div class="card tilt"><span class="chip blue">LEVEL 02</span><h3>Verification</h3><p>How you know the thing is true at all. Contradiction, induction, loop invariants, and increasingly Lean.</p></div>
  <div class="card tilt"><span class="chip blue">LEVEL 03</span><h3>Intuition</h3><p>Why the thing works, and why anyone would ever have thought of it in the first place.</p></div>
</div>

Level 1 is what everything gets built around. Can you take the derivative, can you expand the Taylor series, can you compute the determinant and say what it means when it comes out zero. I claim that essentially all of formal education stops right here. The SAT, the GRE, AP Calculus, and very nearly every exam I have graded or proctored or written all live at this level. We give students a theorem, check that they can apply it in four or five slightly different settings—and then write down that they know it.

Level 2 is where math and CS get something the experimental sciences don't. They answer "how do you know" by running experiments and inferring backwards; we get to actually prove things, and over the last few years Lean has turned into a general substrate for checking that an argument holds together. It's real understanding, and undergraduate programs at least gesture at it. But it isn't where the weight goes, even in a good math department. Most of the differential equations homework I've graded is Level 1 with a proof stapled to the end.

Level 3 is the reason I'm writing any of this, and it's the hardest to pin down. It sits underneath the other two, and nobody grades you on it.

<blockquote class="pull">You can follow a proof line by line, agree with every step, get to the end, and still have no idea how a human being produced that.</blockquote>

It's the difference between watching someone solve a Rubik's cube in nine seconds and understanding cubing. For the genuinely hard concepts, I'd say it's also the only thing that makes the first two levels stick past the final exam.

## The two ways you actually get it

There are two routes to Level 3 as far as I can tell, and they work completely differently.

The first one is explicit, and right now that mostly means visualization. This is the 3Blue1Brown lane. You take something that lives in symbols and move it somewhere you can see it—a diagram, an animation, sometimes just a better set of coordinates—and the answer ends up sitting right there in front of you. Done well it makes you feel like you could have found the thing yourself.

The second is implicit, and it's just experience. This is the boring answer and I suspect it's the bigger one. Why do some students tear through competition problems that leave everyone else stuck? Mostly because they've seen a thousand problems and this one rhymes with something from eight months ago. You don't consciously retrieve it. You look at the problem, feel a pull toward some approach, and go check whether the pull was right. There's no shortcut to that. You get it by doing the work.

Both roads end up in the same place, but only one of them is something a teacher can hand you, which matters for everything below.

## AI took Level 1. Two weeks ago it took Level 2.

Level 1 went first and it went completely. By 2024 it was clear that frontier models could apply more or less any standard technique to more or less any standard problem, which means every exam I listed above is now solvable by a tool sitting in each of my students' pockets. I wrote about what that does to homework [last year](/blog/2025/why-ai-cant-do-math-homework/), back when you could still spot AI-generated work by its tells. Most of those tells are gone now—which is its own small lesson about making predictions in this area.

Level 2 was supposed to hold out longer. The bet a lot of people were making—me included—was that models might generate arguments while humans stayed the ones certifying them.

Then on September 8th OpenAI announced a claimed proof of Navier–Stokes existence and smoothness, one of the seven Millennium Prize problems and open for about ninety years. Reportedly 88 hours of compute across something like ten thousand agents. And, the part I care about here, formalized in Lean.

<div class="stats cols-3">
  <div class="stat"><div class="num" data-count="88">0</div><div class="lbl">hours of compute</div></div>
  <div class="stat"><div class="num" data-count="10" data-suffix=",000">0</div><div class="lbl">agents</div></div>
  <div class="stat"><div class="num" data-count="90">0</div><div class="lbl">years the problem stood</div></div>
</div>

I think that detail is getting underweighted.

<blockquote class="pull">A Lean formalization means the proof doesn't need a human referee to be believed.</blockquote>

The machine wrote the argument and produced the certificate that the argument is valid, which is the whole of Level 2 with nobody left in the loop.

Two caveats, since this is about two weeks old and still moving around. It's contested: Tristan Buckmaster has said that unpublished work he and Levent Alpöge did on the Euler equations reached OpenAI shortly before the announcement and may have shaped how the agents were prompted, OpenAI says the methods differ substantially, and the Clay Institute hasn't ruled on any of it. And one result isn't a capability. Still, I don't think the direction is ambiguous, and if your curriculum is built on the assumption that Level 2 stays human, that assumption is worth revisiting. Which leaves Level 3.

## So what do we actually do about it

If intuition is the remaining gap and it comes from those two routes, the useful question is which route we can push on.

Experience isn't ours to give. Students build it by doing problems, getting stuck, and sitting there long enough that something clicks. We can assign the work and we can refuse to shortcut it, but we can't do the compiling for them. It's also the part AI is most efficient at destroying, since removing struggle is precisely what it's good at, and students are not stupid about noticing.

Visualizations, on the other hand, get built. Somebody has to sit down and make the picture that makes an idea obvious, and that somebody is a person with taste. I'd argue that's the highest-leverage thing an educator can spend time on right now. The machines already explain procedures better than we do, so that isn't where our remaining hours should go.

I also doubt visualization is the only explicit route. It's the one we happen to have figured out. Finding others seems like a real open problem, and I'd be glad to be beaten to it.

## What this looks like in a recitation room

I've TA'd differential equations more times than I'd like to say out loud, which means I've taught the same material to different rooms over and over and gotten to watch what lands. (The longer version of this argument lives on my [teaching page](/teaching/).)

The tension never really goes away. Most diff eq homework is Level 1—identify the form, apply the method. Sure, every so often you need to prove something, but it's rarely hard, and I'm not going to pretend otherwise to students who have an exam in two weeks. So I teach the methods. What I'm always fighting is the point where that turns into a lookup table, this shape gets that substitution and that shape gets this transform, memorized flat with nothing underneath it. Those students tend to do fine on the midterm and remember none of it by April.

So I've flipped how I sequence things. Before I show a technique, I want to have answered why we need a new tool at all. What breaks if we use what we already have? Where did this transform come from, and what is it doing to the equation? Once that's in place the proof stops feeling arbitrary, because you can finally see what it's for, and the procedure they're actually going to be tested on gets much harder to forget, because it's attached to something.

<blockquote class="pull">Intuition, then verification, then application. That's backwards from how almost every course I've taken or taught is sequenced, and it works better.</blockquote>

## What this looks like on video

The other place I've been trying this is [my YouTube channel](https://www.youtube.com/@DummyR18). The most recent one is about symmetric random walks:

<div class="video-16x9">
  <iframe src="https://www.youtube.com/embed/PbbyPCOsLls" title="Random walks — expected hitting time" allowfullscreen loading="lazy"></iframe>
</div>

The question is easy to state: for a symmetric random walk, how long do you expect to wait before hitting a boundary at distance *n*?

I could have made this a two-minute video. The Level 1 answer is a clean quadratic—here's the formula, plug in your numbers, done. The Level 2 answer is the algebraic derivation, which is in there near the end, along with simulations showing the empirical points landing on the parabola where they should.

Most of the runtime goes somewhere else though. Before any formula appears I'm running random walk simulations and asking you to look at them. Does linear growth seem plausible here? Watch what the spread does as you let it run longer. Notice the shape the endpoints settle into, and think about what that implies about variance. None of that proves anything. It's a pile of small nudges, each one making a linear answer feel slightly more wrong and a quadratic one feel slightly more right.

What I want is for the *n*² to read as a confirmation when it finally shows up, closer to "yeah, obviously" than "huh, strange formula." That's the shape I'm trying to hold to for the rest of them: intuition is most of the work, and the formula is the last thirty seconds.

## What we're actually protecting

AI reaching Level 2 is amazing. We might be watching mathematics speed up in a way it hasn't in a century, and I'd rather live in that world than the other one.

It does change the job though. For most of the history of education we taught application because application was scarce and worth paying for, and that scarcity is gone. We taught verification to a smaller group because rigor is what separates actual mathematics from mathematics-shaped text, and that looks like it's going too.

What's left is the why. The picture that makes a hard thing obvious, the explanation motivated well enough that a student walks out thinking they could have come up with it, the accumulated experience that lets you look at an unfamiliar problem and feel which direction to walk before you can justify why.

If you care about education, and I care about it more than almost anything else I do, I think that's where the work is now. Build the things that produce intuition. Visualizations for now, since that's the tool we have, and something better once somebody works out what that is.

I don't have a tidier ending than that. It's the level we haven't lost yet.
