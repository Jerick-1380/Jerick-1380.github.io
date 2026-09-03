#!/usr/bin/env python3
"""Generate static blog post and project detail pages from markdown sources.

Blog posts:   src/posts/YYYY-MM-DD-slug.md  ->  blog/YYYY/slug/index.html
Project pages are defined in PROJECTS below  ->  projects/<slug>/index.html

Usage: python3 bin/build_articles.py   (run from the repo root)
"""

import re
from pathlib import Path

import markdown
import yaml

ROOT = Path(__file__).resolve().parent.parent

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} — Jerick Shi</title>
  <meta name="description" content="{description}">
  <link rel="icon" href="/assets/img/brain.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <div id="progress"></div>
  <canvas id="starfield"></canvas>
  <div class="bg-glow"></div>

  <nav class="nav">
    <div class="nav-inner">
      <a class="logo" href="/"><b>jerick</b>@shi:~$<span class="cursor">▊</span></a>
      <button class="nav-burger" aria-label="Menu">☰</button>
      <div class="nav-links">
        <a href="/">About</a>
        <a href="/publications/">Research</a>
        <a href="/projects/">Projects</a>
        <a href="/teaching/">Teaching</a>
        <a href="/blog/">Blog</a>
        <a href="/hobbies/">Hobbies</a>
        <a href="/cv/">CV</a>
        <button class="cmdk-btn" aria-label="Open command palette">⌘K</button>
      </div>
    </div>
  </nav>

  <article class="article">
    <header>
      <div class="eyebrow"><span class="idx">//</span> {eyebrow}</div>
      <h1 data-scramble>{title}</h1>
      <p class="muted">{subtitle}</p>
      {chips}
    </header>
    <div class="article-body">
{body}
    </div>
    {actions}
    <hr class="divider-glow">
    <p><a href="{back_href}">← {back_label}</a></p>
  </article>

  <footer>
    <div class="wrap foot-grid">
      <div class="foot-links">
        <a href="mailto:JerickS.1380@gmail.com">Email</a>
        <a href="https://github.com/Jerick-1380" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/jerick-shi-293773216" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://scholar.google.com/citations?user=6wj2mTQAAAAJ" target="_blank" rel="noopener">Scholar</a>
        <a href="https://www.youtube.com/@DummyR18" target="_blank" rel="noopener">YouTube</a>
        <a href="https://flickr.com/photos/203834484@N07/" target="_blank" rel="noopener">Flickr</a>
        <a href="/books/">Bookshelf</a>
      </div>
      <div class="foot-note">© 2026 JERICK SHI · PRESS ⌘K TO NAVIGATE</div>
    </div>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>
"""

MD = markdown.Markdown(extensions=["extra", "sane_lists", "toc"])


def split_front_matter(text):
    match = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not match:
        return {}, text
    return yaml.safe_load(match.group(1)) or {}, match.group(2)


def escape_attr(value):
    return value.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")


def render(out_path, **kwargs):
    kwargs.setdefault("chips", "")
    kwargs.setdefault("actions", "")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(TEMPLATE.format(**kwargs), encoding="utf-8")
    print(f"built {out_path.relative_to(ROOT)}")


def build_posts():
    for source in sorted((ROOT / "src" / "posts").glob("*.md")):
        meta, body_md = split_front_matter(source.read_text(encoding="utf-8"))
        stem = source.stem
        date = stem[:10]
        slug = stem[11:]
        year = date[:4]
        MD.reset()
        body = MD.convert(body_md)
        tags = "".join(
            f'<span class="chip">{t}</span>'
            for t in str(meta.get("tags", "")).split()
        )
        render(
            ROOT / "blog" / year / slug / "index.html",
            title=meta.get("title", slug),
            description=escape_attr(meta.get("description", "")),
            eyebrow=f"blog_entry · {date.replace('-', '.')}",
            subtitle=meta.get("description", ""),
            chips=f"<div>{tags}</div>" if tags else "",
            body=body,
            back_href="/blog/",
            back_label="All posts",
        )


PROJECTS = [
    {
        "slug": "masters-thesis",
        "source": "0_masters_thesis.md",
        "eyebrow": "project · master's thesis",
        "subtitle": "How LLM Agents Lie, Break Promises, and Exploit Trust",
        "chips": '<div><span class="chip">multi-agent systems</span><span class="chip">ai safety</span><span class="chip purple">CMU-CS-26-105</span></div>',
        "actions": (
            '<div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:2rem;">'
            '<a class="btn btn-primary" href="/assets/pdf/masters_thesis.pdf" target="_blank">Download thesis (PDF)</a>'
            '<a class="btn btn-ghost" href="https://youtu.be/Z3Q9AkriPxg" target="_blank" rel="noopener">Watch defense (YouTube)</a></div>'
        ),
    },
    {
        "slug": "senior-thesis",
        "source": "1_senior_thesis.md",
        "eyebrow": "project · senior thesis",
        "subtitle": "Why Multi-Agent Conversations Cannot Fix LLM Forecasting: Evidence from Convergence Analysis",
        "chips": '<div><span class="chip">llm forecasting</span><span class="chip">calibration</span></div>',
        "actions": (
            '<div style="margin-top:2rem;">'
            '<a class="btn btn-primary" href="/assets/pdf/Multi_Agent_Forecasting.pdf" target="_blank">Download paper (PDF)</a></div>'
        ),
    },
    {
        "slug": "meeting-minds",
        "source": "2_meeting_minds.md",
        "eyebrow": "project · meeting of the minds",
        "subtitle": "Predictive Power of LLMs in Financial Markets — First Place, Math Division",
        "chips": '<div><span class="chip">llms</span><span class="chip">finance</span><span class="chip purple">★ first place</span></div>',
        "actions": (
            '<div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:2rem;">'
            '<a class="btn btn-primary" href="https://arxiv.org/abs/2411.16569" target="_blank" rel="noopener">View paper on arXiv</a>'
            '<a class="btn btn-ghost" href="/assets/pdf/MOM_Poster.pdf" target="_blank">Download poster (PDF)</a></div>'
        ),
    },
    {
        "slug": "mcm",
        "source": "3_mcm.md",
        "eyebrow": "project · mathematical contest in modeling",
        "subtitle": "Modeling lamprey population dynamics with adaptive sex-determination mechanisms",
        "chips": '<div><span class="chip">differential equations</span><span class="chip">simulation</span><span class="chip purple">★ honorable mention</span></div>',
        "actions": (
            '<div style="margin-top:2rem;">'
            '<a class="btn btn-primary" href="/assets/pdf/MCM2024.pdf" target="_blank">Download paper (PDF)</a></div>'
        ),
    },
    {
        "slug": "operations-research",
        "source": "4_operations_research.md",
        "eyebrow": "project · operations research II",
        "subtitle": "A linear programming approach to movie theater scheduling",
        "chips": '<div><span class="chip">linear programming</span><span class="chip">optimization</span></div>',
        "actions": (
            '<div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:2rem;">'
            '<a class="btn btn-primary" href="/assets/pdf/or_paper.pdf" target="_blank">Download paper (PDF)</a>'
            '<a class="btn btn-ghost" href="/assets/pdf/or_slides.pdf" target="_blank">Download slides (PDF)</a></div>'
        ),
    },
    {
        "slug": "deep-learning",
        "source": "5_deep_learning.md",
        "eyebrow": "project · intermediate deep learning",
        "subtitle": "Predicting closing prices for the Optiver 'Trading at the Close' Kaggle competition",
        "chips": '<div><span class="chip">deep learning</span><span class="chip">finance</span></div>',
        "actions": (
            '<div style="margin-top:2rem;">'
            '<a class="btn btn-primary" href="/assets/pdf/Predicting_Closing_Price_Movements_for_Kaggle_Competition.pdf" target="_blank">Download paper (PDF)</a></div>'
        ),
    },
    {
        "slug": "intro-ml",
        "source": "6_intro_ml.md",
        "eyebrow": "project · intro to machine learning",
        "subtitle": "Sentiment analysis of market news with applications to stock prediction",
        "chips": '<div><span class="chip">nlp</span><span class="chip">classification</span></div>',
        "actions": (
            '<div style="margin-top:2rem;">'
            '<a class="btn btn-primary" href="https://github.com/Jerick-1380/10315-Final-Project" target="_blank" rel="noopener">View on GitHub</a></div>'
        ),
    },
]


def build_projects():
    for proj in PROJECTS:
        source = ROOT / "src" / "projects" / proj["source"]
        meta, body_md = split_front_matter(source.read_text(encoding="utf-8"))
        # keep markdown up to the first raw <div (old inline-styled buttons,
        # replaced by the actions block) and drop trailing separators
        body_md = body_md.split("<div", 1)[0].rstrip().rstrip("-").rstrip()
        MD.reset()
        body = MD.convert(body_md)
        render(
            ROOT / "projects" / proj["slug"] / "index.html",
            title=meta.get("title", proj["slug"]),
            description=escape_attr(meta.get("description", "")),
            eyebrow=proj["eyebrow"],
            subtitle=proj["subtitle"],
            chips=proj["chips"],
            body=body,
            actions=proj["actions"],
            back_href="/projects/",
            back_label="All projects",
        )


if __name__ == "__main__":
    build_posts()
    build_projects()
