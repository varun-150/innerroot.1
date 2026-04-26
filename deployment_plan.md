# Deployment & Integration Plan: Inner Root Platform

## Overview
This plan outlines the steps to deploy the **Inner Root** platform to production with three services: React frontend (Vercel), Spring Boot backend (Railway/Render), and Node.js OTP service (Railway/Render) sharing a cloud MySQL database.

---

## Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌───────────────┐
│  React App   │────▶│  Spring Boot API │────▶│    MySQL 8    │
│  (Vercel)    │     │  (Railway)       │     │  (Railway)    │
│  :443        │     │  :8080           │     │  :3306        │
└──────┬───────┘     └──────────────────┘     └───────┬───────┘
       │                                              │
       │             ┌──────────────────┐             │
       └────────────▶│  OTP Service     │─────────────┘
                     │  (Railway)       │
                     │  :3001           │───▶ Resend (Email OTP)
                     └──────────────────┘
```

---

## 1. Database — Railway MySQL

1. Log in to [Railway](https://railway.app/)
2. Create a new project → **New Service** → **Database** → **MySQL**
3. Once created, go to **Variables** tab and copy:
   - `MYSQLHOST` → use as `DB_HOST`
   - `MYSQLPORT` → use as `DB_PORT`
   - `MYSQLDATABASE` → use as `DB_NAME`
   - `MYSQLUSER` → use as `DB_USER`
   - `MYSQLPASSWORD` → use as `DB_PASSWORD`
   - `MYSQL_URL` → use as `DATABASE_URL` (for Spring Boot, convert to JDBC format)

> **JDBC format:** `jdbc:mysql://MYSQLHOST:MYSQLPORT/MYSQLDATABASE?useSSL=true&serverTimezone=UTC`

---

## 2. Backend — Railway (Spring Boot)

1. In the same Railway project → **New Service** → **GitHub Repo**
2. Select `innerroot.1` repo, set **Root Directory** to `inner-root-backend`
3. Add these **Variables**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `jdbc:mysql://HOST:PORT/DB?useSSL=true&serverTimezone=UTC` |
| `DB_USER` | (from MySQL service) |
| `DB_PASSWORD` | (from MySQL service) |
| `JWT_SECRET` | Generate: `openssl rand -hex 64` |
| `GOOGLE_CLIENT_ID` | (your Google OAuth ID) |
| `AI_API_KEY` | `sk-or-v1-75ea...` |
| `AI_API_URL` | `https://openrouter.ai/api/v1/chat/completions` |
| `AI_API_MODEL` | `google/gemini-2.0-flash-lite-001` |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

4. Railway auto-detects `railway.json` and builds with Nixpacks
5. Note the **public URL** (e.g., `https://inner-root-backend-production.up.railway.app`)

---

## 3. OTP Service — Railway (Node.js)

1. In the same Railway project → **New Service** → **GitHub Repo**
2. Select `innerroot.1` repo, set **Root Directory** to `otp-service`
3. Add these **Variables**:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `DB_HOST` | (from MySQL service) |
| `DB_PORT` | (from MySQL service) |
| `DB_NAME` | (from MySQL service) |
| `DB_USER` | (from MySQL service) |
| `DB_PASSWORD` | (from MySQL service) |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `SMS_PROVIDER` | `resend` |
| `RESEND_API_KEY` | `re_8GheS1fc_7wdswcyNnLGoBqKjdk5Gq4du` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

4. Note the **public URL** (e.g., `https://otp-service-production.up.railway.app`)

---

## 4. Frontend — Vercel

1. Log in to [Vercel](https://vercel.com/)
2. Import `innerroot.1` repo
3. Set **Root Directory** to `react-project`
4. Set **Framework Preset** to `Vite`
5. Add **Environment Variables**:

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://inner-root-backend-production.up.railway.app/api` |
| `VITE_OTP_URL` | `https://otp-service-production.up.railway.app` |
| `VITE_GOOGLE_CLIENT_ID` | (your Google OAuth ID) |

6. Click **Deploy**
7. Note the **production URL** (e.g., `https://inner-root.vercel.app`)

### ⚠️ After Vercel Deploy — Update Backend CORS
Go back to Railway and update `ALLOWED_ORIGINS` on **both** backend and OTP service with the actual Vercel URL.

---

## 5. Alternative: Render Deployment

The `render.yaml` blueprint supports one-click deployment:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Blueprint**
3. Connect `innerroot.1` repo
4. Render auto-reads `inner-root-backend/render.yaml`
5. Fill in the env vars marked as `sync: false` in the dashboard

---

## 6. Post-Deployment Verification

| Check | URL | Expected |
|---|---|---|
| Backend Health | `https://backend.railway.app/api/health` | `{ "status": "UP" }` |
| OTP Health | `https://otp.railway.app/health` | `{ "status": "ok" }` |
| Frontend | `https://your-app.vercel.app` | Landing page loads |
| Admin Login | `/login` → `admin@innerroot.com` / `InnerRootAdmin2026!` | Dashboard access |
| OTP Test | POST `/otp/send` with `{ "phone": "+91..." }` | Email received via Resend |

---

## 7. Monitoring & Post-Deployment

- **Railway Logs**: Monitor each service's logs for errors
- **Vercel Analytics**: Track frontend performance
- **Resend Dashboard**: Monitor email delivery rates at [resend.com/emails](https://resend.com/emails)
- **GitHub Actions**: CI runs on every push to `main`

---

## 8. Cost Estimate

| Service | Free Tier | Paid |
|---|---|---|
| Vercel | 100GB bandwidth/mo | $20/mo (Pro) |
| Railway | $5 free credit/mo | $5+/mo (usage) |
| Resend | 3,000 emails/mo | $20/mo (50K) |
| **Total** | **$0–5/mo** | **$25–45/mo** |

---

> [!IMPORTANT]
> **Change the default admin password** immediately after the first login.
> **Rotate API keys** if the repo was ever public with secrets committed.
