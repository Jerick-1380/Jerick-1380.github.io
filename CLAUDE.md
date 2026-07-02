# Instructions for coding agents

This is Jerick Shi's personal site — **pure static HTML/CSS/JS, no framework, no build system**. It was migrated from the al-folio Jekyll theme in July 2026 (the old source lives in git history).

Read `README.md` for the site structure and editing workflows.

Rules:

- All shared styling lives in `assets/css/main.css` (CSS variables at the top define the design system: dark sci-fi, blue/purple/cyan accents). All interactivity lives in `assets/js/main.js`. Do not add frameworks or npm dependencies.
- Nav and footer markup is duplicated across every page. When changing either, update **all** HTML files (`grep -rl 'nav-links' .`).
- Blog posts and project detail pages are generated from markdown in `src/` by `bin/build_articles.py` — edit the markdown and regenerate rather than editing those `index.html` files directly. Listing pages (`blog/index.html`, `projects/index.html`, homepage previews) are maintained by hand.
- Old al-folio URLs are preserved via directory-style paths (`/teaching/`, `/publications/`, `/blog/<year>/<slug>/`) and meta-refresh redirect stubs (`/news/`, `/projects/0_masters_thesis/`, etc.). Don't break these.
- Deployment: push to `main` → GitHub Actions publishes the repo as-is to `gh-pages`. There is no build step, so whatever is committed must be directly servable. Keep `.nojekyll`.
- Verify changes by serving locally (`python3 -m http.server`) and checking the affected pages.
