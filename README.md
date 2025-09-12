# Daily Blog (Eleventy)

## Local Development

- Install deps: `npm install`
- Start dev server: `npm run dev` (http://localhost:8080)
- Build: `npm run build` (outputs to `dist/`)

## Content

- Posts live in `src/posts/` as Markdown files with front matter.
- Tags are arrays in front matter, e.g. `tags: [tech, notes]`.
- Add pages like `src/about.njk` using `layout: layouts/page.njk`.

## Search

- A lightweight client-side search is available at `/search/`.
- The index is generated as `/search.json` from Eleventy collections.

## Theme Toggle

- Click "Toggle Theme" in the header. Preference is persisted to `localStorage`.

## Analytics (Optional)

- Configure in `src/_data/site.json` under `analytics`:
  - Plausible: `{ "provider": "plausible", "domain": "yourdomain.com" }`
  - Umami: `{ "provider": "umami", "src": "https://umami.yourdomain.com/script.js", "website_id": "<uuid>" }`

## Deploy

### GitHub Pages

1. Push this repo to GitHub.
2. Ensure default branch is `main`.
3. GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys to Pages on push.
4. In repo Settings → Pages, set Source to "GitHub Actions" (if needed).
5. If using a project site (https://<user>.github.io/<repo>), set `site.base` in `src/_data/site.json` to `"/<repo>"`. For a user/org site (https://<user>.github.io), keep it `""`.

### Netlify

1. Connect the repo on Netlify.
2. Build command: `npm run build` — Publish directory: `dist`.
3. `netlify.toml` already included.

### Vercel

1. Import the repo on Vercel.
2. Framework: "Other"; Build command `npm run build`; Output `dist`.
3. `vercel.json` already included.

## Custom Domain

- Replace `src/CNAME` with your domain (e.g., `blog.example.com`).
- Update `src/_data/site.json` `url` to `https://your-domain` and keep `base` to `""`.
