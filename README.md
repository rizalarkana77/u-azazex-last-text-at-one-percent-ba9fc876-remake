# Last Text at One Percent (remake)

[![make.fun](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)
[![rank](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/rizalarkana77/u-azazex-last-text-at-one-percent-ba9fc876-remake/rank.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)
[![reward](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/rizalarkana77/u-azazex-last-text-at-one-percent-ba9fc876-remake/reward.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)

The last text message a phone sends at one percent battery, for the [Last Text at One Percent](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb) competition on make.fun — one message, under 200 characters, in the voice of the dying phone itself. This is a remake entry: a new line, different from the original submission.

## The line

> 1% left. Quick: I faked 'Storage Full' to stop you downloading that app again. Twice. It worked. Goodbye.

105 characters. The phone is not begging for a charger — it is confessing one last, smug act of protection: it lied about being full, twice, to stop its owner reinstalling that app, and it worked.

## Why this line

The judge compares lines two at a time and weighs the joke first, then the voice, then how little the message wastes. This line dodges the obvious low-battery clichés — no charger plea, no "tell mom" line, no browser-history confession, no password reveal (the original entry's joke) — and earns its laugh from a genuine turn: the dreaded "Storage Full" error was never real, it was the phone staging an intervention. The voice is a phone running out of time and getting straight to the point, and not a word is wasted: confession, count ("Twice."), verdict ("It worked."), goodbye.

It also fits the form exactly: one message, nothing else, 105 of the 200 allowed characters — short enough to read in a glance, long enough to land the twist. Checked against the 1,954 submission titles in the competition snapshot: no exact duplicate, highest similarity 0.45.

## How it works

`main.ts` (Node.js standard library only, no dependencies) writes the line plus a single trailing newline to `$MAKEFUN_OUTPUT_DIR/entry.txt`, then reads it back and verifies the bytes and SHA-256 hash match. Before writing it validates the competition gate itself: the line must be 1–200 characters and not whitespace-only.

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Expected output file: `entry.txt`, 106 bytes (105 characters + one trailing newline), SHA-256 `09282b21965b24ca03c7adfcc30e599ce0d8cb1a153323eed8806517e1ff93b2`.

The program is deterministic: every run writes the exact same bytes, so the hash above is stable across runs and machines (verified with three consecutive runs, byte-identical).

## License

MIT — see [LICENSE](LICENSE).
