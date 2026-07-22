// One-off extraction script: parses the OCR'd markdown of the CISSP Exam
// Certification Companion book into structured question JSON. Not part of
// the app build — run manually, review output, then decide how to use it.
const fs = require('fs');

const SCRATCH = 'C:/Users/SHEHAR~1/AppData/Local/Temp/claude/C--Users-SheharyarMonnoo-OneDrive-Code/7cd5ca94-6ec7-4303-a423-4e5dac122329/scratchpad';
const text = fs.readFileSync(`${SCRATCH}/cissp-full.md`, 'utf8');
const lines = text.split('\n');

// (label, startLine-exclusive-of-header, endLine-exclusive) pairs found by
// locating the "## Practice Questions" / "# Answers" (or Initial Assessment /
// Exam Sample) headers and their matching Answers sections.
const SECTIONS = [
  { id: 'initial-assessment', domain: null, qStart: 791, qEnd: 1193, aStart: 1193, aEnd: 2143 },
  { id: 'd1-security-risk-management', domain: 1, qStart: 2143, qEnd: 2900, aStart: 2900, aEnd: 3684 },
  { id: 'd2-asset-security', domain: 2, qStart: 3684, qEnd: 4435, aStart: 4435, aEnd: 5412 },
  { id: 'd3-security-architecture-engineering', domain: 3, qStart: 5412, qEnd: 6207, aStart: 6207, aEnd: 7049 },
  { id: 'd4-communication-network-security', domain: 4, qStart: 7049, qEnd: 7844, aStart: 7844, aEnd: 8751 },
  { id: 'd5-identity-access-management', domain: 5, qStart: 8751, qEnd: 9453, aStart: 9453, aEnd: 10273 },
  { id: 'd6-security-assessment-testing', domain: 6, qStart: 10273, qEnd: 11001, aStart: 11001, aEnd: 11818 },
  { id: 'd7-security-operations', domain: 7, qStart: 11818, qEnd: 12528, aStart: 12528, aEnd: 13447 },
  { id: 'd8-software-development-security', domain: 8, qStart: 13447, qEnd: 14155, aStart: 14155, aEnd: 14662 },
  { id: 'exam-sample-1', domain: null, qStart: 14755, qEnd: 15575, aStart: 15575, aEnd: 17206 },
  { id: 'exam-sample-2', domain: null, qStart: 17266, qEnd: 17951, aStart: 17951, aEnd: lines.length },
];

// Strip OCR page-break noise: page markers, repeated running headers, and
// bare page-number footer lines.
function clean(rawLines) {
  let out = rawLines.filter(l => {
    if (/^<<<PAGE \d+>>>$/.test(l)) return false;
    if (/^CHAPTER \d+ [A-Z].*$/.test(l)) return false;
    if (/^\d{1,4}$/.test(l.trim())) return false;
    return true;
  }).join('\n');
  // Some pages render options as dash-bullets glued onto the stem with no
  // newlines ("...processes?- A. text\n- B. text..."). Normalize to the
  // standard "\nA. text\nB. text" shape used elsewhere in the book.
  out = out.replace(/\n-\s+([A-D]\.\s)/g, '\n$1');
  out = out.replace(/([?.])-\s+([A-D]\.\s)/g, '$1\n$2');
  // On those same pages, the next question number is glued onto the end of
  // option D with no separator ("...review.26. Which..."). Insert a break.
  out = out.replace(/([.\?])(\d{1,3}\.\s)/g, '$1\n$2');
  // In some Answers sections, the correct-answer text runs directly into
  // "Explanation:" with no blank line ("...audienceExplanation: ...").
  out = out.replace(/([a-zA-Z)])Explanation:/g, '$1\n\nExplanation:');
  return out;
}

function parseQuestions(block) {
  // Split on a leading "N. " at the start of a line (question numbers).
  const parts = block.split(/\n(?=\d+\.\s)/);
  const out = [];
  for (const part of parts) {
    const m = part.match(/^(\d+)\.\s+([\s\S]+)$/);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    const body = m[2];
    // Options start at a line beginning with "A." / "B." / "C." / "D."
    const optMatch = body.match(/\n?A\.\s*([\s\S]*?)\n?B\.\s*([\s\S]*?)\n?C\.\s*([\s\S]*?)\n?D\.\s*([\s\S]*?)$/);
    if (!optMatch) continue;
    const stem = body.slice(0, body.indexOf(optMatch[0])).trim().replace(/\s+/g, ' ');
    const options = [optMatch[1], optMatch[2], optMatch[3], optMatch[4]]
      .map(o => o.trim().replace(/\s+/g, ' '));
    out.push({ num, question: stem, options });
  }
  return out;
}

function parseAnswers(block) {
  // "N. Answer: X. Answer text" (optionally prefixed with "# "), followed by
  // an "Explanation: ..." paragraph.
  const parts = block.split(/\n(?=#?\s*\d+\.\s+Answer:)/);
  const out = {};
  for (const part of parts) {
    const m = part.match(/^#?\s*(\d+)\.\s+Answer:\s*([A-D])\.\s*([\s\S]*?)\n\s*\n\s*Explanation:\s*([\s\S]+)$/);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    out[num] = {
      correctLetter: m[2],
      correctText: m[3].trim().replace(/\s+/g, ' '),
      explanation: m[4].trim().replace(/\s+/g, ' '),
    };
  }
  return out;
}

const LETTER_IDX = { A: 0, B: 1, C: 2, D: 3 };
const result = {};
let totalQ = 0, totalMatched = 0;

for (const sec of SECTIONS) {
  const qBlock = clean(lines.slice(sec.qStart, sec.qEnd));
  const aBlock = clean(lines.slice(sec.aStart, sec.aEnd));
  const questions = parseQuestions(qBlock);
  const answers = parseAnswers(aBlock);

  const merged = [];
  for (const q of questions) {
    const a = answers[q.num];
    totalQ++;
    if (!a) continue;
    // Sanity check: the answer's letter should point at an option whose text
    // roughly matches correctText (first ~15 chars, case-insensitive).
    const idx = LETTER_IDX[a.correctLetter];
    if (idx === undefined || !q.options[idx]) continue;
    totalMatched++;
    merged.push({
      id: `${sec.id}-${q.num}`,
      question: q.question,
      options: q.options,
      correct: idx,
      explanation: a.explanation,
    });
  }
  result[sec.id] = { domain: sec.domain, count: merged.length, expectedCount: questions.length, questions: merged };
}

fs.writeFileSync(`${SCRATCH}/cissp-questions.json`, JSON.stringify(result, null, 2));

console.log(`Total question stems found: ${totalQ}, matched to answers: ${totalMatched}`);
for (const sec of SECTIONS) {
  const r = result[sec.id];
  console.log(`${sec.id}: ${r.count}/${r.expectedCount} parsed`);
}
