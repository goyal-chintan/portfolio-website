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

function containsPlaceholder(value) {
  if (typeof value !== "string") return false;
  return PLACEHOLDER_DOMAINS.some((token) => value.includes(token));
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
      ensureNonEmptyString(item.period, "about.journey.period", filePath);
      ensureNonEmptyString(item.role, "about.journey.role", filePath);
      ensureNonEmptyString(item.company, "about.journey.company", filePath);
      if (item.active === true) activeCount += 1;
    }
    if (activeCount > 1) {
      report("ABOUT_JOURNEY_ACTIVE", "about.journey can have at most one active item", filePath);
    }
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

function main() {
  validateProfile();
  validateNav();
  validateProjects();
  validateWriting();
  failIfErrors();
}

try {
  main();
} catch (err) {
  console.error(`ERROR VALIDATION_FAILED ${err.message} (${ROOT})`);
  process.exit(1);
}
