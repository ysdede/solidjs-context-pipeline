---
source_repo: solid-start
source_path: solid-start\packages\start\src\config\lazy.ts
domain: ssr
extracted_at: "2026-02-01T15:19:27.055Z"
---

---
source_repo: solid-start
source_path: solid-start\packages\start\src\config\lazy.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.055Z"
---

## API Documentation 1

Maps module ids to their client-specific shared chunk names.
Modules in shared chunks need to find their assets via the chunk name, instead of their module id.
Vite includes assets of such modules in the manifest via the chunk name:
https://github.com/vitejs/vite/blob/4be37a8389c67873880f826b01fe40137e1c29a7/packages/vite/src/node/plugins/manifest.ts#L179
https://github.com/vitejs/vite/blob/4be37a8389c67873880f826b01fe40137e1c29a7/packages/vite/src/node/plugins/manifest.ts#L319
Rollup occassionally creates shared chunks automatically,
but they can also be manually created by the user via:
https://rollupjs.org/configuration-options/#output-manualchunks
More infos on Rollup's logic:
https://github.com/rollup/rollup/issues/3772#issuecomment-689955168
