# Contributing

## Setup

Use Node 20.19+ or 22.12+, then run `npm install` and `npm run dev`. Before submitting changes, run `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`.

## Working agreements

- Keep dinosaur facts in typed data records, with claims connected to real references.
- Mark estimates and debated reconstructions; never present an unrigged/static model as animated.
- Do not publish media without recorded creator/provider, source, rights and attribution metadata. Generated illustrations also need their prompt/tool/date and reconstruction caveats. Artwork and models are optional.
- Prefer focused React components, strict TypeScript, semantic HTML and the established design tokens.
- Support narrow touch layouts, keyboard use and `prefers-reduced-motion`.
- Do not use unsafe HTML injection or commit credentials, build output or dependencies.

## Changes

Use short-lived `codex/<descriptive-name>` implementation branches. Inspect the working tree and preserve unrelated changes. Use Conventional Commit messages such as `feat: add fossil range panel`, `fix: restore model cleanup`, and `docs: clarify asset license status`. Keep a commit focused on one coherent change. Include source and asset documentation when content or media changes.

Pull requests should explain user-visible behavior, show relevant test/build results, identify citations and media licenses, and describe any known limitations. Include screenshots for visual changes when available.

## Phased redesign review

For each phase, make coherent Conventional Commits, run checks and prepare local review instructions. Pause for the user to run and inspect the phase before opening its PR or merging it. Apply feedback and rerun affected checks. After approval, publish the phase branch, create a PR with validation and limitations, and merge without rewriting unrelated history. Keep the logical commits visible in the PR. Do not start the next phase before this checkpoint is completed. See `docs/development/phase-1-review.md` for the first checklist.

Include the PR title/body, branch/base and logical commit messages in each phase handoff. The shared PR template and phase-specific review documents keep the problem, implementation, validation and manual review traceable.
