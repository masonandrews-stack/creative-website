# Nano Banana ONE/ONE

An interactive wearable-art ecommerce concept built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. The provided cream shirt photos are paired with six original Dream Machines print graphics.

## Experience

- Front/back product views with subtle pointer tilt and motion.
- Custom prompt generation, character counter, six style treatments, and $49 pricing.
- Animated random dice generation, keep/reroll actions, and $39 pricing.
- Mobile swipe and button controls for variations.
- Six selectable weekly designs, a persisted countdown, archive reveals, and fictional community posts.
- Sizes S through XXL, prototype orders, cart persistence, retired visual variants, and downloadable generation certificates.

Generation selects from local artwork samples and visual treatments; there is no live image-generation API. Orders, certificates, scarcity, community posts, and counters are simulated. No payment or physical order is processed. Saved orders and drop timing use this browser's local storage; retirement is local to that collection.

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

Vite uses `/creative-website/` as the base path. All product and art images resolve through `import.meta.env.BASE_URL`, and the favicon uses `%BASE_URL%`.

## Artwork

`public/shirts/front.png` and `back.png` are the supplied product references. `public/art/dream-01.png` through `dream-06.png` are original generated print assets. The permanent banana mark is based on the supplied upper-back mark. These are independent concept assets rather than official Google merchandise.

The six print assets and transparent banana extraction were created with the built-in image generation tool. Their complete prompts are recorded in [ARTWORK_PROMPTS.md](ARTWORK_PROMPTS.md).
