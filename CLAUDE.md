# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal/professional website: a 3D interactive world (React + Three.js via `@react-three/fiber` + `@react-three/drei`) showcasing Victor's profile, plus a static CV at `/cv/`. Deploys to GitHub Pages (`vmleon.github.io`).

## Commands

```sh
npm install
npm run dev      # vite dev server on http://localhost:5173
npm run lint     # eslint
npm run build    # production build to dist/
npm run preview  # preview the built dist/
```

No test suite.

## Architecture

**Two entry points, one build.** `vite.config.js` declares `rollupOptions.input` with `main` → `index.html` (the React 3D app) and `cv` → `cv/index.html` (a hand-written static HTML page with inline `<style>`). The CV page is deliberately framework-free — don't fold it into the React app. It links back to `/` and is linked from the React app's nav.

**3D world flow (`src/`):**

- `main.jsx` mounts `<World />` under `StrictMode` and imports `styles.css`.
- `World.jsx` owns the single `active` state (which section overlay, if any, is open) and renders the `<Canvas>` with three `<Zone>` meshes plus an `<Overlay>` when a zone is active.
- `Zone.jsx` is a clickable 3D box with hover state that calls `onOpen` (parent wires it to `setActive('experience' | 'projects' | 'about')`).
- `Overlay.jsx` is a DOM modal (outside the Canvas) that closes on Escape or backdrop click.
- `content.jsx` holds the overlay copy — **it must stay `.jsx`** because it returns JSX fragments. Vite 8 uses rolldown, and JSX in `.js` files breaks the dependency scanner.

**Adding a new section** means: add a zone in `World.jsx`, add a matching key in `content.jsx`, done. Section keys are the contract between the two.

## Conventions / gotchas

- `type: "module"` in `package.json` — no `__dirname` in configs. Use `import.meta.dirname`.
- Any file containing JSX **must** use `.jsx` (Vite 8/rolldown will not parse JSX in `.js`).
- `vite.config.js` uses absolute paths via `resolve(import.meta.dirname, ...)` for the multi-entry input — relative paths would break depending on where vite is invoked from.
- Three.js chunk is ~1.2 MB; the build warning about >500 kB chunks is expected and intentionally not code-split for this POC.
- Deployment is fully automated: push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages. Don't hand-deploy.
