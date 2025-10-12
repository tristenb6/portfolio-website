Projects overview
=================

Jekyll collections are now used for photography projects. This makes editing easier and ensures all photography pages share the same (v2) layout.

Photography (Jekyll collection)
- Source files live in `_photography/` (output path is `/projects/photography/:name/`).
- All items automatically use the `photography` layout (`_layouts/photography.html`).
- Start from `templates/photography-project-v2.md` — copy it into `_photography/your-slug.md` and update the front matter fields.
- Images should remain under `images/projects/<your-slug>/`.

Key fields (front matter)
- `title`, `location`, `captured`, `camera`, `film`
- `hero_images`: first 1–3 images for the floating tiles (optional)
- `images` or `gallery`: gallery images (use `gallery` for fine control with `tall`)
- `intro`, `cards`: optional story content near the top
- `prev_url`, `next_url`: optional manual navigation

Legacy static pages
- Existing HTML files under `projects/photography/*/index.html` still work, but new photography work should be authored in `_photography/` using the template above.
