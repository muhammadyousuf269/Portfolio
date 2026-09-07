# Muhammad Yousuf — Strategic Thumbnail Design

An **editorial dark** single-page portfolio (near-black background, bold uppercase white type, hairline structure, single orange accent) modeled on the layout and visual style of **badisdesigns.com**:
Hero (moving thumbnail wall) → Featured work → About/Skills → FAQ → Contact.

No build step, no dependencies — just open `index.html` in a browser or drop the folder on any static host (GitHub Pages, Netlify, Vercel, etc.).

## Quick start

1. Open `index.html` in your browser — done.
2. (Optional) Serve locally: `python -m http.server` or `npx serve` from this folder. On Windows without Python, run `powershell -ExecutionPolicy Bypass -File serve.ps1` (serves on http://127.0.0.1:8097) — the `serve.ps1` file is a tiny zero-dependency static server.

## ⚠️ Replace the remaining placeholders

A few details still ship as placeholders — swap them before going live:

| What | Where | Notes |
| --- | --- | --- |
| **Discord link** | `index.html` → `.channel-grid` | Email & WhatsApp already point to your real details; Discord handle is @muhammadyousuf18 with a placeholder `#` link until you have an invite |

## Thumbnails & the gallery

Your 10 thumbnails are already added to the gallery — they live in `images/` (`burning-leads.png`, `chat-gpt.png`, `ai-for-humans.png`, `tiktok-viral.png`, `top-10-product-feb.png`, `nitish-rajput-latent.png`, `azad-chaiwala.png`, `daniel-amegatcher.png`, `rise-above.png`, `tpc-podcast.png`).

To add/remove/rename pieces, edit the `GALLERY` array near the top of `js/main.js`:

```js
{
  title: "Burning Leads",
  cat: "business",          // tech (AI & Tech) | business | creators
  img: "images/burning-leads.png",
  desc: "Burning-paper hook for a lead-generation video.",
},
```

- Categories drive the filter buttons in `index.html` (All / AI & Tech / Business / Creators). To add a category, add a `data-filter` button there and a matching `cat` value + `CAT_LABELS` entry in `js/main.js`.
- The same images are reused in the **hero**: `js/main.js` → `buildHeroBackground()` fills the full-bleed background with 4 rows of tiles from the `GALLERY` array that drift in alternating directions (speeds are set there — 52–84 s per loop).
- ⚠️ **Deploy tip:** the PNGs total ~26 MB. Before going live, re-export them as compressed **.jpg or .webp (1280×720, quality ~80)** and update the `img` paths — page speed matters for portfolio CTR.

## Other personalization

| What | Where |
| --- | --- |
| Name / hero headline | `index.html` hero section (eyebrow + big "Strategic Thumbnail Design" headline) |
| Skills & percentages | `index.html` `.skills` block (also `--w` on the bars) |
| FAQ questions/answers | `index.html` → `.faq-list` (accordion is auto-wired) |
| Colors | `css/style.css` → `:root` variables (`--bg`, `--text`, `--muted`, `--accent`, `--line`, …) |
| Fonts | Google Fonts in `index.html` → Archivo (display), Inter (body) |
| Gallery categories | `js/main.js` `CAT_LABELS` + filter buttons in `index.html` |
| Hero moving wall + speeds | `js/main.js` → `buildHeroBackground()` (auto-built from `GALLERY`) |

## Structure

```
├── index.html      # page content (hero, work, about, FAQ, contact)
├── css/style.css   # editorial dark design system
├── js/main.js      # gallery, filters, lightbox, hero wall, FAQ, animations, form
└── images/         # your real thumbnail files
```
