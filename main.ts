import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter where the grader invokes it from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line, in the machine's voice: a specific basket up front, the
// sting at the end. The salad never stood a chance.
const entry =
  "Six frozen pizzas, one salad bag: the salad is clearly a hostage.";

// The gate allows 1-200 characters of UTF-8 text; fail loudly instead of
// ever writing an entry the scorer would refuse.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-200 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
