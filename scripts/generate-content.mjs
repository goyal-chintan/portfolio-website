import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const RESOURCES_DIR = path.join(ROOT, "resources");
const OUTPUT_PATH = path.join(ROOT, "src", "config", "content.generated.ts");

function readJson(relativePath) {
  const filePath = path.join(RESOURCES_DIR, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
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
    const { frontmatter, body } = parseFrontmatter(raw);
    return {
      ...frontmatter,
      body,
      file,
    };
  });
}

function ensureOutputDir() {
  const dir = path.dirname(OUTPUT_PATH);
  fs.mkdirSync(dir, { recursive: true });
}

function writeOutput(data) {
  const content = `/* Auto-generated from /resources. Do not edit manually. */\n\nexport const content = ${JSON.stringify(data, null, 2)} as const;\n`;
  fs.writeFileSync(OUTPUT_PATH, content, "utf8");
}

function main() {
  const profile = readJson("profile.json");
  const nav = readJson("nav.json");
  const resume = readJson("resume.json");
  const stack = readJson("stack.json");
  const library = readJson("library.json");
  const thoughts = readJson("thoughts.json");
  const projects = readMarkdownDir("projects");
  const writing = readMarkdownDir("writing");

  writeOutput({ profile, nav, resume, stack, library, thoughts, projects, writing });
  console.log(`Generated ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main();
