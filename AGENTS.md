# Project working instructions

## Engineering conventions

- Follow `CONTRIBUTING.md` and keep changes scoped to the requested work.
- Use strict TypeScript, explicit domain types, descriptive names, focused React components, and semantic HTML. Avoid `any`, unsafe HTML injection, and unnecessary abstractions.
- Keep scientific content, citations, measurements, and asset metadata in typed records rather than page markup. Treat reconstructed appearance and uncertain claims explicitly.
- Build reusable components around actual shared behavior. Keep rendering, content validation, and interaction logic separate where this improves clarity.
- Preserve keyboard access, visible focus, responsive layouts, and reduced-motion alternatives. Animation must enhance an already usable page.

## Documentation and verification

- Update relevant architecture, content, asset, and contributor documentation alongside behavior changes. Use comments to explain non-obvious decisions rather than restate code.
- Add meaningful tests for changed domain rules and interactions. Do not add tests that merely mirror implementation.
- Run the relevant checks before delivery; implementation work should pass type checking, lint, tests, and production build. Report any checks that could not be completed.
- Visually check changed layouts at desktop and mobile widths and check reduced motion. Do not claim browser or accessibility verification without performing it.

## Git practices

- Inspect the working tree before changes and preserve unrelated user work.
- Use short-lived `codex/<descriptive-name>` branches for implementation unless the user requests otherwise.
- Keep diffs focused and commits coherent. Use Conventional Commit messages when committing.
- Do not rewrite history, force-push, commit credentials, or include dependencies/build output. Do not commit or push unless requested or already authorized.
- Include the problem, resulting behavior, validation, and material limitations in pull request descriptions when a PR is requested.

## Current direction

- The user wants an expandable, illustration-first dinosaur archive with optional 3D, expressive purposeful animation, and an authored editorial appearance.
- `docs/design/archive-expansion-plan.md` records the proposed rollout. The user authorized the rollout with a manual review checkpoint for every phase; do not advance past a checkpoint without their review.

## Authorized phased delivery

- The user has authorized logical commits, GitHub PR creation, and merges for this redesign, with a manual review checkpoint after every phase.
- Complete and verify one phase, commit its coherent changes, then pause for the user to run and inspect it. Create its PR and merge only after the user approves that phase. Preserve commit traceability through the PR and a merge commit where repository settings allow.
- The configured remote is `git@github.com:ashenwattegedera/Paleoverse.git`. Do not create a replacement repository or publish through Sites hosting.
