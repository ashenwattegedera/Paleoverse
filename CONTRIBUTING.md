# Contributing

## Setup

Use Node 20.19+ or 22.12+, then run `npm install` and `npm run dev`. Before submitting changes, run `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`.

## Working agreements

- Keep dinosaur facts in typed data records, with claims connected to real references.
- Mark estimates and debated reconstructions; never present an unrigged/static model as animated.
- Do not add media without a recorded creator, original source and license.
- Prefer focused React components, strict TypeScript, semantic HTML and the established design tokens.
- Support narrow touch layouts, keyboard use and `prefers-reduced-motion`.
- Do not use unsafe HTML injection or commit credentials, build output or dependencies.

## Changes

Use short feature branches where helpful (`feature/timeline`, `fix/mobile-viewer`). Use Conventional Commit messages such as `feat: add fossil range panel`, `fix: restore model cleanup`, and `docs: clarify asset license status`. Keep a commit focused on one coherent change. Include source and asset documentation when content or media changes.

Pull requests should explain user-visible behavior, show relevant test/build results, identify citations and media licenses, and describe any known limitations. Include screenshots for visual changes when available.
