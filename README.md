# Ogaloader — Marketing Website

Landing page for **Ogaloader**, Africa's Digital Freight & Commodity Marketplace.

## Stack

- HTML, CSS, Vanilla JS — no framework, no build tool
- Google Fonts (Inter + Plus Jakarta Sans) via CDN
- Deployed on Vercel

## Structure

```
ogaloader/
├── index.html      # Single-page site
├── style.css       # All styles
├── main.js         # Scroll animations, nav, waitlist form
├── vercel.json     # Vercel routing config
└── README.md
```

## Running Locally

```bash
python3 -m http.server 3000
# open http://localhost:3000
```

Or with auto-reload:

```bash
npx live-server --port=3000
```

## Deploying

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on every push to `main`.

## Sections

1. Navigation
2. Hero
3. Trust bar
4. Problem
5. How It Works
6. Features
7. Who It's For
8. Marketplace
9. Waitlist CTA
10. Footer

## Waitlist

The form currently shows a success state client-side only. Emails are not yet persisted. Next step is to wire it up to a backend endpoint or a form service (Formspree / Web3Forms).
