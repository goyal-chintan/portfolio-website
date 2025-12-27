import { chromium, devices } from "playwright";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ffmpegPath from "ffmpeg-static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const RUN_DIR = path.join(__dirname, "../docs/screenshots/runs", runId());
const CANON_DIR = path.resolve(process.env.OUT_DIR ?? path.join(__dirname, "../docs/screenshots"));
const DRAFT_SLUG = process.env.DRAFT_SLUG ?? "multicloud-architecture";

function runId() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyToCanonical(srcPath, fileName) {
  ensureDir(CANON_DIR);
  fs.copyFileSync(srcPath, path.join(CANON_DIR, fileName));
}

function logStep(name) {
  console.log(`  ✅ ${name}`);
}

function runFfmpeg(args) {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static not installed");
  }
  const result = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed with exit code ${result.status}`);
  }
}

function convertWebmToMp4(webmPath, mp4Path) {
  ensureDir(path.dirname(mp4Path));
  runFfmpeg(["-y", "-i", webmPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4Path]);
}

async function ensureTheme(page, mode) {
  const wantDark = mode === "dark";
  await page.waitForTimeout(1200);
  await page.waitForSelector('[aria-label="Toggle theme"]', { state: "visible", timeout: 60000 });
  await page.evaluate((dark) => {
    const html = document.documentElement;
    html.classList.remove(dark ? "light" : "dark");
    html.classList.add(dark ? "dark" : "light");
    html.style.colorScheme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      //
    }
  }, wantDark);
  await page.waitForTimeout(400);
}

async function gotoHome(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
}

async function openHash(page, hash) {
  await page.goto(`${BASE_URL}/${hash}`, { waitUntil: "domcontentloaded" });
  await page.locator("#deep-dive").waitFor({ state: "visible" });
  await page.waitForTimeout(400);
}

async function recordClip(browser, name, runFn, options = {}) {
  const clipDir = path.join(RUN_DIR, "_clips");
  ensureDir(clipDir);
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: clipDir, size: { width: 1440, height: 900 } },
    ...options,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  const started = Date.now();
  await runFn(page);
  const duration = Date.now() - started;

  const video = page.video();
  await context.close();
  const rawPath = video ? await video.path() : null;
  if (!rawPath) {
    throw new Error(`No video captured for ${name}`);
  }
  const webmPath = path.join(RUN_DIR, `${name}.webm`);
  fs.renameSync(rawPath, webmPath);
  const mp4Path = path.join(RUN_DIR, `${name}.mp4`);
  convertWebmToMp4(webmPath, mp4Path);
  copyToCanonical(mp4Path, `${name}.mp4`);
  logStep(`${name}.mp4`);
  return { mp4Path, durationMs: duration };
}

async function captureDesktopDark(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  await gotoHome(page);
  await ensureTheme(page, "dark");
  const heroPath = path.join(RUN_DIR, "desktop-hero-dark.png");
  await page.screenshot({ path: heroPath, fullPage: false });
  copyToCanonical(heroPath, "desktop-hero-dark.png");
  logStep("desktop-hero-dark.png");

  await page.getByRole("button", { name: "View My Work" }).click();
  await page.locator("#deep-dive").waitFor({ state: "visible" });
  await page.waitForTimeout(900);
  const scrolledPath = path.join(RUN_DIR, "desktop-scrolled-dark-deep-dive.png");
  await page.screenshot({ path: scrolledPath, fullPage: false });
  copyToCanonical(scrolledPath, "desktop-scrolled-dark-deep-dive.png");
  logStep("desktop-scrolled-dark-deep-dive.png");

  await openHash(page, "#about");
  const journeyHeader = page.locator('h4:has-text("Journey")');
  if ((await journeyHeader.count()) > 0) {
    await journeyHeader.first().scrollIntoViewIfNeeded();
  } else {
    await page.evaluate(() => window.scrollBy(0, 800));
  }
  await page.waitForTimeout(250);
  const journeyPath = path.join(RUN_DIR, "desktop-journey-milestones.png");
  await page.screenshot({ path: journeyPath, fullPage: false });
  copyToCanonical(journeyPath, "desktop-journey-milestones.png");
  logStep("desktop-journey-milestones.png");

  await openHash(page, "#stack");
  const stackFocus = page.locator('h4:has-text("Primary Expertise")').first();
  if ((await stackFocus.count()) > 0) {
    await stackFocus.scrollIntoViewIfNeeded();
  } else {
    await page.evaluate(() => window.scrollBy(0, 420));
  }
  await page.waitForTimeout(250);
  const stackPath = path.join(RUN_DIR, "desktop-stack-overview.png");
  await page.screenshot({ path: stackPath, fullPage: false });
  copyToCanonical(stackPath, "desktop-stack-overview.png");
  logStep("desktop-stack-overview.png");

  const hoverShots = [];
  await gotoHome(page);
  await ensureTheme(page, "dark");

  const cta = page.getByRole("button", { name: "View My Work" });
  await cta.hover();
  await page.waitForTimeout(200);
  const ctaHover = path.join(RUN_DIR, "hover-cta.png");
  await page.screenshot({ path: ctaHover, fullPage: false });
  hoverShots.push(ctaHover);

  const resumeLink = page.getByRole("link", { name: "View Resume" });
  if ((await resumeLink.count()) > 0) {
    await resumeLink.first().hover();
    await page.waitForTimeout(200);
    const resumeHover = path.join(RUN_DIR, "hover-resume.png");
    await page.screenshot({ path: resumeHover, fullPage: false });
    hoverShots.push(resumeHover);
  } else {
    hoverShots.push(ctaHover);
  }

  const social = page.locator('a[aria-label="github"], a[aria-label="linkedin"], a[aria-label="twitter"], a[aria-label="email"]').first();
  if ((await social.count()) > 0) {
    await social.hover();
    await page.waitForTimeout(200);
    const socialHover = path.join(RUN_DIR, "hover-social.png");
    await page.screenshot({ path: socialHover, fullPage: false });
    hoverShots.push(socialHover);
  } else {
    hoverShots.push(ctaHover);
  }

  await openHash(page, "#projects");
  const tab = page.getByRole("tab", { name: "Writing" }).or(page.getByRole("button", { name: "Writing" }));
  if ((await tab.count()) > 0) {
    await tab.first().hover();
    await page.waitForTimeout(200);
    const tabHover = path.join(RUN_DIR, "hover-tab.png");
    await page.screenshot({ path: tabHover, fullPage: false });
    hoverShots.push(tabHover);
  }

  const projectCard = page.locator("#deep-dive .card-glass").first();
  if ((await projectCard.count()) > 0) {
    await projectCard.hover();
    await page.waitForTimeout(200);
    const cardHover = path.join(RUN_DIR, "hover-card.png");
    await page.screenshot({ path: cardHover, fullPage: false });
    hoverShots.push(cardHover);
  }

  await openHash(page, "#writing");
  const writingCard = page.locator("#deep-dive a[href^='/writing/']").first();
  if ((await writingCard.count()) > 0) {
    await writingCard.hover();
    await page.waitForTimeout(200);
    const writingHover = path.join(RUN_DIR, "hover-writing.png");
    await page.screenshot({ path: writingHover, fullPage: false });
    hoverShots.push(writingHover);
  }

  await buildHoverComposite(browser, hoverShots, path.join(RUN_DIR, "desktop-hover-states.png"));
  ensureDir(CANON_DIR);
  copyToCanonical(path.join(RUN_DIR, "desktop-hover-states.png"), "desktop-hover-states.png");
  logStep("desktop-hover-states.png");

  await context.close();
}

async function buildHoverComposite(browser, inputs, outputPath) {
  const normalizedInputs = inputs.length >= 6 ? inputs.slice(0, 6) : [...inputs];
  while (normalizedInputs.length < 6 && normalizedInputs.length > 0) {
    normalizedInputs.push(normalizedInputs[normalizedInputs.length - 1]);
  }
  const inlineData = normalizedInputs.map((file) => {
    const raw = fs.readFileSync(file);
    return `data:image/png;base64,${raw.toString("base64")}`;
  });
  const labels = normalizedInputs.map((file) => path.basename(file).replace(/\.(png|jpg|jpeg)$/i, ""));
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  :root{color-scheme:dark}
  body{margin:0;background:#020204;color:#e5e7eb;font-family:system-ui;padding:24px;box-sizing:border-box;height:100vh;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:16px}
  figure{margin:0;position:relative;height:100%}
  img{width:100%;height:100%;object-fit:cover;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.10)}
  figcaption{position:absolute;left:14px;bottom:14px;padding:6px 10px;border-radius:999px;background:rgba(2,2,4,.65);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.10);font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600}
  </style></head><body>${inlineData
    .map((src, idx) => `<figure><img src="${src}" /><figcaption>${labels[idx]}</figcaption></figure>`)
    .join("")}</body></html>`;
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: outputPath, fullPage: false });
  await context.close();
}

async function captureDesktopLight(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  await gotoHome(page);
  await ensureTheme(page, "light");
  const heroLight = path.join(RUN_DIR, "desktop-hero-light.png");
  await page.screenshot({ path: heroLight, fullPage: false });
  copyToCanonical(heroLight, "desktop-hero-light.png");
  logStep("desktop-hero-light.png");

  await context.close();
}

async function captureAboutSpecsClip(browser) {
  await recordClip(browser, "desktop-about-specs-expand", async (page) => {
    await openHash(page, "#about");
    const systemSpecs = page.locator("text=System Specs");
    if ((await systemSpecs.count()) > 0) {
      await systemSpecs.first().scrollIntoViewIfNeeded();
    } else {
      await page.evaluate(() => window.scrollBy(0, 800));
    }
    await page.waitForTimeout(250);
    const specsCard = page.locator("[tabindex='0']").filter({ hasText: /Details|Close/ }).first();
    if ((await specsCard.count()) > 0) {
      await specsCard.click();
      await page.waitForTimeout(550);
      await specsCard.click();
      await page.waitForTimeout(500);
      await specsCard.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(600);
    }
    const storyButton = page.getByRole("button", { name: /About this portfolio/i });
    if ((await storyButton.count()) > 0) {
      await storyButton.click();
      await page.waitForTimeout(400);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
    }
    const journeyCard = page.locator('[role="button"]').filter({ hasText: /Senior|Data|Chief/i }).first();
    if ((await journeyCard.count()) > 0) {
      await journeyCard.click();
      await page.waitForTimeout(600);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
    }
  });
}

async function captureStackDomainClip(browser) {
  await recordClip(browser, "desktop-stack-domain-filter", async (page) => {
    await openHash(page, "#stack");
    await page.waitForTimeout(300);
    const domainButtons = page.locator('#deep-dive button').filter({ hasText: /[A-Za-z]/ });
    if ((await domainButtons.count()) > 1) {
      await domainButtons.nth(1).click();
      await page.waitForTimeout(700);
      await domainButtons.nth(1).click();
      await page.waitForTimeout(400);
    }
  });
}

async function captureThemeToggleClip(browser) {
  await recordClip(browser, "desktop-theme-toggle", async (page) => {
    await gotoHome(page);
    await ensureTheme(page, "dark");
    await page.getByRole("button", { name: "Toggle theme" }).click();
    try {
      await page.waitForFunction(() => !document.documentElement.classList.contains("dark"), { timeout: 15000 });
    } catch {
      logStep("theme toggle (light) timed out");
    }
    await page.waitForTimeout(600);
    await page.getByRole("button", { name: "Toggle theme" }).click();
    try {
      await page.waitForFunction(() => document.documentElement.classList.contains("dark"), { timeout: 15000 });
    } catch {
      logStep("theme toggle (dark) timed out");
    }
    await page.waitForTimeout(400);
  });
}

async function captureReducedMotionClip(browser) {
  await recordClip(
    browser,
    "desktop-reduced-motion",
    async (page) => {
      await gotoHome(page);
      await ensureTheme(page, "dark");
      await page.waitForTimeout(2500);
    },
    { reducedMotion: "reduce" }
  );
}

async function captureMobileShots(browser) {
  const phone = devices["iPhone 12"] ?? { viewport: { width: 390, height: 844 } };
  const context = await browser.newContext({ viewport: phone.viewport, userAgent: phone.userAgent });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  await gotoHome(page);
  await ensureTheme(page, "dark");
  const mobileHeroDark = path.join(RUN_DIR, "mobile-hero-dark.png");
  await page.screenshot({ path: mobileHeroDark, fullPage: false });
  copyToCanonical(mobileHeroDark, "mobile-hero-dark.png");
  logStep("mobile-hero-dark.png");

  await ensureTheme(page, "light");
  const mobileHeroLight = path.join(RUN_DIR, "mobile-hero-light.png");
  await page.screenshot({ path: mobileHeroLight, fullPage: false });
  copyToCanonical(mobileHeroLight, "mobile-hero-light.png");
  logStep("mobile-hero-light.png");

  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  const mobileScrolled = path.join(RUN_DIR, "mobile-scrolled-deep-dive.png");
  await page.screenshot({ path: mobileScrolled, fullPage: false });
  copyToCanonical(mobileScrolled, "mobile-scrolled-deep-dive.png");
  logStep("mobile-scrolled-deep-dive.png");

  await context.close();

  await recordClip(
    browser,
    "mobile-hash-navigation",
    async (page) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => document.documentElement.classList.add("dark"));
      await openHash(page, "#projects");
      await clickTab(page, "Writing");
      await clickTab(page, "Stack");
      await page.goBack().catch(() => {});
      await page.waitForTimeout(400);
      await page.goForward().catch(() => {});
      await page.waitForTimeout(400);
    },
    { viewport: { width: 390, height: 844 } }
  );
}

async function clickTab(page, label) {
  const trigger = page.getByRole("tab", { name: label }).or(page.getByRole("button", { name: label }));
  if ((await trigger.count()) === 0) return;
  await trigger.first().click();
  await page.waitForTimeout(400);
}

async function captureWritingShots(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  await page.goto(`${BASE_URL}/writing/${DRAFT_SLUG}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  const draftPath = path.join(RUN_DIR, "writing-draft-overview.png");
  await page.screenshot({ path: draftPath, fullPage: false });
  copyToCanonical(draftPath, "writing-draft-overview.png");
  logStep("writing-draft-overview.png");
  await context.close();

  await recordClip(browser, "writing-back-navigation", async (page) => {
    await page.goto(`${BASE_URL}/writing/${DRAFT_SLUG}`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    const backLink = page.getByRole("link", { name: /Back to Writing|Back/ }).first();
    if ((await backLink.count()) > 0) {
      await backLink.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
    }
  });
}

async function captureLinkAudit(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  const responses = [];
  page.on("response", (response) => {
    responses.push({ url: response.url(), status: response.status() });
  });

  await gotoHome(page);
  await page.waitForTimeout(500);
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href") || "")
      .filter(Boolean)
  );
  const placeholderLinks = hrefs.filter((href) => {
    const normalized = href.trim().toLowerCase();
    return (
      normalized === "#" ||
      normalized === "javascript:void(0)" ||
      normalized.startsWith("javascript:") ||
      normalized.includes("undefined") ||
      normalized.includes("todo")
    );
  });
  const bodyText = await page.evaluate(() => document.body?.innerText ?? "");
  const placeholderTextHits = [
    { token: "javascript:void", hits: (bodyText.match(/javascript:void/gi) ?? []).length },
    { token: "undefined", hits: (bodyText.match(/\bundefined\b/gi) ?? []).length },
    { token: "TODO", hits: (bodyText.match(/\bTODO\b/g) ?? []).length },
  ];
  const bad = responses.filter((r) => r.status >= 400);
  const summary = `Base URL: ${BASE_URL}\nTotal requests: ${responses.length}\nOK (<400): ${responses.filter((r) => r.status < 400).length}\nFailures (>=400): ${bad.length}`;
  const auditPath = path.join(RUN_DIR, "network-audit-200s.png");
  const auditHtml = `<!doctype html><html><head><meta charset="utf-8"><style>body{background:#0b0b10;color:#f9fafb;font-family:system-ui;padding:32px}pre{background:#111827;padding:20px;border-radius:16px;white-space:pre-wrap;font-size:14px}</style></head><body><h1>Network audit</h1><pre>${summary}${bad.length ? `\n\nErrors:\n${bad.map((r) => `${r.status} ${r.url}`).join("\n")}` : ""}</pre></body></html>`;
  await page.setContent(auditHtml, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: auditPath, fullPage: false });
  copyToCanonical(auditPath, "network-audit-200s.png");
  logStep("network-audit-200s.png");

  const placeholderText = `Placeholder audit\n- total requests: ${responses.length}\n- href count: ${hrefs.length}\n- suspicious hrefs: ${placeholderLinks.length}\n${placeholderLinks.length ? placeholderLinks.join("\n") : "No obvious placeholder hrefs found."}\n\nText scan (best-effort)\n${placeholderTextHits.map((h) => `- ${h.token}: ${h.hits}`).join("\n")}`;
  const placeholderPath = path.join(RUN_DIR, "placeholder-audit.txt");
  fs.writeFileSync(placeholderPath, placeholderText, "utf8");
  copyToCanonical(placeholderPath, "placeholder-audit.txt");
  logStep("placeholder-audit.txt");

  await context.close();
}

(async () => {
  ensureDir(RUN_DIR);
  ensureDir(CANON_DIR);
  const browser = await chromium.launch({ headless: true });
  console.log("🎬 Evidence capture starting");
  console.log(`- BASE_URL: ${BASE_URL}`);
  console.log(`- RUN_DIR: ${RUN_DIR}`);
  console.log(`- CANON_DIR: ${CANON_DIR}`);
  try {
    await captureDesktopDark(browser);
    await captureDesktopLight(browser);
    await captureAboutSpecsClip(browser);
    await captureStackDomainClip(browser);
    await captureThemeToggleClip(browser);
    await captureReducedMotionClip(browser);
    await captureMobileShots(browser);
    await captureWritingShots(browser);
    await captureLinkAudit(browser);
  } finally {
    await browser.close();
  }
  console.log("✅ Evidence capture finished");
})();
