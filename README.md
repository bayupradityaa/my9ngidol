# 9oshi

Pick your **9 JKT48 oshi**, arrange them into a 3x3 formation, and export it as one
shareable image. Inspired by [my9games.net](https://my9games.net/en), rebuilt around the
idol-fandom "oshi" concept.

> **Fan-made, non-commercial project.** Not affiliated with JKT48, AKB48, or any official
> management. All names & trademarks belong to their respective owners.

---

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite 6 (JavaScript) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first `@theme`) |
| Routing | react-router-dom |
| Icons | lucide-react |
| Image export | html2canvas |
| Backend (optional) | Firebase Firestore — falls back to `localStorage` when not configured |
| Hosting | Cloudflare Pages (connected to GitHub) |

Design system: **Neubrutalism** — see [`design.md`](./design.md) for the canonical spec.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

### Optional: enable shared rankings (Firebase)

The app runs fully without Firebase using per-device `localStorage`. To enable global
rankings:

1. Create a Firebase project → add a **Web app** → copy the config.
2. `cp .env.example .env.local` and fill in:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

3. Create a Firestore collection named **`memberStats`** (documents are auto-created as
   `{ count: number }` keyed by member id).

**These keys are PUBLIC by design.** Security comes from Firestore Rules, not secrecy.

### Firestore Security Rules (MVP)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memberStats/{memberId} {
      allow read: if true;                 // rankings are public
      // Client-side writes can be spammed. For an MVP this allows increments;
      // harden later with a Cloudflare Worker / Cloud Function proxy.
      allow write: if request.resource.data.count is number
                   && request.resource.data.count >= 0;
    }
  }
}
```

> **Vote-spam note:** anyone can call the submit endpoint from the browser console. Fine
> for an MVP. To harden, move ranking writes behind a Cloudflare Worker or Cloud Function.

---

## Project structure

```
src/
  components/   Navbar, Footer, NeoButton, NeoCard, MemberCard, NineGrid, PageShell, …
  context/      ThemeContext (dark/light)
  hooks/        useTopMembers
  i18n/         LanguageContext + dict.js (ID/EN)
  lib/          firebase.js (optional, with local fallback)
  data/         members.js  ← edit the roster here
  pages/        Landing, Create, Rankings, About, Privacy, Terms, Contact, Sources, NotFound
public/
  _redirects    SPA fallback for Cloudflare Pages
  favicon.svg, og-image.svg
```

### Adding / editing members

Edit `src/data/members.js`. The roster is a compact tuple list, mapped to objects at load:

```js
// [id, name, team]
['feni-fitriyanti', 'Feni Fitriyanti', 'passion'],
```

Then:

```js
{ id: 'feni-fitriyanti', name: 'Feni Fitriyanti', team: 'passion', color: '#FF5252' }
```

- **Teams** are defined in the `teams` array as `{ value, label }` — currently
  `love`, `dream`, `passion`, and `trainee`. The UI reads labels via `getTeamLabel()`,
  so renaming a team is a one-line change.
- **Colors** are assigned automatically by cycling a 40-color neobrutalism palette, so you
  don't have to pick one per member. Override `color` on an entry if you want a specific
  oshi color.
- **Photos (deferred, copyright-safe):** by default the UI renders an initials avatar on the
  member's oshi color. To add real photos later, drop files at `public/members/<id>.jpg` and
  set `photo: true` on the member. To serve from a CDN instead, set `VITE_MEMBER_PHOTO_BASE`
  (e.g. a Cloudflare R2 public URL) — no code change needed.

The shipped roster reflects the current active lineup (Team Love / Dream / Passion + Trainee)
as provided, and is not auto-synced with official announcements — update it when the lineup
changes. Saved picks in `localStorage` are filtered against this list on load, so removing a
member never breaks an existing selection.

---

## Deploy: GitHub → Cloudflare Pages

The repo is ready to push. **Creating the GitHub repo and connecting Cloudflare needs your
account — those steps are yours.**

1. **Create a GitHub repo** (empty, no README) and push:

```bash
git init
git add .
git commit -m "feat: 9oshi initial"
git branch -M main
git remote add origin https://github.com/<you>/9oshi.git
git push -u origin main
```

2. **Cloudflare Pages** → *Create project* → *Connect to Git* → pick the repo, then:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** add the `VITE_FIREBASE_*` values (and optionally
     `VITE_MEMBER_PHOTO_BASE`) if you use them.

3. Every push to `main` auto-deploys. `public/_redirects` (`/* /index.html 200`) handles
   SPA routing so deep links like `/create` work on refresh.

---

## Responsive conventions

- **Mobile-first breakpoints:** single column below `640px`, two columns at `sm`, three to five
  columns at `md`/`lg`. Wide content (e.g. the rankings table) scrolls horizontally inside a
  bordered wrapper instead of clipping.
- **Touch targets:** all interactive elements are at least ~40px tall (buttons, footer links,
  icon buttons, filter chips).
- **Sticky navigation:** the header is `sticky top-0`; the Create page preview panel is
  `lg:sticky lg:top-24` so it never slides under the header.
- **Mobile action bar:** `/create` renders a fixed bottom bar (Generate shortcut) below `lg`
  so the primary CTA stays reachable without scrolling past the member grid. The page adds
  `body.has-mobile-action-bar { padding-bottom }` on mobile so the bar never covers the footer;
  it is not rendered at all on desktop.
- **Safe area:** the mobile action bar adds `env(safe-area-inset-bottom)` padding for notched
  devices.
- **Reduced motion:** `.neo-float` and smooth scrolling are disabled under
  `prefers-reduced-motion`.

---

## Notes on the design spec

`design.md` is the canonical neobrutalism spec. This build follows it, with a few
deliberate, documented deviations driven by the project brief:

- **Pure black borders/shadow (`#000`)** — kept intentionally (the brief specifies
  `3px solid #000` + `4px 4px 0 #000`); used consistently for hard outlines and shadows.
- **Sharp corners (0px)** — the brief calls for sharp corners; no border radius is applied.
- **Fonts:** Archivo Black (display) + Space Grotesk (body) for bold display typography.
- **Custom utilities live in `src/index.css`**, not a `<style>` tag with Tailwind CDN —
  correct for a Vite app (purge + build optimization, no CDN runtime).
