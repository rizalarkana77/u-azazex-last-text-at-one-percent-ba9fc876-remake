// SPDX-License-Identifier: MIT
// Remake entry for "Last Text at One Percent".
//
// The whole job of this program is tiny: take one hard-coded
// sentence (the dying phone's final text, 105 characters) and
// drop it into $MAKEFUN_OUTPUT_DIR/entry.txt followed by one
// newline. It then re-reads the file it just wrote and refuses
// to succeed unless the bytes on disk hash to the same SHA-256
// as the bytes it meant to write.
//
// Only Node built-ins are used, and there is no randomness,
// clock, or environment input beyond the output directory, so
// repeated runs produce identical output every time.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: a single text message, 105 characters long,
// comfortably inside the competition's 200-character ceiling.
const FINAL_TEXT =
  "1% left. Quick: I faked 'Storage Full' to stop you downloading " +
  "that app again. Twice. It worked. Goodbye.";

// The gate counts characters as Unicode code points and demands
// between 1 and 200 of them, with at least one non-space. Check
// that here so a bad edit fails loudly instead of at grading.
const totalChars = Array.from(FINAL_TEXT).length;
if (totalChars === 0 || totalChars > 200) {
  console.error(`refusing to write: ${totalChars} characters (allowed 1-200)`);
  process.exit(1);
}
if (FINAL_TEXT.trim() === "") {
  console.error("refusing to write: the text is only whitespace");
  process.exit(1);
}
console.log(`gate self-check passed: ${totalChars} characters`);

function digestOf(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

function run(): void {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (targetDir === undefined || targetDir === "") {
    console.error("MAKEFUN_OUTPUT_DIR must name the output directory");
    process.exit(1);
  }

  // Payload: the sentence plus exactly one trailing newline.
  const payloadText = FINAL_TEXT + "\n";
  if (!payloadText.endsWith("\n") || payloadText.endsWith("\n\n")) {
    console.error("payload must end with a single newline, no more");
    process.exit(1);
  }
  const payload = Buffer.from(payloadText, "utf8");

  mkdirSync(targetDir, { recursive: true });
  const destination = join(targetDir, "entry.txt");
  writeFileSync(destination, payload);

  // Verify by reading the file back from disk and comparing both
  // the raw bytes and their hashes against the intended payload.
  const onDisk = readFileSync(destination);
  const wanted = digestOf(payload);
  const found = digestOf(onDisk);
  if (!onDisk.equals(payload) || found !== wanted) {
    console.error(
      `verification mismatch: wanted sha256 ${wanted}, found ${found}`
    );
    process.exit(1);
  }

  console.log(`entry written to ${destination} (${onDisk.length} bytes)`);
  console.log(`contents: ${totalChars} characters plus one newline`);
  console.log(`sha256 ${found}`);
  console.log("on-disk bytes verified against intended payload");
  console.log(`message: ${FINAL_TEXT}`);
}

run();
