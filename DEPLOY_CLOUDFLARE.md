# Deploying the frontend with Cloudflare Workers Builds

The `coreapex` Worker builds this repository on every push and shows up on GitHub
as the **Workers Builds: coreapex** status check. This document explains the
configuration it needs and what was missing.

---

## Why the check was failing

Cloudflare's build runs two steps ([docs](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)):

1. **Build command** (optional) — e.g. `npm run build`
2. **Deploy command** — defaults to `npx wrangler deploy`

> If your repository does not have a Wrangler configuration file, the deploy
> command (`wrangler deploy`) will trigger automatic project configuration. This
> detects your framework, creates the necessary configuration, and opens a pull
> request for you to review.

This repository had **no Wrangler configuration file**, so the deploy step never
uploaded anything — it tried to open an autoconfiguration pull request instead,
which cannot complete inside a non-interactive build. Locally that failure is
reproducible in one command:

```console
$ npx wrangler deploy --dry-run
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

The very first check (commit `9e1c620`) passed because it came from the Worker
creation step, not from a repository build; every push afterwards failed.

## The fix

| File | Purpose |
| --- | --- |
| `wrangler.jsonc` (repo root) | Declares Worker `coreapex` and uploads the built site from `./frontend/dist` as static assets, with SPA fallback. |
| `frontend/wrangler.jsonc` | The same Worker expressed relative to `frontend/` (`./dist`), so the build works whether Cloudflare's *Root directory* is the repository root or `frontend/`. Wrangler resolves `directory` against the config file it loads, so both point at the same `dist/`. Keep the two files in sync. |
| `package.json` + `package-lock.json` (repo root) | Give the build a root-level `npm run build` that installs and builds the frontend (`npm --prefix frontend ci && npm --prefix frontend run build`), and pin `wrangler` so Workers Builds uses that version. |

Routes are served with `not_found_handling: "single-page-application"`, so deep
links such as `/projects/erp-software` survive a refresh.

## Recommended Cloudflare settings

**Workers & Pages → coreapex → Settings → Build**

| Setting | Value |
| --- | --- |
| Root directory | *(empty — repository root)* or `frontend/` — both work with the committed configs |
| Build command | `npm run build` (repository root) or `npm ci && npm run build` (`frontend/`) |
| Deploy command | `npx wrangler deploy` (the default) |
| Build variables | `VITE_API_URL` — see below |

The build command is optional: because `wrangler.jsonc` declares the assets
directory, `npx wrangler deploy` alone uploads whatever is in `frontend/dist`,
so the build command must be the step that produces it.

### Pointing the site at the API

Vite inlines `VITE_API_URL` at **build** time, and Workers Builds keeps
build-time variables separate from runtime ones ([docs](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/)).

Add a *build variable* under **Settings → Build → Variables and secrets**:

```
VITE_API_URL = https://<your-api-host>/api/v1
```

Without it the bundle calls `/api/v1` on the Worker's own origin. The Worker only
serves static assets, so those calls 404 and `src/services/api.js` falls back to
`src/data/mockData.js` — the site still renders, but with fallback content
instead of live data from Django. Either set the build variable to your deployed
API (for example the Render service from `DEPLOY_RENDER.md`), or extend the
Worker into an API proxy later.

## Verifying

Locally — the same two commands the build runs:

```bash
npm run build                      # -> frontend/dist
npx wrangler deploy --dry-run      # -> "Read N files from the assets directory …/frontend/dist"
```

From `frontend/` as well, to cover the other root directory:

```bash
cd frontend && npx wrangler deploy --dry-run
```

On GitHub — after a push, the check on the new commit should conclude
`success`:

```bash
gh api repos/rajamohamed0210-gencode/CoreApex/commits/<sha>/check-runs \
  --jq '.check_runs[] | "\(.name): \(.conclusion)"'
```

A `deploy` from a real build produces a new Worker **Version ID** in the check
summary; that is the signal that the site (not just the build) is live.
