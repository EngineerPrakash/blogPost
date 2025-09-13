# Decap CMS OAuth Provider (GitHub)

Open‑source OAuth provider for Decap CMS using GitHub OAuth. Deploy this folder as a separate project on Vercel (or any Node host).

## Environment variables

- `OAUTH_CLIENT_ID`: GitHub OAuth App Client ID
- `OAUTH_CLIENT_SECRET`: GitHub OAuth App Client Secret
- `OAUTH_REDIRECT_URI`: Full URL to callback endpoint, e.g. `https://your-oauth.vercel.app/api/callback`
- `ALLOWED_ORIGINS` (optional): Comma‑separated allowed origins for postMessage, e.g. `https://engineerprakash.github.io,https://engineerprakash.github.io/blogPost`

## GitHub OAuth App

- Homepage URL: your blog URL, e.g. `https://engineerprakash.github.io/blogPost/`
- Authorization callback URL: `https://your-oauth.vercel.app/api/callback`

Scopes requested: `repo`, `user` (default). You can reduce scopes to `public_repo` if you only need public repos.

## Deploy on Vercel

1. Create a new Vercel project from this `oauth-provider/` folder
2. Set env vars above in Vercel Project Settings → Environment Variables
3. Deploy. The auth endpoint will be: `https://<your-domain>/api/auth`

## Connect to Decap CMS

Edit your blog’s `src/admin/config.yml` and set:

```
backend:
  name: github
  repo: EngineerPrakash/blogPost
  branch: main
  base_url: https://<your-oauth-domain>
  auth_endpoint: /api/auth
```

## Local test

Use `vercel dev` or run any Node server that serves `api/auth.js` and `api/callback.js` under `/api`.
