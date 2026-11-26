/* ============================================================
   Portfolio OS — Production build (esbuild)
   Transpiles + minifies each classic script into dist/ (same
   load order), copies static assets, and produces dist/index.html
   that no longer needs Babel Standalone or Framer Motion at runtime.

   Usage:
     node scripts/build.mjs          # build to dist/
     node scripts/build.mjs --check  # compile-check only, no output
   ============================================================ */
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");
const DIST = join(ROOT, "dist");

const FILES = [
  "ui.js",
  "data.js",
  "i18n.js",
  "modules-core.js",
  "modules-clinical.js",
  "modules-work.js",
  "modules-skills.js",
  "modules-ai.js",
  "shell.js",
  "app.js",
];

const STATIC = [
  "tokens.css",
  "styles.css",
  "modules.css",
  "glass.css",
  "og-image.svg",
  "26 TENCVEN.pdf",
];

for (const f of FILES) {
  await build({
    entryPoints: [join(ROOT, f)],
    outfile: join(DIST, f.replace(/\.js$/, ".min.js")),
    bundle: false,
    write: !CHECK,
    loader: { ".js": "jsx" },
    jsx: "transform",
    minify: !CHECK,
    legalComments: "none",
    logLevel: "warning",
  });
}

if (CHECK) {
  console.log("check: all", FILES.length, "files compile to JavaScript without errors");
  process.exit(0);
}

mkdirSync(DIST, { recursive: true });
for (const a of STATIC) cpSync(join(ROOT, a), join(DIST, a));

// Build dist/index.html: keep the head (SEO, JSON-LD), swap the
// Babel-in-browser script tags for the precompiled minified ones,
// and drop the Babel Standalone compile-time dependency.
let html = readFileSync(join(ROOT, "index.html"), "utf8");
for (const f of FILES) {
  const base = f.replace(/\.js$/, "");
  const re = new RegExp('<script type="text/babel" data-presets="react" src="\\./' + base + '\\.js"></script>');
  html = html.replace(re, '<script src="./' + base + '.min.js"></script>');
}
html = html.replace(
  /<script crossorigin integrity="[^"]*" src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*" onerror="[^"]*"><\/script>\s*/,
  ""
);
writeFileSync(join(DIST, "index.html"), html);

console.log("build: wrote dist/ (" + FILES.length + " scripts, " + STATIC.length + " assets, index.html)");
