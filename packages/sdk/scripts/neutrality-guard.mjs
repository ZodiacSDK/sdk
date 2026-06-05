import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = resolve(packageRoot, "../..");
const scriptPath = relative(repoRoot, fileURLToPath(import.meta.url));
const skippedDirectories = new Set([".git", ".next", "coverage", "dist", "node_modules", ".turbo"]);
const skippedFiles = new Set([scriptPath]);
const blockedTerms = [
  ["Zu", "na"].join(""),
  ["zu", "na"].join(""),
  ["Lu", "na"].join(""),
  ["lu", "na"].join(""),
  ["Cosmic", " Passport"].join(""),
  ["cosmic", " passport"].join(""),
  ["get", "Zu", "na"].join(""),
  ["Zu", "na", "Safe"].join(""),
  ["Zu", "na", "Identity"].join(""),
  ["Zu", "na", "Zodiacs"].join("")
];

const failures = [];

for (const filePath of walk(repoRoot)) {
  const relativePath = relative(repoRoot, filePath);

  if (skippedFiles.has(relativePath)) {
    continue;
  }

  const text = readFileSync(filePath, "utf8");

  for (const term of blockedTerms) {
    if (!text.includes(term)) {
      continue;
    }

    failures.push(`${relativePath}: contains ${JSON.stringify(term)}`);
  }
}

if (failures.length > 0) {
  console.error("App-neutrality guard failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("App-neutrality guard passed.");

function* walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        yield* walk(join(directory, entry.name));
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const filePath = join(directory, entry.name);
    const stats = statSync(filePath);

    if (stats.size > 1_000_000 || !isTextFile(entry.name)) {
      continue;
    }

    yield filePath;
  }
}

function isTextFile(fileName) {
  return /\.(cjs|css|d\.ts|js|json|jsx|md|mjs|ts|tsx|txt|yml|yaml)$/u.test(fileName);
}
