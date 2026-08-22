# DellerTech Portfolio

A fullstack portfolio built with React (Vite + Tailwind + Framer Motion) on the frontend
and Node.js/Express + MongoDB on the backend. Projects are managed through a
password-protected admin dashboard so new work can be added without touching code, with
images hosted on Cloudinary and contact-form submissions saved to MongoDB and emailed to
you automatically.

## Project structure

```
client/   React app (Vite)
server/   Express API (MongoDB, Cloudinary, Nodemailer, JWT auth)
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB connection string (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [Cloudinary](https://cloudinary.com) account (free tier is enough) for project images
- An email account for sending contact-form notifications (Gmail + an
  [App Password](https://myaccount.google.com/apppasswords) is the easiest option)

## 2. Install dependencies

From the repo root:

```bash
npm run install:all
```

This installs dependencies in both `client/` and `server/`.

## 3. Configure environment variables

Copy the example env files and fill in your real values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

- `server/.env` — MongoDB URI, JWT secret, admin email/password, Cloudinary keys, email SMTP settings.
- `client/.env` — leave `VITE_API_URL=/api` (the Vite dev server proxies `/api` to the Express server).

## 4. Seed the database

Create your admin login (used to access `/admin`):

```bash
npm run seed:admin
```

Seed a few placeholder projects so the site isn't empty on first run (safe to skip if you'd rather add your own via the admin dashboard):

```bash
npm run seed:projects
```

## 5. Run the app

```bash
npm run dev
```

This starts the Express API on `http://localhost:5000` and the React app on
`http://localhost:5173` together.

- Public site: `http://localhost:5173`
- Admin login: `http://localhost:5173/admin/login` (credentials from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env`)

## 6. Managing projects

Log in at `/admin/login`, then use the dashboard at `/admin` to add, edit, or delete
projects — including uploading a project image, which is stored on Cloudinary and served
via CDN. Changes appear on the public Projects page (and Home page, if marked "Featured")
immediately, no redeploy required.

## 7. Building for production

```bash
npm run build
```

Builds the client into `client/dist`. Deploy `server/` as a Node service (e.g. Render,
Railway, Fly.io) and `client/dist` as a static site (e.g. Vercel, Netlify), pointing
`VITE_API_URL` at your deployed API's URL before building.
