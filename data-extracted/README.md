# Extracted book questions (not wired into the app)

`cissp-book-questions.json` — 923 questions with answers and explanations,
OCR-extracted from the user's *CISSP Exam Certification Companion* PDF
(Mohamed Aly Bouke, Apress) via Mistral OCR, then parsed by
`scripts/parse-book.cjs`.

The PDF had no text layer (scanned page images), so this went through
Mistral's OCR API rather than a direct text extraction.

## Sections

| key | domain | count |
|---|---|---|
| `initial-assessment` | mixed | 55 |
| `d1-security-risk-management` | 1 | 91 |
| `d2-asset-security` | 2 | 98 |
| `d3-security-architecture-engineering` | 3 | 97 |
| `d4-communication-network-security` | 4 | 92 |
| `d5-identity-access-management` | 5 | 77 |
| `d6-security-assessment-testing` | 6 | 81 |
| `d7-security-operations` | 7 | 88 |
| `d8-software-development-security` | 8 | 83 |
| `exam-sample-1` | mixed | 88 |
| `exam-sample-2` | mixed | 73 |

Each question: `{ id, question, options[4], correct (0-3 index), explanation }`.

The `domain` field on each section (1-8) lines up with this app's existing
CISSP domain numbering in `src/data/zonesDomains1to4.js` /
`zonesDomains5to8.js`, if these ever get folded into the game.

## Known gaps

923 of 931 detected question stems matched cleanly to an answer (99.1%).
The remaining ~8 failed to parse due to isolated OCR misreads (e.g. a
question number digit mis-recognized) rather than a systematic format
issue — recoverable by hand from the original PDF if ever needed, but not
worth chasing further for a first pass.

This data is **not currently used anywhere in the app** — it's a raw
extraction for review before deciding how (or whether) to fold it in.
