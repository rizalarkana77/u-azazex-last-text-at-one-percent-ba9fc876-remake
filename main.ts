// SPDX-License-Identifier: MIT
// Last Text at One Percent (remake) — entry program.
//
// Writes the phone's last text message (one line, 105 characters,
// under the 200-character limit) to $MAKEFUN_OUTPUT_DIR/entry.txt
// with a single trailing newline, then verifies the written file
// by reading it back and comparing its SHA-256 digest.
//
// Node.js standard library only. Deterministic: the same input
// always produces the same bytes.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "1% left. Quick: I faked 'Storage Full' to stop you downloading " +
  "that app again. Twice. It worked. Goodbye.";

// Character count in code points (not UTF-16 units), matching the
// competition gate: UTF-8 text, 1-200 characters, not whitespace-only.
const lineChars = [...ENTRY_LINE].length;
if (lineChars < 1 || lineChars > 200) {
  console.error(`line is ${lineChars} characters; must be 1-200`);
  process.exit(1);
}
if (ENTRY_LINE.trim().length === 0) {
  console.error("line must not be whitespace-only");
  process.exit(1);
}
console.log(`line OK: ${lineChars} characters`);

function sha256Hex(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }

  // The entry is the line plus exactly one trailing newline.
  const content = ENTRY_LINE + "\n";
  const bytes = Buffer.from(content, "utf8");

  if (!content.endsWith("\n") || content.endsWith("\n\n")) {
    console.error("entry must end with exactly one trailing newline");
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, bytes);

  // Read-back verification: the file on disk must be byte-identical
  // to what we intended to write.
  const written = readFileSync(outPath);
  const expectedDigest = sha256Hex(bytes);
  const actualDigest = sha256Hex(written);
  if (!written.equals(bytes) || actualDigest !== expectedDigest) {
    console.error(
      `read-back verification failed: expected sha256 ${expectedDigest}, got ${actualDigest}`
    );
    process.exit(1);
  }

  console.log(`wrote ${outPath} (${written.length} bytes)`);
  console.log(`line: ${lineChars} characters + 1 trailing newline`);
  console.log(`sha256: ${actualDigest}`);
  console.log("read-back verification: OK");
}

main();
