// CISSP Quest - Knowledge Map RPG - Zone Data
// Domains 1-4 (Zones 1-8) | Domains 5-8 (Zones 9-16)
// All 8 CISSP domains, 2 zones each, plus the Final Boss

import { ZONES_D1_D4 } from './zonesDomains1to4';
import { ZONES_D5_D8 } from './zonesDomains5to8';

export const ZONES = [...ZONES_D1_D4, ...ZONES_D5_D8];

export const FINAL_BOSS = {
  id: "cat-hydra",
  name: "The CAT Hydra",
  icon: "🐲",
  description: "Final Boss - The Adaptive Exam! Mixed questions from ALL 8 domains!",
  unlocked: false,
  enemy: { name: "The CAT Hydra", icon: "🐲" },
  questions: [
    {
      id: "fb1", type: "boss", difficulty: 3,
      question: "A fire breaks out in the data center while backups are running. Your FIRST concern is:",
      options: [
        "Completing the backup job",
        "Evacuating personnel safely",
        "Activating the DR site",
        "Notifying the insurance company"
      ],
      correct: 1,
      explanation: "Human life ALWAYS comes first - before data, systems, or money. Any exam answer that protects people beats every answer that protects assets. Only after safety do you think suppression, DR, and notifications."
    },
    {
      id: "fb2", type: "boss", difficulty: 3,
      question: "An asset worth $500,000 has an exposure factor of 40% for a threat expected twice per year. A control costing $150,000/year reduces the ARO to 0.5. Is the control justified?",
      options: [
        "No - the control costs more than the original ALE",
        "Yes - it saves $300,000/year in reduced ALE, netting $150,000 after cost",
        "Yes - any risk reduction is worth funding",
        "No - quantitative analysis cannot answer this"
      ],
      correct: 1,
      explanation: "SLE = $500K x 0.4 = $200K. ALE before = $200K x 2 = $400K. ALE after = $200K x 0.5 = $100K. Risk reduced by $300K/year for a $150K/year control = net benefit $150K. Justified. Know these formulas cold."
    },
    {
      id: "fb3", type: "boss", difficulty: 3,
      question: "Which combination provides confidentiality AND non-repudiation for a message from Alice to Bob?",
      options: [
        "Encrypt with Bob's public key; sign with Alice's private key",
        "Encrypt with Alice's private key only",
        "Encrypt with a shared AES key only",
        "Hash the message and send the hash alongside it"
      ],
      correct: 0,
      explanation: "Bob's PUBLIC key for encryption = only Bob can decrypt (confidentiality). Alice's PRIVATE key for the signature = only Alice could have signed (non-repudiation + integrity + authenticity). Shared symmetric keys can never prove WHO sent a message."
    },
    {
      id: "fb4", type: "boss", difficulty: 3,
      question: "A Secret-cleared user tries to READ a Top Secret file and WRITE a summary into a Confidential folder. Under Bell-LaPadula, what is permitted?",
      options: [
        "Both actions",
        "Neither action - the read violates simple security (no read up) and the write violates the star property (no write down)",
        "Only the read",
        "Only the write"
      ],
      correct: 1,
      explanation: "No read UP blocks Secret reading Top Secret. No write DOWN blocks Secret writing to Confidential. Both requests fail. If the question had been about Biba, the rules invert (no read down, no write up) because Biba protects integrity."
    },
    {
      id: "fb5", type: "boss", difficulty: 3,
      question: "Your IDS missed an intrusion that your SIEM correlation later caught. The IDS failure is classified as a:",
      options: [
        "False positive",
        "False negative",
        "True positive",
        "True negative"
      ],
      correct: 1,
      explanation: "A real attack that the control failed to flag = FALSE NEGATIVE - the most dangerous outcome because it creates unwarranted confidence. False positives waste analyst time; false negatives hide breaches. Layered detection (defense in depth) exists precisely for this."
    },
    {
      id: "fb6", type: "boss", difficulty: 3,
      question: "The order of volatility dictates you collect forensic evidence in which sequence?",
      options: [
        "Disk -> RAM -> CPU cache -> backups",
        "CPU registers/cache -> RAM -> swap/temp files -> disk -> archival media",
        "Whatever the court requests first",
        "Logs -> disk -> RAM -> cache"
      ],
      correct: 1,
      explanation: "Most volatile first: registers/cache, then RAM (live connections, keys, processes), then swap/temp, then disk, then backups/archival. Power off too early and the most fleeting - often most valuable - evidence is gone forever."
    },
    {
      id: "fb7", type: "boss", difficulty: 3,
      question: "A cloud SaaS vendor refuses a right-to-audit clause but offers a SOC 2 Type II report and ISO 27001 certification. As risk advisor, you should:",
      options: [
        "Reject the vendor outright",
        "Evaluate the independent attestations against your requirements and present residual risk to management for an informed acceptance decision",
        "Accept silently - certifications guarantee security",
        "Demand the vendor's raw firewall configs"
      ],
      correct: 1,
      explanation: "SaaS vendors rarely grant individual audits at scale; independent attestations (SOC 2 Type II, ISO 27001) are the standard substitute. Your job: map them to your control requirements, identify gaps, and let MANAGEMENT make the risk acceptance call. Advise, don't decree."
    },
    {
      id: "fb8", type: "boss", difficulty: 3,
      question: "After a breach, the CEO wants to skip the lessons-learned review to 'move on quickly.' You should advise that skipping it:",
      options: [
        "Is fine - the incident is contained",
        "Forfeits root-cause insight and process improvements, making repeat incidents likely - the review is where incident response pays for itself",
        "Only matters for regulated industries",
        "Can be replaced by buying new tools"
      ],
      correct: 1,
      explanation: "Lessons learned closes the IR loop: what happened, what worked, what failed, what changes (controls, playbooks, training). Skipping it guarantees you re-fight the same battle. Present it as a business investment - the cheapest security improvement available."
    }
  ]
};
