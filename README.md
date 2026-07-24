# Ar-Ameeff M. Adjarail — Portfolio Redesign

A complete React + Vite portfolio rebuilt with a red-and-white visual identity, full light and dark modes, responsive layouts, rich animation, an interactive L&D dashboard, certificate gallery, professional memberships, projects, education, skills, blog, and a real email handoff.

## Included

- Accurate full-page light and dark themes saved in local storage
- Animated hero with pointer-based 3D portrait movement
- Glassmorphism, bento layouts, reveal animations, floating elements, and scroll progress
- Fully responsive desktop, tablet, and mobile navigation
- 10 featured projects from the original portfolio and current TRAC work
- Dedicated private-repository page for protected GitHub source code
- 16 L&D programs with 296 total hours and event-type classifications
- 19 uploaded certificate/attendance images
- 28 “Simpli learn” e-certificates with verification links
- 2 professional membership records with uploaded proof
- Search and filters for L&D records
- Dashboard metrics and visual category analytics
- New formal portrait
- Contact form that opens a prepared email instead of pretending to send
- Reduced-motion accessibility support
- Netlify SPA redirect configuration
- Optimized public assets: approximately 3.8 MB instead of the previous project’s roughly 70 MB

## Run locally

```bash
npm install
npm run dev
```

Open the address shown by Vite, normally `http://localhost:5173`.

## Production test

```bash
npm run build
npm run preview
```

## Netlify settings

The included `netlify.toml` already declares:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect to `index.html`

## Security

Never commit `.env` files, passwords, API keys, access tokens, app passwords, or database credentials. The `.gitignore` excludes environment files.
