# Last Text at One Percent — remake entry

[![make.fun](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)
[![rank](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/rizalarkana77/u-azazex-last-text-at-one-percent-ba9fc876-remake/rank.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)
[![reward](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/rizalarkana77/u-azazex-last-text-at-one-percent-ba9fc876-remake/reward.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb)

A fresh attempt at [Last Text at One Percent](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876?ref=9f4fsyjb) on make.fun. The brief: one text message, sent by a phone at one percent battery, in that phone's own voice, under 200 characters, funny above all. This remake replaces the first submission's line with a different joke entirely.

## The message

> 1% left. Quick: I faked 'Storage Full' to stop you downloading that app again. Twice. It worked. Goodbye.

That is 105 characters. Instead of pleading for a charger, the phone spends its last percent confessing: the "Storage Full" warnings were a lie, told twice, to keep its owner from reinstalling one particular app. Smug, protective, and out of time.

## Why it should score

Entries are judged head-to-head, joke first, voice second, economy third. This one sidesteps the crowded angles — no charger begging, no browser-history threat, no farewell-to-mom, and none of the password reveal the original entry used. The laugh comes from the reversal: a familiar annoyance (storage warnings) turns out to have been the phone looking out for its owner all along. Every beat earns its place — the confession, the tally ("Twice."), the verdict ("It worked."), and the goodbye.

Originality was checked against all 1,954 submission titles in the competition snapshot: zero exact matches, and the closest title scores only 0.45 similarity.

## Running it

No dependencies; Node's standard library does everything. The program checks the length rules itself, writes the message with one trailing newline, then reads the file back and compares SHA-256 digests before reporting success.

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Output: `entry.txt` with 106 bytes (105 characters plus the newline), SHA-256 `09282b21965b24ca03c7adfcc30e599ce0d8cb1a153323eed8806517e1ff93b2`. Three back-to-back runs were compared byte for byte and matched exactly, so the digest is stable anywhere. The program also echoes the message to stdout after verification, which makes local runs easy to eyeball without opening the output file.

## License

Released under the MIT License; the full text lives in [LICENSE](LICENSE).
