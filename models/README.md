# Local model assets

Place rights-cleared specimen assets beneath this directory using paths from the dinosaur record. The T. rex viewer expects:

```text
models/trex_highpoly/SM_trex_highpoly.fbx
models/trex_highpoly/trex_basecolor.png
models/trex_highpoly/trex_normal.png
models/trex_highpoly/trex_roughness.png
models/trex_highpoly/trex_metallic.png
```

The workspace-provided files are locally present but ignored by Git while creator/source/license remain unknown. Do not remove the ignore rules or publish the media until the asset license is established and recorded in `docs/assets/manifest.md`. Vite serves `models/` directly as its public directory, avoiding another 33 MB asset copy.
