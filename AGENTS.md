# AGENTS.md

## What this is

**Portfolio OS** — an interactive, OS-style single-page portfolio for Thibaut Tenenbaum (Lead Project Manager at Scaleway, certified ergonomist & work psychologist). It mimics a desktop OS: boot sequence, draggable/resizable windows, dock, command palette (`⌘K`), a command palette, a terminal, and an AI "Recruiter Assistant".

Tech is deliberately dependency-light: **React 18 + ReactDOM loaded from unpkg CDNs (SRI-pinned, exact versions)**. In dev, scripts are JSX compiled in-browser by **Babel Standalone**; for production, an esbuild script (`scripts/build.mjs`) precompiles and minifies them into `dist/` with **no Babel at runtime**. Framer Motion was removed — its single use was replaced by a CSS animation. The only devDependency is `esbuild`; there are no bundler, tests, or linter in the dev loop. Not a git repository (a `.gitignore` exists, but there is no `.git`).

## Commands

- `npm run dev` — serves the project root at `http://localhost:3000` (`npx serve . -l 3000`). Dev compiles JSX in-browser; no build step, just hard-refresh (`Cmd+Shift+R`) after edits and watch the console.
- `npm run check` — compile-checks every script with esbuild (catches JSX/syntax errors without opening a browser).
- `npm run build` — precompiles + minifies all scripts into `dist/` and writes a production `dist/index.html` (Babel Standalone removed, scripts swapped for precompiled ones, static assets copied).
- `npm run start` — production run: builds then serves `dist/` at `http://localhost:3000` (`npx serve dist -l 3000`).
- Nothing else. No test/lint/deploy scripts exist; verification is manual in a browser.

## Script architecture (read this first)

There are **no ES modules / imports**. `index.html` loads every file as a classic `<script type="text/babel" data-presets="react">`, in this exact order:

1. `ui.js` — shared primitives
2. `data.js` — content/data model
3. `i18n.js` — i18n stub
4. `modules-core.js` — mission/about/resume/experience/languages/education/contact
5. `modules-clinical.js` — psychotherapy + coaching (licensed clinician)
6. `modules-work.js` — projects
7. `modules-skills.js` — skills
8. `modules-ai.js` — assistant + console
9. `shell.js` — boot/window manager/palette/dock
10. `app.js` — root app, mounts `ReactDOM.createRoot` inside an `OSErrorBoundary`

Load order is a hard dependency: later files consume globals set by earlier ones. If you add a script, place it in the right spot in `index.html`.

### Global namespace contract

Everything is wired through `window` (no imports anywhere):

- `window.JP` — all data (`profile`, `experience`, `projects`, `skills`, `skillCats`, `modules`, `terminal`). Set by `data.js`. **This is the single source of truth for content.**
- `window.JP_MODULES[moduleId]` — module React components; each `modules-*.js` file registers its exports at the bottom (e.g. `window.JP_MODULES.projects = ProjectLab;`).
- `window.JP_SHELL = { Boot, OSWindow, Palette, WIN_DEFAULTS }` — set by `shell.js`.
- `window.JP_I18N = { lang, t }` — set by `i18n.js`; `t(key, fallback)` currently just returns the fallback (hardcoded `"en"`).
- Plain globals on `window` from `ui.js` (`Object.assign(window, {...})`): `Icon, initials, LogoMark, useDraggable, Placeholder, useTypewriter, CountUp, useClock, profileLocation, profileTimezone`, plus `React_hooks` (a named-hooks object). All modules call these as global functions (e.g. `Icon`, `useClock`).

The main renderer reads `window.JP_MODULES[win.id]` and renders it with an `openModule` prop for cross-module navigation.

## Gotcha: all files share one global scope — hook aliasing is required

Because every file is a classic script, **top-level `const`/`let`/`class` declarations land in a shared global lexical scope — a redeclaration across two files is a `SyntaxError`.** Each module file therefore destructures React hooks with a file-unique prefix:

| File | Alias (`useState, useEffect, ...`) |
|------|-----------------------------------|
| `ui.js` | full names (`useState`, `useEffect`, …) |
| `app.js` | `uSA2, uEA2, uRA2, uCA2` |
| `shell.js` | `uSh, uEh, uRh, uCh` |
| `modules-core.js` | `uS1, uE1, uR1` |
| `modules-work.js` | `uSW, uEW, uRW` |
| `modules-skills.js` | `uSS, uMS` (+ `useMemo`) |
| `modules-ai.js` | `uSA, uEA, uRA` |
| `modules-clinical.js` | — (no React hooks) |

**Any new top-level name (including constants) must be globally unique across all files.** Follow the file's existing prefix when adding hooks. Function declarations become `window` properties too, so component names must not collide.

## Adding a new module

1. Write the component file; register at the end: `window.JP_MODULES = window.JP_MODULES || {}; window.JP_MODULES.<id> = <Component>;` (mirror any `modules-*.js`).
2. Add an entry to the `modules` array in `data.js` (needs `id`, `name`, `short`, `icon`, `desc`, `accent`).
3. Add a default size to `WIN_DEFAULTS` in `shell.js` — the window manager falls back to `{ w: 800, h: 600 }` if missing.
4. Add (or reuse) an `Icon` case in `ui.js` — the icon set is a fixed `switch` statement; unknown names render a generic circle.
5. Mobile behavior: `app.js` → `MobileOS` has `dockIds = ["mission","projects","assistant","contact"]` (docked on the iOS home screen) and `mobileHiddenIds = ["console"]`. Add IDs there as appropriate.
6. Accents: CSS vars (`var(--ac)`, `var(--ok)`, `var(--info)`, `var(--warn)`, `var(--rose)`, `var(--ac-bright)`) or raw hex both work.

## Styling

4 CSS files, linked in this order in `index.html`:

- `tokens.css` — design tokens: light-gray "liquid glass" theme, CSS variables (`--bg-*`, `--glass*`, `--line*`, `--ac`/`--ok`/`--info`/`--warn`/`--rose`, `--tx-*` text, `--purple`/`--green-bright` wallpaper orbs). Theme is light-mode only.
- `styles.css` — shell: boot, menubar, windows, dock, palette, shared composite classes (`jp-card`, `jp-chip`, `jp-eyebrow`, `jp-h1`, `jp-sub`, `disp`, `mono`).
- `modules.css` — per-module content.
- `glass.css` — glassmorphism utilities/effects.

Class prefix convention: shell uses `jp-*`; each module uses its own short prefix (`mc-`, `exp-`, `pl-`, `ss-`, `ai-`, `term-`, `lang-`, `edu-`, `resume-`, `about-`, `contact-`). Follow whichever prefix the module already uses.

## Data model & relationships

All in `data.js`:

- `profile` — identity, `status` (incl. `availableFrom`, `seeking`, `location`), `contact`, `about`, `resume`, `trackRecords`, `certifications`, `education`, `languages`.
- `experience[]` — ids like `"exp-a"`, per-role `accent`.
- `projects[]` — ids like `"project-ttm"`; each has `problem`/`solution`/`architecture`/`challenges`/`lessons`/`screens`.
- `skills[]` — grouped by `cat` (matching `skillCats`); each references projects/experience **by id array** (`projects: ["project-ttm"]`, `exp: ["exp-a"]`). `modules-skills.js` resolves ids to names by lookup and falls back to showing the raw id, so dangling ids surface as ugly raw strings — keep the graph consistent when editing.
- `terminal` — feed for the console module (derived from `profile`).

**Copy lives in two places.** Structured content lives in `data.js`, but a lot of UI copy exists inline as the fallback argument of `t("key", "This is the copy")` calls (i18n is a stub, so the fallback IS the rendered text in English). When changing any visible string, you may need to edit both the `data.js` field and/or the `t()` fallback.

## i18n pattern

Every module does `const t = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;` and calls `t("namespace.key", "English fallback")`. Language is hardcoded to `"en"` in `i18n.js`. Keep using this pattern so a real translation implementation can be dropped in later.

## Recruiter Assistant & Console (modules-ai.js)

- `AssistantModule` calls `window.claude.complete(prompt)` when the Claude browser extension has injected `window.claude`; otherwise it uses the rule-based `localAssistantAnswer(question)`, which keyword-matches the question against `window.JP`. `buildContext()` assembles a grounded system prompt from all profile data. Don't break the `window.claude` opt-in path.
- `ConsoleModule` is a fake terminal with a command table in `commandResult()` and a `moduleAliases` map (input names → module ids, e.g. `cv → resume`, `work → projects`). New commands = new `case` in `commandResult`.

## OS behavior (app.js)

- `MOBILE_BREAKPOINT = 900`: at/under 900px you get the iOS-style `MobileOS` (single full-screen window, dock, no desktop); above it the full desktop (menubar, windows, dock, palette).
- All window state is owned by `App`: a `wins` array carrying `z`, `geo`, `minimized`, `maximized`, `closing`. `closeWin` animates for 210ms before removing the window. `z`-management is a shared `zRef` counter.
- Boot overlay shows until `sessionStorage.getItem("jp-booted") === "1"` (set by `finishBoot`). Mission Control auto-opens on first desktop boot.
- `⌘K` / `Ctrl+K` toggles the palette; `Esc` closes it.

## Known issues & gotchas

- **Resume PDF link:** `profile.resume.downloadUrl` is `"./26%20TENCVEN.pdf"` and the file on disk is `26 TENCVEN.pdf` — they must stay in sync. `ResumeModule` mirrors the same fallback in `modules-core.js`.
- `profile.status.availableFrom` is `"2026-01-01"`; Mission Control shows a live "days until available" countdown before the date and switches to "Now / available" once it passes (`availableNow` check in `modules-core.js`).
- `profile.languages` is French, Hebrew, English (C2 / C2 / C1). Keep `i18n` fallbacks and the `localAssistantAnswer` keyword rules consistent with that.
- No automated browser tests. `npm run check` validates that every script compiles; after bigger changes manually run through boot, a few windows, resize/drag, mobile width, the terminal, and the assistant (which uses live AI only if the Claude extension is present — otherwise it silently uses the local rule base).
- `index.html` ships SEO meta (Open Graph, Twitter card, JSON-LD `Person` schema) and an `og-image.svg`; CDN scripts are pinned to exact versions with SRI `integrity` hashes — update hashes together with the version (`scripts/build.mjs` copies static assets into `dist/`).
- `styles.css` has a `prefers-reduced-motion` block that short-circuits animations for those users.
