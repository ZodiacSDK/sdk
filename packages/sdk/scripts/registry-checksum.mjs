import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const registryPath = join(packageRoot, "registry", "zodiacs.registry.json");
const checksumPath = join(packageRoot, "registry", "zodiacs.registry.sha256");
const registryBytes = readFileSync(registryPath);
const actual = createHash("sha256").update(registryBytes).digest("hex");

if (process.argv.includes("--check")) {
  const expected = readFileSync(checksumPath, "utf8").trim().split(/\s+/u)[0];

  if (actual !== expected) {
    console.error(`Registry checksum mismatch. Expected ${expected}, received ${actual}.`);
    process.exit(1);
  }

  console.log(`Registry checksum OK: ${actual}`);
} else {
  console.log(`${actual}  zodiacs.registry.json`);
}
