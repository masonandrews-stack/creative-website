# Meadow

Meadow is a single-screen productivity landing page built from the supplied master prompt with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Local development

Use Node.js 22.12 or newer (Node 24 is used in deployment).

```sh
npm ci
npm run dev
```

## Validation and production preview

```sh
npm run lint
npm run build
npm run preview
```

Open the preview at `http://localhost:4173/creative-website/`.

## GitHub Pages

Repository: https://github.com/masonandrews-stack/creative-website

Website: https://masonandrews-stack.github.io/creative-website/

The deployment workflow builds and checks the project on each push to `main`, then publishes `dist` to GitHub Pages. In repository Settings → Pages, choose **GitHub Actions** as the source. The workflow can also be rerun manually from the Actions tab.

Vite uses `/creative-website/` as the base path. The background video resolves through `import.meta.env.BASE_URL` and the favicon through `%BASE_URL%` to support that project path.

The actual supplied video is saved at `public/hero.mp4` from https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/meadow/hero.mp4.

## Template behavior

The supplied design and animations are preserved. Navigation changes the active pill and URL fragment; the template contains no additional destination sections. The waitlist form prevents submission and has no storage or email service. The fixed centered desktop navigation can overlap on narrow phone widths because the supplied template includes no mobile breakpoint.
