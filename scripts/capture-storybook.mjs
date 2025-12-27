import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? "http://localhost:6006";
const INDEX_PATH = path.resolve(process.env.INDEX_PATH ?? path.join(__dirname, "../storybook-static/index.json"));
const OUT_DIR = path.resolve(process.env.OUT_DIR ?? path.join(__dirname, "../docs/screenshots/storybook"));
const VIEWPORT_WIDTH = Number.parseInt(process.env.VIEWPORT_WIDTH ?? "1440", 10);
const VIEWPORT_HEIGHT = Number.parseInt(process.env.VIEWPORT_HEIGHT ?? "900", 10);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function loadStoryIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error(
      `Storybook index not found at ${INDEX_PATH}. Run "npm run build-storybook" first.`
    );
  }
  const raw = fs.readFileSync(INDEX_PATH, "utf8");
  const parsed = JSON.parse(raw);
  const entries = parsed.entries ?? {};
  return Object.values(entries).filter((entry) => entry?.type === "story");
}

function safeFileName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildFileName(entry, theme) {
  const title = typeof entry.title === "string" ? entry.title : "story";
  const name = typeof entry.name === "string" ? entry.name : entry.id;
  const base = `${safeFileName(title)}__${safeFileName(name)}`;
  return `${base}--${theme}.png`;
}

async function capture() {
  ensureDir(OUT_DIR);
  const stories = loadStoryIndex();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(45000);

  const manifest = {
    storybookUrl: STORYBOOK_URL,
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    capturedAt: new Date().toISOString(),
    files: [],
  };

  for (const entry of stories) {
    for (const theme of ["dark", "light"]) {
      const url = `${STORYBOOK_URL}/iframe.html?id=${entry.id}&viewMode=story&globals=theme:${theme}`;
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);

      const fileName = buildFileName(entry, theme);
      const outPath = path.join(OUT_DIR, fileName);
      await page.screenshot({ path: outPath, fullPage: true });

      manifest.files.push({
        id: entry.id,
        title: entry.title,
        name: entry.name,
        theme,
        file: fileName,
      });

      console.log(`✅ ${fileName}`);
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`📦 Wrote manifest: ${path.join(OUT_DIR, "manifest.json")}`);

  await context.close();
  await browser.close();
}

capture().catch((error) => {
  console.error("Storybook capture failed.");
  console.error(error);
  process.exitCode = 1;
});

