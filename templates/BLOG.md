Blog setup and workflow
=======================

Overview
- Posts live in `_posts/` as Markdown files named `YYYY-MM-DD-slug.md`.
- Posts use the `post` layout (`_layouts/post.html`).
- Post URLs are `/blog/:title/` (set via `_config.yml` defaults).
- Blog index lives at `/blog/` (page file: `blog.html`).

Create a new post
1. Copy `templates/blog-post.md` to `_posts/YYYY-MM-DD-your-title.md`.
2. Fill front matter:
   - `title`, `date`, `tag`, `category`, `location`, `read_time`
   - `thumbnail` (list image) and `image` (OG/social)
   - `excerpt` (short summary) and optional `lead` (hero sentence)
3. Write content below the front matter in Markdown or HTML.

Notes
- The post layout renders a hero with tag/title/lead and meta (date, location, read time, category).
- Keep images in `images/` and reference with absolute paths (e.g., `/images/...`).
- The blog home (`/blog/`) shows the latest post.

Cleanliness
- There are no static blog HTML pages; everything runs through `_posts/`.
- Build output `_site/` is ignored (GitHub Pages builds the site).

