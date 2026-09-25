# Deploying Core Apex.dev to Render

Everything needed is already in the repo: `render.yaml` is a **Render Blueprint** that
creates the database and both services in one go.

| Resource | Type | Plan | What it is |
| --- | --- | --- | --- |
| `coreapex-db` | PostgreSQL 16 | free (1 GB) | Managed database, Singapore |
| `coreapex-api` | Python web service | free | Django + DRF + gunicorn + WhiteNoise |
| `coreapex-web` | Static site | free | React 19 + Vite build, SPA rewrites, cache headers |

Total: **$0/month** on the free tier. Limits are listed in §6.

---

## 1. Prerequisites

1. The code must be on GitHub — it is: `rajamohamed0210-gencode/CoreApex`.
2. A Render account (GitHub sign-in is easiest): <https://dashboard.render.com/register>
3. Merge PR #1 into `main` first (recommended), **or** deploy the branch directly.
   Render can build any branch — but `render.yaml` only takes effect on the branch
   Render is pointed at, so the blueprint and the code must be on that same branch.

Current state: PR #1 (`arena/01a0d7fe-coreapex` → `main`) contains the whole revamp
*plus* this deploy config. Merging it makes `main` deployable in one step.

---

## 2. Deploy (Blueprint — one click)

1. Open <https://dashboard.render.com/blueprints> → **New Blueprint Instance**.
2. Connect GitHub if asked, then pick the repo `rajamohamed0210-gencode/CoreApex`.
3. **Blueprint Name**: `Core Apex` · **Branch**: `main` (or `arena/01a0d7fe-coreapex`).
   Blueprint Path stays `render.yaml`.
4. Render reads the file and shows the three resources it is about to create.
   It will prompt for the one secret the file does not hard-code:
   **`DJANGO_SUPERUSER_PASSWORD`** → type a strong password for the `/admin/` login.
   (This is the blueprint's `sync: false` variable; leave it blank only if you want to
   change the password later from inside Django admin.)
5. Click **Apply**. The first sync takes roughly 4–8 minutes. A green check appears
   next to each resource as it finishes.

What happens during the API build, in order:

```
pip install -r requirements.txt        # gunicorn, psycopg2, whitenoise, …
python manage.py collectstatic         # 154 static files -> WhiteNoise
python manage.py migrate               # creates the schema on Postgres
python seed_data.py                    # fills an EMPTY database only
gunicorn config.wsgi:application …     # serves /api/v1/
```

`seed_data.py` is guarded by `SEED_IF_EMPTY=1`, so every later deploy skips the
content seed and **never overwrites live leads or admin edits**.

---

## 3. Verify it worked

Grab the two URLs from the dashboard and run:

```bash
curl -s https://coreapex-api.onrender.com/api/v1/services/ | head -c 200
curl -s -o /dev/null -w "%{http_code}\n" https://coreapex-api.onrender.com/api/v1/site-settings/
curl -s -o /dev/null -w "%{http_code}\n" https://coreapex-web.onrender.com/
```

Then in the browser:

- [ ] Home page renders with images, animations, and **real services/projects** (not empty lists)
- [ ] Project detail pages (`/projects/<slug>`) load
- [ ] Contact form submits and shows the success message
- [ ] The new lead appears at `https://coreapex-api.onrender.com/admin/` → *Contact leads*
- [ ] Team section shows the founder & CEO portrait

The first request after 15 minutes of quiet takes ~30–60 s (free services sleep).
That is the platform, not a bug — see §6.

---

## 4. Custom domain (`coreapex.dev`)

1. **Static site** → *Settings* → *Custom Domains* → add `coreapex.dev` (and `www`).
2. **API** → *Settings* → *Custom Domains* → add `api.coreapex.dev`.
3. Render shows the exact DNS records to create (an `A`/`AAAA` for the apex and a
   `CNAME api → coreapex-api.onrender.com`). Add them at your DNS provider.
4. Once the domains verify, update these environment variables and redeploy:

| Service | Variable | New value |
| --- | --- | --- |
| `coreapex-api` | `ALLOWED_HOSTS` | `coreapex-api.onrender.com,api.coreapex.dev` |
| `coreapex-api` | `CORS_ALLOWED_ORIGINS` | `https://coreapex.dev,https://www.coreapex.dev` |
| `coreapex-api` | `CSRF_TRUSTED_ORIGINS` | `https://api.coreapex.dev` |
| `coreapex-web` | `VITE_API_URL` | `https://api.coreapex.dev/api/v1` |

`VITE_API_URL` is **baked into the JavaScript bundle at build time** — changing it
does nothing until the static site is redeployed (Manual Deploy → Deploy latest commit).

Schemes matter: origins need `https://`, no trailing slash, comma-separated for many.

---

## 5. Renaming a service

Render service names must be unique per workspace. If `coreapex-api` is already
taken (or you pick different names), change them in **three** places so they agree:

1. `render.yaml` → `services[].name`
2. `render.yaml` → `VITE_API_URL`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`
   (they reference the API hostname `https://<name>.onrender.com`)
3. `render.yaml` → `CORS_ALLOWED_ORIGINS` if the static site was renamed

---

## 6. Free-tier limits (and when to upgrade)

| Limit | Impact | Fix |
| --- | --- | --- |
| Web service sleeps after 15 min idle | First visit waits ~30–60 s | Starter instance, **$7/mo** per service |
| **Free Postgres expires 30 days after creation** | Data is deleted after a 14-day grace period | Upgrade the DB to Basic-256mb (**$6/mo**) before day 30 — or export first |
| 750 free instance-hours/workspace/month | Services suspend for the rest of the month if exceeded | Upgrade, or keep few free services |
| Ephemeral filesystem | Images uploaded in `/admin/` disappear on deploy | Paid instance + persistent disk (`disk:` block is pre-written and commented in `render.yaml`) |
| No shell, no one-off jobs, no pre-deploy command on free | Can't run `manage.py` by hand — that's why migrate + seed are in the build command | Starter instance unlocks shell + `preDeployCommand` (documented in `render.yaml`) |

Site artwork is **bundled with the static site** (`frontend/public/images/`), so the
site looks complete even on a free instance with an empty media folder.

---

## 7. Manual deploy (no blueprint)

If you prefer clicking through the dashboard:

**Database** — *New +* → *Postgres*: name `coreapex-db`, user `coreapex`, region Singapore,
free plan. Copy the **Internal Database URL**.

**API** — *New +* → *Web Service*, repo `CoreApex`, Root Directory `backend`,
Runtime Python 3, Build `pip install --upgrade pip && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput && python seed_data.py`,
Start `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 60`,
Health Check Path `/api/v1/services/`.

Environment variables: `PYTHON_VERSION=3.12.6`, `SECRET_KEY=<generate>`, `DEBUG=False`,
`DATABASE_URL=<internal url>`, `ALLOWED_HOSTS=coreapex-api.onrender.com`,
`CORS_ALLOWED_ORIGINS=https://coreapex-web.onrender.com`, `CSRF_TRUSTED_ORIGINS=https://coreapex-api.onrender.com`,
`SERVE_MEDIA=True`, `SEED_IF_EMPTY=1`, `DJANGO_SUPERUSER_USERNAME=admin`,
`DJANGO_SUPERUSER_EMAIL=coreapex.dev@gmail.com`, `DJANGO_SUPERUSER_PASSWORD=<strong password>`.

**Static site** — *New +* → *Static Site*, same repo, Root Directory `frontend`,
Build `npm ci && npm run build`, Publish `./dist`, env `VITE_API_URL=https://coreapex-api.onrender.com/api/v1`,
plus a rewrite rule `/*` → `/index.html`.

---

## 8. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `400 DisallowedHost` | Host not in `ALLOWED_HOSTS` | Add the domain (comma-separated). The `.onrender.com` hostname is auto-trusted when Render sets `RENDER_EXTERNAL_HOSTNAME`. |
| Console: *blocked by CORS policy* | Origin missing | `CORS_ALLOWED_ORIGINS` must contain the exact site origin with scheme, no trailing slash. |
| Admin login: *CSRF verification failed* | Trusted origin missing | Add `https://<api-host>` to `CSRF_TRUSTED_ORIGINS`. |
| Pages render but lists are empty | DB unreachable / seed skipped | Build log should contain `[SUCCESS] Core Apex.dev database seeded`; check `DATABASE_URL` is linked to `coreapex-db`. |
| `pip install -r requirements.txt` fails in build | Requirements file encoding | Already fixed — the file is UTF-8. |
| Uploaded image 404s after a deploy | Free instances have no persistent disk | Re-upload, or add the paid disk from §6. |
| Very slow first load | Free instance woke from sleep | Expected on free plan. |
| Static site: 404 on refresh of `/projects/x` | Missing SPA rewrite | Rewrite `/*` → `/index.html` (already in `render.yaml`). |

---

## 9. Before you point real customers at this

1. **Rotate the admin password.** The local default is `admin` / `admin123`
   (`backend/seed_data.py`). On Render use `DJANGO_SUPERUSER_PASSWORD`, then change it
   again from `/admin/` → *Users* → *Change password*.
2. **Lock down the leads API.** `GET /api/v1/leads/` and `PATCH /api/v1/leads/<id>/`
   currently have **no permissions** (`backend/apps/contacts/views.py`), so anyone can
   read every customer inquiry (name, email, phone, budget) and change its status.
   The SPA route `/admin-leads` also renders publicly. Minimal fix:

   ```python
   from rest_framework.permissions import IsAuthenticated

   class ContactLeadListView(generics.ListAPIView):
       permission_classes = [IsAuthenticated]
       ...

   class ContactLeadUpdateStatusView(generics.UpdateAPIView):
       permission_classes = [IsAuthenticated]
       ...
   ```

   (Django admin is unaffected — it already requires a login.)
3. **Upgrade the database before day 30** (§6) so the free Postgres is not deleted.
4. Optional: set `EMAIL_HOST*` / `PROJECT_REQUEST_RECIPIENT` env vars to get lead
   notification emails (placeholders are listed in `render.yaml`).
