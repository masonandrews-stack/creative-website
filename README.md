# BackSupport

A student marketing venture website for a B2B furniture-retrofit concept. BackSupport helps universities and institutions explore extending the useful life of existing chairs and equipment, starting with an add-on back support overlay.

## Website

https://masonandrews-stack.github.io/creative-website/

## Features

- Responsive institutional marketing website with section navigation and a mobile menu.
- Three selectable retrofit concepts and original SVG chair illustrations.
- Interactive savings estimator with editable chair counts and per-chair costs. All amounts are illustrative; the calculator handles zero costs and scenarios where upgrades cost more.
- Pilot inquiry form that prepares an email for review in the visitor's email app. No backend submission or data storage.
- Expandable FAQs explaining fit, safety, pricing assumptions, and the concept-stage status of the venture.

The site does not claim certified ergonomic or medical benefits, actual customer results, established pricing, or available inventory. Costs and feasibility require assessment. Contact inquiries go to Mason Andrews at the existing student email address.

## Development

Use Node.js 24 (matching deployment), or a newer supported version.

```sh
npm ci --include=dev
npm run dev
```

The Vite base path is `/creative-website/`.

## Validation

```sh
npm run lint
npm run build
npm run preview
```

The preview serves the production build at port 4173, under `/creative-website/`.

Browser checks: verify navigation at mobile and desktop sizes; switch each retrofit concept with mouse and keyboard; change all calculator inputs; check zero and negative savings scenarios; prepare an inquiry and inspect the generated mailto link; expand FAQs; confirm all images/illustrations display and there is no horizontal page overflow.

## Deployment

The existing GitHub Actions workflow runs lint/build on pushes to `main`, then deploys `dist` to GitHub Pages. Repository Settings → Pages must use **GitHub Actions** as its source.

## Assets

Current chair illustrations are local inline SVG concept diagrams. Typography uses Google Fonts with local system fallbacks. Artwork from the previous interactive storefront remains in `public/` but is not used by the BackSupport site; its historical prompts remain in `ARTWORK_PROMPTS.md`.
