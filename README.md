# jerick-1380.github.io

Personal site of Jerick Shi — a fully static, dependency-free site with a sci-fi minimal design. No Jekyll, no build system: plain HTML, one CSS file, one JS file.

## Structure

```
index.html              Home (hero, about, news log, research + blog previews)
publications/           Research & publications
projects/               Project cards + detail pages (projects/<slug>/)
teaching/               Philosophy, timeline, materials, videos, testimonials
blog/                   Post list + posts at blog/<year>/<slug>/
books/  hobbies/  cv/   You can guess
404.html                Custom 404
assets/css/main.css     The entire design system
assets/js/main.js       All interactions (starfield, command palette, etc.)
src/                    Markdown sources for blog posts and projects
bin/build_articles.py   Regenerates post/project pages from src/
```

## Editing

- **Main pages:** edit the HTML directly. Nav and footer are duplicated per page — keep them in sync.
- **New blog post:** add `src/posts/YYYY-MM-DD-slug.md` (front matter: `title`, `description`, `tags`), run `python3 bin/build_articles.py` (needs `pip install markdown pyyaml`), then add a row to `blog/index.html` (and optionally the homepage "Latest from the blog" section).
- **New project:** add markdown to `src/projects/`, register it in the `PROJECTS` list in `bin/build_articles.py`, run the script, then add a card to `projects/index.html`.
- **News item:** add a `.log-line` entry to the mission log section in `index.html`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the repo to the `gh-pages` branch (served by GitHub Pages). `.nojekyll` disables Jekyll processing.

## Local preview

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```
