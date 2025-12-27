import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const RESOURCES_DIR = path.join(ROOT, "resources");

const errors = [];

function report(code, message, filePath) {
  errors.push(`ERROR ${code} ${message} (${filePath})`);
}

function failIfErrors() {
  if (errors.length === 0) {
    console.log("Validation passed.");
    return;
  }
  for (const line of errors) {
    console.error(line);
  }
  console.error(`Validation failed: ${errors.length} error(s).`);
  process.exit(1);
}

function readJson(relativePath) {
  const filePath = path.join(RESOURCES_DIR, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, data: JSON.parse(raw) };
}

function parseFrontmatter(raw) {
  const lines = raw.split(/\r?\n/);
  if (lines[0] !== "---") {
    return { frontmatter: {}, body: raw.trim() };
  }

  let i = 1;
  const fmLines = [];
  while (i < lines.length && lines[i] !== "---") {
    fmLines.push(lines[i]);
    i += 1;
  }
  const body = lines.slice(i + 1).join("\n").trim();
  const frontmatter = parseYamlSubset(fmLines);
  return { frontmatter, body };
}

function parseYamlSubset(lines) {
  const root = {};
  const stack = [{ indent: -1, value: root, type: "object" }];

  const getIndent = (line) => line.match(/^\s*/)[0].length;

  for (let idx = 0; idx < lines.length; idx += 1) {
    const line = lines[idx];
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = getIndent(line);
    const trimmed = line.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (trimmed.startsWith("- ")) {
      const itemValue = trimmed.slice(2).trim();
      if (parent.type !== "array") {
        throw new Error(`YAML parse error: array item without array parent at line ${idx + 1}`);
      }
      if (itemValue.includes(":")) {
        const [k, ...rest] = itemValue.split(":");
        const obj = { [k.trim()]: parseScalar(rest.join(":").trim()) };
        parent.value.push(obj);
        stack.push({ indent, value: obj, type: "object" });
      } else {
        parent.value.push(parseScalar(itemValue));
      }
      continue;
    }

    const [keyPart, ...rest] = trimmed.split(":");
    const key = keyPart.trim();
    const valueRaw = rest.join(":").trim();

    if (!valueRaw) {
      const nextIsArray = lines[idx + 1] && lines[idx + 1].trim().startsWith("-");
      const container = nextIsArray ? [] : {};
      parent.value[key] = container;
      stack.push({ indent, value: container, type: nextIsArray ? "array" : "object" });
    } else {
      parent.value[key] = parseScalar(valueRaw);
    }
  }

  return root;
}

function parseScalar(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^\d+$/.test(value)) return Number(value);
  if (/^".*"$/.test(value) || /^'.*'$/.test(value)) {
    return value.slice(1, -1);
  }
  return value;
}

function readMarkdownDir(relativeDir) {
  const dirPath = path.join(RESOURCES_DIR, relativeDir);
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { frontmatter } = parseFrontmatter(raw);
    return { frontmatter, filePath: path.join(dirPath, file) };
  });
}

const PLACEHOLDER_DOMAINS = [
  "example.com",
  "github.com/example",
  "demo.example",
  "localhost",
];

const REJECT_TOKENS = ["TODO", "TBD", "lorem"];

const REQUIRED_COPY_KEYS = [
  "global.details",
  "global.close",
  "global.open",
  "global.back",
  "global.external",
  "global.openMissionBrief",
  "global.openBookDetails",
  "nav.homeAria",
  "nav.contact",
  "nav.toggleThemeAria",
  "hero.architectingPrefix",
  "hero.primaryCta",
  "hero.secondaryCta",
  "hero.availabilityBadge",
  "home.impactKicker",
  "home.statusKicker",
  "status.activeLabel",
  "status.currentFocusLabel",
  "status.availabilityLabel",
  "deepDive.title",
  "deepDive.subtitle",
  "deepDive.storyButton",
  "storySheet.title",
  "storySheet.subtitle",
  "storySheet.intentTitle",
  "storySheet.outlineTitle",
  "storySheet.interactionTitle",
  "storySheet.qualityTitle",
  "storySheet.interactionA",
  "storySheet.interactionB",
  "storySheet.interactionC",
  "storySheet.primaryCta",
  "storySheet.secondaryCta",
  "tabs.about",
  "tabs.projects",
  "tabs.writing",
  "tabs.stack",
  "tabs.library",
  "tabs.thoughts",
  "about.currentFocusTitle",
  "about.systemSpecsTitle",
  "about.systemSpecsKicker",
  "about.journeyTitle",
  "about.milestonesLabel",
  "about.designStoryTitle",
  "projects.featuredTitle",
  "projects.openSourceTitle",
  "projects.professionalTitle",
  "projects.privateNote",
  "spotlight.briefTitle",
  "spotlight.problem",
  "spotlight.constraints",
  "spotlight.approach",
  "spotlight.proof",
  "spotlight.next",
  "spotlight.primaryCtaGithub",
  "spotlight.primaryCtaRequest",
  "spotlight.secondaryCtaWriting",
  "stack.title",
  "stack.subtitle",
  "stack.allDomains",
  "stack.primaryExpertise",
  "stack.strongFoundation",
  "stack.workingKnowledge",
  "stack.proofTitle",
  "stack.howToReadTitle",
  "stack.howToReadBody",
  "writing.title",
  "writing.wipBadge",
  "writing.backToWriting",
  "library.title",
  "library.detailsLabel",
  "library.emptyTitle",
  "library.emptyBody",
  "thoughts.title",
  "thoughts.emptyTitle",
  "thoughts.emptyBody",
  "contact.title",
  "contact.subtitle",
  "contact.primaryCta",
  "contact.responseLatency",
  "contact.responseNote",
  "contact.platform.github",
  "contact.platform.linkedin",
  "contact.platform.twitter",
  "contact.platform.email",
  "contact.cards.github",
  "contact.cards.linkedin",
  "contact.cards.twitter",
  "contact.cards.email",
  "resume.title",
  "resume.downloadPdf",
  "footer.separator",
  "footer.copyrightPrefix",
  "footer.center",
  "footer.right",
];

function containsPlaceholder(value) {
  if (typeof value !== "string") return false;
  return PLACEHOLDER_DOMAINS.some((token) => value.includes(token));
}

function getValue(obj, pathParts) {
  return pathParts.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function hasRejectTokens(value) {
  if (typeof value !== "string") return false;
  return REJECT_TOKENS.some((token) => value.includes(token));
}

function ensureNonEmptyString(value, fieldName, filePath) {
  if (typeof value !== "string" || value.trim().length === 0) {
    report("FIELD_REQUIRED", `${fieldName} must be a non-empty string`, filePath);
  }
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  if (!email.includes("@")) return false;
  const at = email.indexOf("@");
  return email.slice(at + 1).includes(".");
}

function isValidUrlOrMailto(value) {
  if (typeof value !== "string") return false;
  if (value.startsWith("https://")) return true;
  if (value.startsWith("mailto:")) return true;
  return false;
}

function isPlainEmail(value) {
  if (typeof value !== "string") return false;
  if (!value.includes("@")) return false;
  const at = value.indexOf("@");
  return value.slice(at + 1).includes(".");
}

function validateProfile() {
  const { filePath, data } = readJson("profile.json");

  ensureNonEmptyString(data.name, "name", filePath);
  ensureNonEmptyString(data.title, "title", filePath);
  ensureNonEmptyString(data.tagline, "tagline", filePath);
  ensureNonEmptyString(data.bio, "bio", filePath);
  ensureNonEmptyString(data.location, "location", filePath);
  ensureNonEmptyString(data.company, "company", filePath);
  ensureNonEmptyString(data.email, "email", filePath);

  if (!isValidEmail(data.email) || String(data.email).includes("example.com")) {
    report("EMAIL_INVALID", "email must be valid and not a placeholder", filePath);
  }

  if (!data.availability || typeof data.availability !== "object") {
    report("FIELD_REQUIRED", "availability must exist", filePath);
  } else {
    ensureNonEmptyString(data.availability.status, "availability.status", filePath);
    ensureNonEmptyString(data.availability.note, "availability.note", filePath);
  }

  if (data.social && typeof data.social === "object") {
    for (const [key, value] of Object.entries(data.social)) {
      if (!value) continue;
      const isEmail = key === "email" && isPlainEmail(value);
      if (!isEmail && (!isValidUrlOrMailto(value) || containsPlaceholder(value))) {
        report("SOCIAL_INVALID", `social.${key} must be https:// or mailto: and not a placeholder`, filePath);
      }
    }
  }

  if (!data.about || typeof data.about !== "object") {
    report("ABOUT_REQUIRED", "about must exist for CR-001", filePath);
    return;
  }

  const projects = readMarkdownDir("projects").map((entry) => entry.frontmatter.id).filter(Boolean);
  const writing = readMarkdownDir("writing").map((entry) => entry.frontmatter.id).filter(Boolean);
  const projectIds = new Set(projects);
  const writingIds = new Set(writing);

  const validateEvidence = (evidence, fieldPrefix) => {
    if (!evidence || typeof evidence !== "object") return;
    const projectsRef = evidence.projects ?? [];
    const writingRef = evidence.writing ?? [];
    if (!Array.isArray(projectsRef) || !Array.isArray(writingRef)) {
      report("ABOUT_EVIDENCE", `${fieldPrefix} evidence projects/writing must be arrays`, filePath);
      return;
    }
    for (const pid of projectsRef) {
      if (!projectIds.has(pid)) {
        report("ABOUT_EVIDENCE_PROJECT", `${fieldPrefix} references unknown project id ${pid}`, filePath);
      }
    }
    for (const wid of writingRef) {
      if (!writingIds.has(wid)) {
        report("ABOUT_EVIDENCE_WRITING", `${fieldPrefix} references unknown writing id ${wid}`, filePath);
      }
    }
  };

  ensureNonEmptyString(data.about.headline, "about.headline", filePath);
  ensureNonEmptyString(data.about.current_focus, "about.current_focus", filePath);

  if (!Array.isArray(data.about.lifestyle)) {
    report("ABOUT_LIFESTYLE_INVALID", "about.lifestyle must be an array", filePath);
  } else {
    if (data.about.lifestyle.length !== 4) {
      report("ABOUT_LIFESTYLE_COUNT", "about.lifestyle must have exactly 4 items", filePath);
    }
    const ids = new Set();
    for (const item of data.about.lifestyle) {
      ensureNonEmptyString(item.id, "about.lifestyle.id", filePath);
      ensureNonEmptyString(item.title, "about.lifestyle.title", filePath);
      ensureNonEmptyString(item.value, "about.lifestyle.value", filePath);
      ensureNonEmptyString(item.detail, "about.lifestyle.detail", filePath);
      ensureNonEmptyString(item.why, "about.lifestyle.why", filePath);
      if (item.id) {
        if (ids.has(item.id)) {
          report("ABOUT_LIFESTYLE_DUP", "about.lifestyle ids must be unique", filePath);
        }
        ids.add(item.id);
      }
    }
  }

  if (!Array.isArray(data.about.journey)) {
    report("ABOUT_JOURNEY_INVALID", "about.journey must be an array", filePath);
  } else {
    if (data.about.journey.length < 2) {
      report("ABOUT_JOURNEY_COUNT", "about.journey must have at least 2 items", filePath);
    }
    let activeCount = 0;
    for (const item of data.about.journey) {
      ensureNonEmptyString(item.id, "about.journey.id", filePath);
      ensureNonEmptyString(item.period, "about.journey.period", filePath);
      ensureNonEmptyString(item.role, "about.journey.role", filePath);
      ensureNonEmptyString(item.company, "about.journey.company", filePath);
      ensureNonEmptyString(item.summary, "about.journey.summary", filePath);
      if (item.evidence) {
        validateEvidence(item.evidence, `about.journey.${item.id}`);
      }
      if (item.active === true) activeCount += 1;
      if (item.highlights && !Array.isArray(item.highlights)) {
        report("ABOUT_JOURNEY_HIGHLIGHTS", "about.journey.highlights must be an array", filePath);
      }
      if (item.milestones && !Array.isArray(item.milestones)) {
        report("ABOUT_JOURNEY_MILESTONES", "about.journey.milestones must be an array", filePath);
      }
      if (Array.isArray(item.milestones)) {
        for (const milestone of item.milestones) {
          ensureNonEmptyString(milestone.date, "about.journey.milestones.date", filePath);
          ensureNonEmptyString(milestone.title, "about.journey.milestones.title", filePath);
          ensureNonEmptyString(milestone.detail, "about.journey.milestones.detail", filePath);
          if (milestone.evidence) {
            validateEvidence(milestone.evidence, `about.journey.${item.id}.milestones.${milestone.title}`);
          }
        }
      }
    }
    if (activeCount > 1) {
      report("ABOUT_JOURNEY_ACTIVE", "about.journey can have at most one active item", filePath);
    }
  }

  if (!data.about.site_story || typeof data.about.site_story !== "object") {
    report("ABOUT_SITE_STORY", "about.site_story must exist", filePath);
    return;
  }
  ensureNonEmptyString(data.about.site_story.short, "about.site_story.short", filePath);
  if (!Array.isArray(data.about.site_story.long_outline) || data.about.site_story.long_outline.length === 0) {
    report("ABOUT_SITE_STORY_OUTLINE", "about.site_story.long_outline must be a non-empty array", filePath);
  } else {
    for (const section of data.about.site_story.long_outline) {
      ensureNonEmptyString(section.title, "about.site_story.long_outline.title", filePath);
      ensureNonEmptyString(section.body, "about.site_story.long_outline.body", filePath);
    }
  }

  if (typeof data.tagline === "string" && data.tagline.length > 96) {
    report("PROFILE_TAGLINE_LEN", "profile.tagline must be <= 96 chars", filePath);
  }
  if (typeof data.bio === "string" && data.bio.length > 360) {
    report("PROFILE_BIO_LEN", "profile.bio must be <= 360 chars", filePath);
  }
}

function validateCopy() {
  const { filePath, data } = readJson("copy.json");

  for (const keyPath of REQUIRED_COPY_KEYS) {
    const value = getValue(data, keyPath.split("."));
    if (typeof value !== "string" || value.trim().length === 0) {
      report("COPY_REQUIRED", `copy.${keyPath} must be a non-empty string`, filePath);
      continue;
    }
    if (hasRejectTokens(value) || containsPlaceholder(value)) {
      report("COPY_REJECT", `copy.${keyPath} contains reject tokens or placeholders`, filePath);
    }
  }

  const qualityBullets = getValue(data, ["storySheet", "qualityBullets"]);
  if (!Array.isArray(qualityBullets)) {
    report("COPY_QUALITY_BULLETS", "copy.storySheet.qualityBullets must be an array", filePath);
  } else {
    if (qualityBullets.length < 4 || qualityBullets.length > 8) {
      report("COPY_QUALITY_BULLETS", "copy.storySheet.qualityBullets must contain 4-8 items", filePath);
    }
    qualityBullets.forEach((bullet, index) => {
      if (typeof bullet !== "string" || bullet.trim().length === 0) {
        report("COPY_QUALITY_BULLETS", `copy.storySheet.qualityBullets[${index}] must be a non-empty string`, filePath);
      }
      if (hasRejectTokens(bullet) || containsPlaceholder(bullet)) {
        report("COPY_REJECT", `copy.storySheet.qualityBullets[${index}] contains reject tokens or placeholders`, filePath);
      }
    });
  }

  const buttonKeys = [
    "hero.primaryCta",
    "hero.secondaryCta",
    "deepDive.storyButton",
    "storySheet.primaryCta",
    "storySheet.secondaryCta",
    "spotlight.primaryCtaGithub",
    "spotlight.primaryCtaRequest",
    "spotlight.secondaryCtaWriting",
    "contact.primaryCta",
    "writing.backToWriting",
    "resume.downloadPdf",
  ];
  for (const keyPath of buttonKeys) {
    const value = getValue(data, keyPath.split("."));
    if (typeof value === "string" && value.length > 24) {
      report("COPY_BUDGET", `copy.${keyPath} must be <= 24 chars`, filePath);
    }
  }

  const microKeys = [
    "global.details",
    "global.close",
    "global.open",
    "global.back",
    "global.external",
    "global.openMissionBrief",
    "global.openBookDetails",
    "about.systemSpecsKicker",
  ];
  for (const keyPath of microKeys) {
    const value = getValue(data, keyPath.split("."));
    if (typeof value === "string" && value.length > 28) {
      report("COPY_BUDGET", `copy.${keyPath} must be <= 28 chars`, filePath);
    }
  }

  const tabKeys = [
    "tabs.about",
    "tabs.projects",
    "tabs.writing",
    "tabs.stack",
    "tabs.library",
    "tabs.thoughts",
  ];
  for (const keyPath of tabKeys) {
    const value = getValue(data, keyPath.split("."));
    if (typeof value === "string" && value.length > 10) {
      report("COPY_BUDGET", `copy.${keyPath} must be <= 10 chars`, filePath);
    }
  }

  const subtitleKeys = ["deepDive.subtitle", "library.emptyBody", "thoughts.emptyBody", "contact.subtitle"];
  for (const keyPath of subtitleKeys) {
    const value = getValue(data, keyPath.split("."));
    if (typeof value === "string" && value.length > 110) {
      report("COPY_BUDGET", `copy.${keyPath} must be <= 110 chars`, filePath);
    }
  }
  const deepDiveSubtitle = getValue(data, ["deepDive", "subtitle"]);
  if (typeof deepDiveSubtitle === "string" && deepDiveSubtitle.length > 96) {
    report("COPY_BUDGET", "copy.deepDive.subtitle must be <= 96 chars", filePath);
  }
}

function validateNav() {
  const { filePath, data } = readJson("nav.json");
  if (!Array.isArray(data.primary) || data.primary.length !== 2) {
    report("NAV_INVALID", "nav.primary must contain exactly 2 items (home, contact)", filePath);
    return;
  }
  const expected = [
    { id: "home", href: "/", type: "route" },
    { id: "contact", href: "/#contact", type: "scroll" },
  ];
  for (const exp of expected) {
    const match = data.primary.find((item) => item.id === exp.id);
    if (!match) {
      report("NAV_INVALID", `nav.primary missing ${exp.id}`, filePath);
      continue;
    }
    if (match.href !== exp.href || match.type !== exp.type) {
      report("NAV_INVALID", `nav.${exp.id} must be href=${exp.href} type=${exp.type}`, filePath);
    }
  }
  for (const item of data.primary) {
    if (item.id !== "home" && item.id !== "contact") {
      report("NAV_INVALID", `nav.primary contains unsupported item ${item.id}`, filePath);
    }
  }
}

function validateProjects() {
  const entries = readMarkdownDir("projects");
  const writingIds = new Set(readMarkdownDir("writing").map((entry) => entry.frontmatter.id).filter(Boolean));
  const spotlightEntries = [];

  for (const { frontmatter, filePath } of entries) {
    const requiredKeys = [
      "id",
      "name",
      "period",
      "status",
      "open_source",
      "link_status",
      "summary",
      "link",
    ];
    for (const key of requiredKeys) {
      if (!(key in frontmatter)) {
        report("PROJECT_REQUIRED", `missing frontmatter key: ${key}`, filePath);
      }
    }
    if (!frontmatter.link || !frontmatter.link.primary) {
      report("PROJECT_REQUIRED", "missing link.primary in frontmatter", filePath);
    } else {
      if (!frontmatter.link.primary.type || !frontmatter.link.primary.url) {
        report("PROJECT_REQUIRED", "link.primary must have type and url", filePath);
      }
    }
    const allStrings = JSON.stringify(frontmatter);
    if (containsPlaceholder(allStrings)) {
      report("PROJECT_PLACEHOLDER", "placeholder domain detected in frontmatter", filePath);
    }

    const spotlight = frontmatter.spotlight;
    if (spotlight !== undefined) {
      const isPrimary = spotlight === "primary" || spotlight === true;
      const isSecondary = spotlight === "secondary";
      if (!isPrimary && !isSecondary) {
        report("PROJECT_SPOTLIGHT", "spotlight must be primary|secondary|true", filePath);
      } else {
        spotlightEntries.push({
          filePath,
          id: frontmatter.id,
          isPrimary,
          isSecondary,
          order: frontmatter.spotlight_order,
          brief: frontmatter.brief,
        });
      }
    }

    if (frontmatter.open_source === true) {
      const linkType = frontmatter.link?.primary?.type;
      const linkUrl = frontmatter.link?.primary?.url;
      if (linkType === "github" && typeof linkUrl === "string" && linkUrl.startsWith("https://github.com/")) {
        continue;
      }
      const pending = frontmatter.link_status === "pending";
      const isResume = linkType === "resume" && linkUrl === "/resume";
      const hasPrivacyNote = typeof frontmatter.privacy_note === "string" && frontmatter.privacy_note.trim().length > 0;
      if (!(pending && isResume && hasPrivacyNote)) {
        report(
          "PROJECT_OPEN_SOURCE",
          "open_source projects must have github link or pending+resume+privacy_note",
          filePath
        );
      }
    }
  }

  if (spotlightEntries.length > 3) {
    report("PROJECT_SPOTLIGHT_CAP", "total spotlight projects must be <= 3", "resources/projects");
  }
  const primaryCount = spotlightEntries.filter((entry) => entry.isPrimary).length;
  const secondaryCount = spotlightEntries.filter((entry) => entry.isSecondary).length;
  if (primaryCount > 1) {
    report("PROJECT_SPOTLIGHT_PRIMARY", "at most one spotlight primary is allowed", "resources/projects");
  }
  if (secondaryCount > 0 && primaryCount === 0) {
    report("PROJECT_SPOTLIGHT_PRIMARY", "secondary spotlights require a primary spotlight", "resources/projects");
  }
  if (spotlightEntries.length > 0) {
    const needsOrder = spotlightEntries.length > 1;
    const orders = spotlightEntries.map((entry) => entry.order).filter((value) => value !== undefined);
    if (needsOrder) {
      if (orders.length !== spotlightEntries.length) {
        report("PROJECT_SPOTLIGHT_ORDER", "spotlight_order is required for all spotlights when multiple exist", "resources/projects");
      } else {
        const orderNumbers = orders.map((value) => Number(value));
        const unique = new Set(orderNumbers);
        const max = Math.max(...orderNumbers);
        if (unique.size !== orderNumbers.length || max !== orderNumbers.length || Math.min(...orderNumbers) !== 1) {
          report("PROJECT_SPOTLIGHT_ORDER", "spotlight_order must be unique and consecutive starting at 1", "resources/projects");
        }
      }
    }
    for (const entry of spotlightEntries) {
      const brief = entry.brief;
      if (!brief || typeof brief !== "object") {
        report("PROJECT_SPOTLIGHT_BRIEF", "spotlight projects must include brief object", entry.filePath);
        continue;
      }
      ensureNonEmptyString(brief.thesis, "brief.thesis", entry.filePath);
      ensureNonEmptyString(brief.problem, "brief.problem", entry.filePath);
      if (!Array.isArray(brief.approach) || brief.approach.length === 0) {
        report("PROJECT_SPOTLIGHT_BRIEF", "brief.approach must be a non-empty array", entry.filePath);
      }
      if (!Array.isArray(brief.proof) || brief.proof.length === 0) {
        report("PROJECT_SPOTLIGHT_BRIEF", "brief.proof must be a non-empty array", entry.filePath);
      }
      ensureNonEmptyString(brief.next, "brief.next", entry.filePath);
      if (brief.writing_id) {
        if (!writingIds.has(brief.writing_id)) {
          report("PROJECT_SPOTLIGHT_WRITING", `brief.writing_id references unknown writing id ${brief.writing_id}`, entry.filePath);
        }
      }
    }
  }
}

function validateWriting() {
  const entries = readMarkdownDir("writing");
  for (const { frontmatter, filePath } of entries) {
    const requiredKeys = ["id", "title", "date", "read_time", "summary"];
    for (const key of requiredKeys) {
      if (!(key in frontmatter)) {
        report("WRITING_REQUIRED", `missing frontmatter key: ${key}`, filePath);
      }
    }
    if (frontmatter.status && frontmatter.status !== "draft" && frontmatter.status !== "published") {
      report("WRITING_STATUS", "status must be draft or published", filePath);
    }
    const allStrings = JSON.stringify(frontmatter);
    if (containsPlaceholder(allStrings)) {
      report("WRITING_PLACEHOLDER", "placeholder domain detected in frontmatter", filePath);
    }
  }
}

function validateStack() {
  const { filePath, data } = readJson("stack.json");
  const projects = readMarkdownDir("projects").map((entry) => entry.frontmatter.id).filter(Boolean);
  const writing = readMarkdownDir("writing").map((entry) => entry.frontmatter.id).filter(Boolean);
  const projectIds = new Set(projects);
  const writingIds = new Set(writing);

  if (!Array.isArray(data.domains) || data.domains.length === 0) {
    report("STACK_DOMAINS", "stack.domains must be a non-empty array", filePath);
  } else {
    const domainIds = new Set();
    for (const domain of data.domains) {
      ensureNonEmptyString(domain.id, "stack.domains.id", filePath);
      ensureNonEmptyString(domain.label, "stack.domains.label", filePath);
      ensureNonEmptyString(domain.summary, "stack.domains.summary", filePath);
      if (typeof domain.x !== "number" || typeof domain.y !== "number") {
        report("STACK_DOMAINS_COORD", "stack.domains x/y must be numbers", filePath);
      }
      if (!domain.proof || typeof domain.proof !== "object") {
        report("STACK_DOMAIN_PROOF", "stack.domains.proof must exist", filePath);
      } else {
        const proofProjects = domain.proof.projects ?? [];
        const proofWriting = domain.proof.writing ?? [];
        if (!Array.isArray(proofProjects) || !Array.isArray(proofWriting)) {
          report("STACK_DOMAIN_PROOF", "stack.domains.proof.projects and .writing must be arrays", filePath);
        } else {
          for (const pid of proofProjects) {
            if (!projectIds.has(pid)) {
              report("STACK_DOMAIN_PROOF_PROJECT", `unknown project id in domain proof: ${pid}`, filePath);
            }
          }
          for (const wid of proofWriting) {
            if (!writingIds.has(wid)) {
              report("STACK_DOMAIN_PROOF_WRITING", `unknown writing id in domain proof: ${wid}`, filePath);
            }
          }
        }
      }
      if (domain.id) {
        if (domainIds.has(domain.id)) {
          report("STACK_DOMAINS_DUP", "stack.domains ids must be unique", filePath);
        }
        domainIds.add(domain.id);
      }
    }
  }

  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    report("STACK_CATEGORIES", "stack.categories must be a non-empty array", filePath);
    return;
  }

  const allowedLevels = new Set(["expert", "strong", "working"]);
  const seenSkillIds = new Set();
  const domainIds = new Set((data.domains ?? []).map((d) => d.id));

  for (const category of data.categories) {
    ensureNonEmptyString(category.name, "stack.categories.name", filePath);
    if (!Array.isArray(category.items)) {
      report("STACK_ITEMS", "stack.categories.items must be an array", filePath);
      continue;
    }
    for (const item of category.items) {
      ensureNonEmptyString(item.id, "stack.items.id", filePath);
      ensureNonEmptyString(item.name, "stack.items.name", filePath);
      if (!allowedLevels.has(item.level)) {
        report("STACK_LEVEL", "stack.items.level must be expert|strong|working", filePath);
      }
      if (!Array.isArray(item.domains) || item.domains.length === 0) {
        report("STACK_DOMAINS_REF", "stack.items.domains must be a non-empty array", filePath);
      } else {
        for (const dom of item.domains) {
          if (!domainIds.has(dom)) {
            report("STACK_DOMAIN_INVALID", `stack.items.domains references unknown domain ${dom}`, filePath);
          }
        }
      }
      if (item.id) {
        if (seenSkillIds.has(item.id)) {
          report("STACK_ITEM_DUP", "stack.items ids must be unique across categories", filePath);
        }
        seenSkillIds.add(item.id);
      }

      if (item.evidence) {
        const projectsRef = item.evidence.projects ?? [];
        const writingRef = item.evidence.writing ?? [];
        if (!Array.isArray(projectsRef) || !Array.isArray(writingRef)) {
          report("STACK_EVIDENCE", "stack.items.evidence projects/writing must be arrays", filePath);
        } else {
          for (const pid of projectsRef) {
            if (!projectIds.has(pid)) {
              report("STACK_EVIDENCE_PROJECT", `unknown project id in evidence: ${pid}`, filePath);
            }
          }
          for (const wid of writingRef) {
            if (!writingIds.has(wid)) {
              report("STACK_EVIDENCE_WRITING", `unknown writing id in evidence: ${wid}`, filePath);
            }
          }
        }
      }
    }
  }
}

function main() {
  validateProfile();
  validateCopy();
  validateNav();
  validateProjects();
  validateWriting();
  validateStack();
  failIfErrors();
}

try {
  main();
} catch (err) {
  console.error(`ERROR VALIDATION_FAILED ${err.message} (${ROOT})`);
  process.exit(1);
}
