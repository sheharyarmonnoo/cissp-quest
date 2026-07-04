// CISSP Quest - Zones for Domains 1-4
// Domain 1: Security & Risk Management | Domain 2: Asset Security
// Domain 3: Security Architecture & Engineering | Domain 4: Communication & Network Security

export const ZONES_D1_D4 = [
  {
    id: "governance-gate",
    name: "Governance Gate",
    icon: "🏛️",
    description: "Master security governance, the CIA triad, and policy",
    topic: "D1: Governance, CIA & Policy",
    unlocked: true,
    enemy: { name: "Policy Phantom", icon: "👻" },
    questions: [
      {
        id: "gg1",
        type: "mc",
        difficulty: 1,
        question: "Which element of the CIA triad is MOST directly protected by encryption of data at rest?",
        options: [
          "Integrity",
          "Confidentiality",
          "Availability",
          "Authenticity"
        ],
        correct: 1,
        explanation: "Encryption at rest protects CONFIDENTIALITY - it prevents unauthorized disclosure. Hashing protects integrity; redundancy protects availability."
      },
      {
        id: "gg2",
        type: "mc",
        difficulty: 1,
        question: "Security governance is PRIMARILY the responsibility of:",
        options: [
          "The CISO and security team",
          "Senior management / the board",
          "System administrators",
          "Each individual employee"
        ],
        correct: 1,
        explanation: "Governance flows from the top. Senior management and the board own security governance, set risk appetite, and are ultimately liable. The CISO advises and executes, but accountability sits at the top. This 'think like senior management' framing is core to the exam."
      },
      {
        id: "gg3",
        type: "mc",
        difficulty: 2,
        question: "Which document type is MANDATORY and states what must be done, without specifying how?",
        options: [
          "Guideline",
          "Procedure",
          "Policy",
          "Baseline"
        ],
        correct: 2,
        explanation: "Policies are mandatory, high-level statements of management intent. Standards are mandatory specific technologies/parameters, procedures are mandatory step-by-step instructions, baselines are mandatory minimum configurations, and guidelines are the only DISCRETIONARY documents."
      },
      {
        id: "gg4",
        type: "mc",
        difficulty: 2,
        question: "Due care differs from due diligence in that due care is:",
        options: [
          "Researching and understanding risks before acting",
          "Doing what a prudent person would do - acting on the knowledge (the 'do' half)",
          "Only required for publicly traded companies",
          "The same thing stated differently"
        ],
        correct: 1,
        explanation: "Due DILIGENCE is the research/investigation half (know). Due CARE is acting responsibly on that knowledge (do). Mnemonic: Due Diligence = Do Detect, Due Care = Do Correct."
      },
      {
        id: "gg5",
        type: "mc",
        difficulty: 1,
        question: "What is the FIRST priority in any security decision on the CISSP exam?",
        options: [
          "Protecting company data",
          "Human life and safety",
          "Regulatory compliance",
          "Business continuity"
        ],
        correct: 1,
        explanation: "Human safety ALWAYS comes first. If an answer option protects people, it beats every option that protects data, money, or systems. Burn this into memory for exam day."
      },
      {
        id: "gg6",
        type: "mc",
        difficulty: 2,
        question: "The ISC2 Code of Ethics canons, in order of precedence, begin with:",
        options: [
          "Act honorably, honestly, justly, responsibly, and legally",
          "Protect society, the common good, necessary public trust and confidence, and the infrastructure",
          "Provide diligent and competent service to principals",
          "Advance and protect the profession"
        ],
        correct: 1,
        explanation: "The four canons in order: (1) Protect society, the common good, public trust, and infrastructure; (2) Act honorably, honestly, justly, responsibly, legally; (3) Provide diligent and competent service to principals; (4) Advance and protect the profession. When canons conflict, the earlier one wins."
      },
      {
        id: "gg7",
        type: "boss",
        difficulty: 3,
        question: "A new regulation conflicts with an internal security policy. As a security professional, what should you do FIRST?",
        options: [
          "Follow the internal policy until it is formally updated",
          "Immediately implement technical controls to meet the regulation",
          "Advise senior management of the conflict so they can direct policy revision",
          "Ask the regulator for an exemption"
        ],
        correct: 2,
        explanation: "Think like an advisor, not a technician. Laws and regulations supersede internal policy, but YOUR role is to inform management and drive a policy update through proper governance - not to unilaterally change controls."
      }
    ]
  },
  {
    id: "risk-reapers-lair",
    name: "Risk Reaper's Lair",
    icon: "☠️",
    description: "Conquer risk analysis, treatment, and the quantitative formulas",
    topic: "D1: Risk Management",
    unlocked: false,
    enemy: { name: "Risk Reaper", icon: "💀" },
    questions: [
      {
        id: "rr1",
        type: "mc",
        difficulty: 1,
        question: "Single Loss Expectancy (SLE) is calculated as:",
        options: [
          "Asset Value x Exposure Factor",
          "Asset Value x Annualized Rate of Occurrence",
          "Annualized Loss Expectancy / Exposure Factor",
          "Threat x Vulnerability"
        ],
        correct: 0,
        explanation: "SLE = AV x EF. The Exposure Factor is the percentage of the asset's value lost in one incident. Then ALE = SLE x ARO (annualized rate of occurrence)."
      },
      {
        id: "rr2",
        type: "mc",
        difficulty: 2,
        question: "A data center worth $2,000,000 would lose 25% of its value in a flood expected once every 10 years. What is the ALE?",
        options: [
          "$500,000",
          "$50,000",
          "$200,000",
          "$25,000"
        ],
        correct: 1,
        explanation: "SLE = $2,000,000 x 0.25 = $500,000. ARO = 1/10 = 0.1. ALE = $500,000 x 0.1 = $50,000. If a flood control costs less than $50,000/year and removes the risk, it's justified."
      },
      {
        id: "rr3",
        type: "mc",
        difficulty: 1,
        question: "Buying insurance to cover a potential loss is an example of risk:",
        options: [
          "Avoidance",
          "Mitigation",
          "Transference",
          "Acceptance"
        ],
        correct: 2,
        explanation: "Insurance TRANSFERS (shares) the financial risk to a third party. Avoidance ends the risky activity, mitigation reduces the risk with controls, acceptance formally acknowledges and tolerates it. Note: you can never transfer legal accountability."
      },
      {
        id: "rr4",
        type: "mc",
        difficulty: 2,
        question: "The risk that remains AFTER controls are applied is called:",
        options: [
          "Inherent risk",
          "Total risk",
          "Residual risk",
          "Secondary risk"
        ],
        correct: 2,
        explanation: "Residual risk = risk remaining after controls. It must be formally ACCEPTED by senior management - never by the security team. Inherent/total risk is the risk before any controls."
      },
      {
        id: "rr5",
        type: "mc",
        difficulty: 2,
        question: "Which risk analysis approach uses scenarios, expert judgment, and a probability/impact matrix instead of dollar values?",
        options: [
          "Quantitative analysis",
          "Qualitative analysis",
          "Monte Carlo analysis",
          "Fault tree analysis"
        ],
        correct: 1,
        explanation: "Qualitative analysis ranks risks with subjective scales (high/medium/low, heat maps, Delphi technique). Quantitative uses hard numbers (SLE/ALE). Most real programs blend both."
      },
      {
        id: "rr6",
        type: "mc",
        difficulty: 2,
        question: "In threat modeling, STRIDE's 'R' stands for:",
        options: [
          "Replay",
          "Repudiation",
          "Reconnaissance",
          "Rootkit"
        ],
        correct: 1,
        explanation: "STRIDE = Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Repudiation threats map to non-repudiation controls like digital signatures and audit logs."
      },
      {
        id: "rr7",
        type: "boss",
        difficulty: 3,
        question: "A control costs $80,000/year. It reduces the ALE of an attack from $100,000 to $50,000. What should management do?",
        options: [
          "Implement it - it halves the risk",
          "Reject it - the control costs more than the $50,000 of risk it removes",
          "Implement it only if the vendor offers support",
          "Transfer the risk instead, regardless of insurance cost"
        ],
        correct: 1,
        explanation: "Value of control = ALE before - ALE after = $100K - $50K = $50,000/year. The control costs $80,000/year, so it costs $30,000 MORE than it saves. A prudent manager rejects it. Cost/benefit thinking beats 'more security is always better' on this exam."
      }
    ]
  },
  {
    id: "data-dungeon",
    name: "Data Dungeon",
    icon: "🗄️",
    description: "Classify assets and know who owns, processes, and guards data",
    topic: "D2: Classification & Data Roles",
    unlocked: false,
    enemy: { name: "Data Golem", icon: "🗿" },
    questions: [
      {
        id: "dd1",
        type: "mc",
        difficulty: 1,
        question: "Who is ULTIMATELY accountable for the protection of a data asset?",
        options: [
          "The data custodian",
          "The data owner",
          "The data processor",
          "The security administrator"
        ],
        correct: 1,
        explanation: "The data OWNER (typically a senior business manager) is accountable: they classify the data and decide who gets access. The CUSTODIAN (IT) implements protection day-to-day. Owners delegate work, never accountability."
      },
      {
        id: "dd2",
        type: "mc",
        difficulty: 1,
        question: "Under GDPR, the organization that determines the purposes and means of processing personal data is the:",
        options: [
          "Data processor",
          "Data subject",
          "Data controller",
          "Supervisory authority"
        ],
        correct: 2,
        explanation: "The CONTROLLER decides why and how personal data is processed. The PROCESSOR processes it on the controller's behalf (e.g., a cloud provider). The data SUBJECT is the person the data is about."
      },
      {
        id: "dd3",
        type: "mc",
        difficulty: 2,
        question: "The PRIMARY purpose of data classification is to:",
        options: [
          "Satisfy audit requirements",
          "Ensure protection is applied in proportion to the value and sensitivity of the data",
          "Encrypt all corporate data",
          "Reduce storage costs"
        ],
        correct: 1,
        explanation: "Classification matches the level of control to the value/sensitivity of the asset, so you don't overprotect trivial data or underprotect crown jewels. It drives handling, labeling, storage, and destruction requirements."
      },
      {
        id: "dd4",
        type: "mc",
        difficulty: 2,
        question: "Which is the correct order of US government data classifications from LEAST to MOST sensitive?",
        options: [
          "Confidential, Secret, Top Secret, Unclassified",
          "Unclassified, Confidential, Secret, Top Secret",
          "Unclassified, Secret, Confidential, Top Secret",
          "Confidential, Unclassified, Secret, Top Secret"
        ],
        correct: 1,
        explanation: "Government: Unclassified -> Confidential -> Secret -> Top Secret (with SBU/FOUO between Unclassified and Confidential). Commercial equivalents: Public -> Sensitive/Internal -> Private/Confidential -> Proprietary."
      },
      {
        id: "dd5",
        type: "mc",
        difficulty: 1,
        question: "A user who accesses data as part of their job duties is called a data:",
        options: [
          "Steward",
          "Subject",
          "User",
          "Owner"
        ],
        correct: 2,
        explanation: "Data USERS simply consume data per their assigned roles and must follow handling policy. Stewards handle data quality/business metadata; subjects are the people personal data describes."
      },
      {
        id: "dd6",
        type: "mc",
        difficulty: 2,
        question: "Scoping and tailoring of a control baseline means:",
        options: [
          "Applying every control in the framework without exception",
          "Selecting only applicable controls, then adjusting them to fit the organization",
          "Outsourcing control selection to an auditor",
          "Encrypting controls documentation"
        ],
        correct: 1,
        explanation: "SCOPING removes controls that don't apply (no wireless = no wireless controls). TAILORING customizes the remaining controls to the organization's mission and environment (e.g., adjusting parameters, adding compensating controls)."
      },
      {
        id: "dd7",
        type: "boss",
        difficulty: 3,
        question: "Your company uses a SaaS provider to process customer PII. Under GDPR, who is accountable if the provider suffers a breach caused by weak controls your company never verified?",
        options: [
          "Only the SaaS provider, as processor",
          "Your company as controller - accountability for due diligence cannot be outsourced",
          "Neither, if a contract exists",
          "The customers, for sharing their data"
        ],
        correct: 1,
        explanation: "The controller remains accountable for protecting personal data even when processing is outsourced. You can delegate the work (processor) but not the accountability - vendor due diligence and DPAs are the controller's duty. Processors can also be liable, but the controller's accountability never disappears."
      }
    ]
  },
  {
    id: "lifecycle-labyrinth",
    name: "Lifecycle Labyrinth",
    icon: "🌀",
    description: "Navigate data states, retention, and secure destruction",
    topic: "D2: Data Lifecycle & Handling",
    unlocked: false,
    enemy: { name: "Retention Wraith", icon: "🌫️" },
    questions: [
      {
        id: "ll1",
        type: "mc",
        difficulty: 1,
        question: "Data being transmitted across a network is data in:",
        options: [
          "Use",
          "Rest",
          "Transit",
          "Archive"
        ],
        correct: 2,
        explanation: "Three states: at REST (storage - protect with disk/file encryption), in TRANSIT/motion (network - protect with TLS/IPsec), in USE (memory/processing - protect with access controls, secure enclaves, and homomorphic encryption)."
      },
      {
        id: "ll2",
        type: "mc",
        difficulty: 2,
        question: "Which destruction method makes data recovery infeasible AND leaves the drive reusable?",
        options: [
          "Formatting",
          "Degaussing",
          "Purging (e.g., cryptographic erase or verified overwrite)",
          "Shredding"
        ],
        correct: 2,
        explanation: "PURGING (crypto-erase, secure overwrite) defeats even lab recovery while keeping media usable. Clearing only defeats casual recovery. Degaussing destroys magnetic media's servo tracks (drive often unusable, and useless on SSDs). Shredding physically destroys the drive."
      },
      {
        id: "ll3",
        type: "mc",
        difficulty: 2,
        question: "Why is degaussing INEFFECTIVE on SSDs?",
        options: [
          "SSDs are too dense for magnetic fields",
          "SSDs store data in flash memory cells, not magnetically",
          "SSD controllers block magnetic access",
          "It is effective on SSDs"
        ],
        correct: 1,
        explanation: "Degaussing destroys MAGNETIC domains. SSDs use NAND flash (electrical charge), so a degausser does nothing to the data. Use cryptographic erase or physical destruction for SSDs; note wear-leveling can hide remnant data from overwrites."
      },
      {
        id: "ll4",
        type: "mc",
        difficulty: 1,
        question: "Data remanence refers to:",
        options: [
          "Data kept past its retention period",
          "Residual data remaining on media after deletion or erasure attempts",
          "Backup copies stored offsite",
          "Metadata attached to files"
        ],
        correct: 1,
        explanation: "Remanence is the residue left after imperfect erasure - the reason 'delete' and even 'format' are not sanitization. It drives the need for purging or destruction before media reuse or disposal."
      },
      {
        id: "ll5",
        type: "mc",
        difficulty: 2,
        question: "A record retention policy should keep data for:",
        options: [
          "As long as storage allows",
          "Only as long as it is needed for business or legal requirements, then securely destroy it",
          "Seven years, in all cases",
          "Forever, for audit defense"
        ],
        correct: 1,
        explanation: "Keep data only as long as required (legal/regulatory/business), then destroy it per policy. Over-retention increases breach impact, discovery costs, and privacy violations (data minimization). One retention length never fits all record types."
      },
      {
        id: "ll6",
        type: "mc",
        difficulty: 2,
        question: "Which technology inspects outbound content to prevent sensitive data from leaving the organization?",
        options: [
          "IDS",
          "DLP",
          "NAC",
          "WAF"
        ],
        correct: 1,
        explanation: "Data Loss Prevention (DLP) classifies and inspects content in motion, at rest, and in use, blocking or flagging exfiltration (e.g., PII pasted into webmail). IDS detects intrusions; NAC gates network admission; WAF protects web apps."
      },
      {
        id: "ll7",
        type: "boss",
        difficulty: 3,
        question: "Leased office copiers are being returned to the vendor. The BEST action for the internal storage drives is:",
        options: [
          "Delete all stored files through the copier menu",
          "Trust the vendor's reset process per the lease",
          "Sanitize or remove/destroy the drives per policy before the copiers leave your control",
          "Nothing - copiers don't retain documents"
        ],
        correct: 2,
        explanation: "Copiers/MFPs cache scanned and printed documents on internal drives. Menu deletion leaves remanence, and vendor promises don't transfer your accountability. Sanitize (purge) or pull and destroy drives before equipment leaves your control."
      }
    ]
  },
  {
    id: "model-mountain",
    name: "Model Mountain",
    icon: "⛰️",
    description: "Scale the formal security models and secure design principles",
    topic: "D3: Security Models & Design",
    unlocked: false,
    enemy: { name: "Lattice Basilisk", icon: "🐍" },
    questions: [
      {
        id: "mm1",
        type: "mc",
        difficulty: 1,
        question: "Bell-LaPadula's Simple Security Property states:",
        options: [
          "No write down",
          "No read up",
          "No read down",
          "No write up"
        ],
        correct: 1,
        explanation: "Bell-LaPadula protects CONFIDENTIALITY: Simple Security = no read UP (ss = 'simple/read'), Star (*) property = no write DOWN. Mnemonic: 'BLP is about secrets' - you can't read above your clearance or leak secrets downward."
      },
      {
        id: "mm2",
        type: "mc",
        difficulty: 1,
        question: "Which model protects INTEGRITY with 'no read down, no write up'?",
        options: [
          "Bell-LaPadula",
          "Biba",
          "Brewer-Nash",
          "Graham-Denning"
        ],
        correct: 1,
        explanation: "Biba is the integrity mirror of BLP: Simple Integrity = no read DOWN (don't consume dirty data), Star Integrity = no write UP (don't contaminate cleaner data). Mnemonic: 'I' before 'B' - Biba = Integrity."
      },
      {
        id: "mm3",
        type: "mc",
        difficulty: 2,
        question: "The Clark-Wilson model enforces integrity PRIMARILY through:",
        options: [
          "Security labels and clearances",
          "Well-formed transactions and separation of duties (access via programs, not direct access)",
          "Dynamic conflict-of-interest classes",
          "State machine transitions only"
        ],
        correct: 1,
        explanation: "Clark-Wilson: users access data (CDIs) only through Transformation Procedures (TPs) - the access triple - with separation of duties and verification (IVPs). Think 'commercial integrity': banking apps, not military labels."
      },
      {
        id: "mm4",
        type: "mc",
        difficulty: 2,
        question: "Which model is designed to prevent conflicts of interest at a consultancy serving competing clients?",
        options: [
          "Biba",
          "Brewer-Nash (Chinese Wall)",
          "Bell-LaPadula",
          "Take-Grant"
        ],
        correct: 1,
        explanation: "Brewer-Nash builds a dynamic 'ethical wall': once you access Bank A's data, you're blocked from Bank B's (same conflict class). Access rights change based on your access HISTORY - the only major model with dynamic rules."
      },
      {
        id: "mm5",
        type: "mc",
        difficulty: 2,
        question: "The Trusted Computing Base (TCB) is:",
        options: [
          "The encrypted portion of the hard drive",
          "The totality of hardware, software, and firmware enforcing the security policy",
          "A TPM chip",
          "The administrator account set"
        ],
        correct: 1,
        explanation: "The TCB is everything that enforces security policy; the security perimeter separates it from the rest. The reference monitor concept mediates every access, implemented by the security kernel - which must be tamper-proof, always invoked, and small enough to verify."
      },
      {
        id: "mm6",
        type: "mc",
        difficulty: 1,
        question: "Requiring two people to complete a critical action (e.g., dual signatures for wire transfers) implements:",
        options: [
          "Least privilege",
          "Separation of duties",
          "Defense in depth",
          "Fail-safe defaults"
        ],
        correct: 1,
        explanation: "Separation of duties splits a sensitive task so no single person can complete (or abuse) it alone - dual control and two-person integrity are variants. Least privilege limits each person's rights; defense in depth layers controls."
      },
      {
        id: "mm7",
        type: "boss",
        difficulty: 3,
        question: "A system must let a Secret-cleared analyst write reports readable at Top Secret, but never let TS data flow to Secret. Which model property permits the write?",
        options: [
          "Biba star property",
          "Bell-LaPadula star property - writing UP is allowed (no write DOWN)",
          "Clark-Wilson TP rule",
          "BLP simple security property - reads are unrestricted"
        ],
        correct: 1,
        explanation: "Under BLP's * property, subjects may write at or ABOVE their level (no write down), so Secret writing up to TS is legal - the analyst just can't read the TS document afterward. Confidentiality flows: data may only move upward."
      }
    ]
  },
  {
    id: "crypto-catacombs",
    name: "Crypto Catacombs",
    icon: "🔐",
    description: "Decrypt symmetric, asymmetric, hashing, and PKI mysteries",
    topic: "D3: Cryptography & PKI",
    unlocked: false,
    enemy: { name: "Cipher Sphinx", icon: "🦁" },
    questions: [
      {
        id: "cy1",
        type: "mc",
        difficulty: 1,
        question: "How many keys are required for 10 people to communicate pairwise using SYMMETRIC encryption?",
        options: [
          "10",
          "20",
          "45",
          "90"
        ],
        correct: 2,
        explanation: "Symmetric: n(n-1)/2 = 10x9/2 = 45 keys. Asymmetric needs only 2n = 20 (a key pair each). This scaling problem is why asymmetric crypto is used to exchange symmetric session keys."
      },
      {
        id: "cy2",
        type: "mc",
        difficulty: 1,
        question: "Which of these is an ASYMMETRIC algorithm?",
        options: [
          "AES",
          "RSA",
          "3DES",
          "Blowfish"
        ],
        correct: 1,
        explanation: "RSA (factoring), Diffie-Hellman (key agreement), ECC, and ElGamal are asymmetric. AES, DES/3DES, Blowfish/Twofish, RC4/5/6, IDEA, and CAST are symmetric. Remember: symmetric = fast bulk encryption; asymmetric = key exchange and signatures."
      },
      {
        id: "cy3",
        type: "mc",
        difficulty: 2,
        question: "To provide NON-REPUDIATION, a sender must:",
        options: [
          "Encrypt the message with the recipient's public key",
          "Sign a hash of the message with the sender's PRIVATE key",
          "Encrypt with a shared symmetric key",
          "Send the message over TLS"
        ],
        correct: 1,
        explanation: "A digital signature = hash the message, encrypt the hash with YOUR private key. Anyone can verify with your public key, and only you could have signed it. Symmetric keys can't give non-repudiation because both parties share the same key."
      },
      {
        id: "cy4",
        type: "mc",
        difficulty: 2,
        question: "Which property must a cryptographic hash have to resist finding two different inputs with the same digest?",
        options: [
          "Preimage resistance",
          "Collision resistance",
          "Key stretching",
          "Diffusion"
        ],
        correct: 1,
        explanation: "Collision resistance = infeasible to find ANY two inputs with equal hashes (birthday attack target). Preimage resistance = can't reverse a digest to an input. MD5 and SHA-1 are broken for collisions - use SHA-2/SHA-3."
      },
      {
        id: "cy5",
        type: "mc",
        difficulty: 2,
        question: "In a PKI, what does a Certificate Authority bind together when issuing a certificate?",
        options: [
          "A private key and a passphrase",
          "An identity and a public key",
          "Two symmetric session keys",
          "A hash and a timestamp"
        ],
        correct: 1,
        explanation: "A certificate is a CA-signed statement binding an identity (subject) to a PUBLIC key, per X.509. Revocation is checked via CRLs or OCSP. The private key never leaves the subject (except in key escrow schemes)."
      },
      {
        id: "cy6",
        type: "mc",
        difficulty: 2,
        question: "Which AES mode should be AVOIDED because identical plaintext blocks produce identical ciphertext blocks?",
        options: [
          "GCM",
          "CBC",
          "ECB",
          "CTR"
        ],
        correct: 2,
        explanation: "ECB encrypts each block independently, so patterns leak (the classic 'ECB penguin' image). CBC chains blocks with an IV; CTR turns AES into a stream; GCM adds authentication (AEAD) and is the modern default."
      },
      {
        id: "cy7",
        type: "boss",
        difficulty: 3,
        question: "Alice sends Bob a contract. She encrypts it with a random AES key, encrypts that AES key with Bob's PUBLIC key, and signs the contract's hash with her PRIVATE key. What has she achieved?",
        options: [
          "Confidentiality only",
          "Confidentiality, integrity, authenticity, and non-repudiation",
          "Integrity and availability",
          "Non-repudiation only"
        ],
        correct: 1,
        explanation: "This is a hybrid cryptosystem + digital signature: AES gives fast confidentiality; RSA-wrapping the key gives secure key exchange (only Bob decrypts); the signature gives integrity, authenticity, and non-repudiation. This composite pattern is a classic exam scenario."
      }
    ]
  },
  {
    id: "packet-peaks",
    name: "Packet Peaks",
    icon: "🏔️",
    description: "Climb the OSI layers and master protocols and ports",
    topic: "D4: OSI Model & Protocols",
    unlocked: false,
    enemy: { name: "OSI Ogre", icon: "👹" },
    questions: [
      {
        id: "pp1",
        type: "mc",
        difficulty: 1,
        question: "Which OSI layer is responsible for routing packets between networks?",
        options: [
          "Layer 2 - Data Link",
          "Layer 3 - Network",
          "Layer 4 - Transport",
          "Layer 5 - Session"
        ],
        correct: 1,
        explanation: "Layer 3 (Network) routes PACKETS using logical addresses (IP); routers live here. L2 switches FRAMES by MAC address, L4 moves SEGMENTS (TCP/UDP). Mnemonic bottom-up: Please Do Not Throw Sausage Pizza Away."
      },
      {
        id: "pp2",
        type: "mc",
        difficulty: 1,
        question: "TCP differs from UDP because TCP provides:",
        options: [
          "Faster transmission with no overhead",
          "Connection-oriented, reliable delivery with sequencing and acknowledgments",
          "Broadcast-only delivery",
          "Encryption by default"
        ],
        correct: 1,
        explanation: "TCP: three-way handshake (SYN, SYN/ACK, ACK), sequencing, acknowledgment, retransmission - reliable but heavier. UDP: connectionless best-effort - streaming, DNS queries, VoIP. Neither encrypts by itself."
      },
      {
        id: "pp3",
        type: "mc",
        difficulty: 2,
        question: "Which port/protocol pairing is INCORRECT?",
        options: [
          "HTTPS - TCP 443",
          "SSH - TCP 22",
          "DNS - port 80",
          "RDP - TCP 3389"
        ],
        correct: 2,
        explanation: "DNS uses port 53 (UDP for queries, TCP for zone transfers/large responses). Port 80 is HTTP. Memorize the classics: FTP 20/21, SSH/SFTP 22, Telnet 23, SMTP 25, DNS 53, HTTP 80, Kerberos 88, HTTPS 443, LDAP 389, LDAPS 636, RDP 3389."
      },
      {
        id: "pp4",
        type: "mc",
        difficulty: 2,
        question: "ARP poisoning allows an attacker to:",
        options: [
          "Overflow the DNS cache",
          "Redirect LAN traffic by mapping their MAC address to another host's IP",
          "Crack WPA3 passphrases",
          "Hijack BGP routes on the internet"
        ],
        correct: 1,
        explanation: "ARP has no authentication - forged replies poison neighbors' ARP caches so traffic for the victim's IP goes to the attacker's MAC (classic on-path/MitM at Layer 2). Defenses: dynamic ARP inspection, static entries for critical hosts, segmentation."
      },
      {
        id: "pp5",
        type: "mc",
        difficulty: 2,
        question: "IPv6 addresses are how many bits long?",
        options: [
          "32",
          "64",
          "128",
          "256"
        ],
        correct: 2,
        explanation: "IPv6 = 128-bit addresses (vs IPv4's 32), written as eight hex quartets. IPv6 has IPsec support built into the protocol suite and eliminates the need for NAT - remember dual-stack environments double your attack surface to monitor."
      },
      {
        id: "pp6",
        type: "mc",
        difficulty: 1,
        question: "Which device operates at Layer 1, blindly repeating all signals to every port?",
        options: [
          "Switch",
          "Router",
          "Hub",
          "Bridge"
        ],
        correct: 2,
        explanation: "A hub is a Layer 1 repeater - every port sees all traffic (one collision domain, easy sniffing). Switches (L2) forward by MAC and isolate collision domains; routers (L3) separate broadcast domains."
      },
      {
        id: "pp7",
        type: "boss",
        difficulty: 3,
        question: "A SYN flood exhausts a server's connection table. At which OSI layer does this attack operate, and what is a PRIMARY mitigation?",
        options: [
          "Layer 3; block ICMP",
          "Layer 4; SYN cookies or SYN proxying at the edge",
          "Layer 7; input validation",
          "Layer 2; port security"
        ],
        correct: 1,
        explanation: "SYN floods abuse the TCP (Layer 4) three-way handshake by never completing it, filling the half-open connection queue. SYN cookies encode state in the sequence number so no table entry is held; edge devices can also proxy the handshake."
      }
    ]
  },
  {
    id: "firewall-fortress",
    name: "Firewall Fortress",
    icon: "🏰",
    description: "Defend the perimeter: firewalls, VPNs, wireless, and segmentation",
    topic: "D4: Network Defense & Attacks",
    unlocked: false,
    enemy: { name: "Firewall Fiend", icon: "🔥" },
    questions: [
      {
        id: "ff1",
        type: "mc",
        difficulty: 1,
        question: "A firewall that tracks the state of connections and allows return traffic automatically is a:",
        options: [
          "Packet-filtering firewall",
          "Stateful inspection firewall",
          "Circuit-level proxy only",
          "Air gap"
        ],
        correct: 1,
        explanation: "Stateful firewalls keep a connection table and permit replies to established sessions. Static packet filters examine each packet in isolation (ACLs). Next-gen firewalls add application awareness, IPS, and identity."
      },
      {
        id: "ff2",
        type: "mc",
        difficulty: 2,
        question: "Which IPsec protocol provides encryption (confidentiality)?",
        options: [
          "AH",
          "ESP",
          "IKE",
          "GRE"
        ],
        correct: 1,
        explanation: "ESP (Encapsulating Security Payload) provides confidentiality plus integrity and authentication. AH provides integrity/authentication only - NO encryption (and breaks with NAT). IKE negotiates keys/SAs; tunnel mode protects the whole packet, transport mode just the payload."
      },
      {
        id: "ff3",
        type: "mc",
        difficulty: 1,
        question: "Which wireless security protocol is the CURRENT strongest standard?",
        options: [
          "WEP",
          "WPA",
          "WPA2",
          "WPA3"
        ],
        correct: 3,
        explanation: "WPA3 (SAE handshake, forward secrecy, stronger encryption) supersedes WPA2 (AES-CCMP, still common). WPA-TKIP was transitional, and WEP is trivially broken - never an acceptable answer except as 'the wrong choice'."
      },
      {
        id: "ff4",
        type: "mc",
        difficulty: 2,
        question: "Placing public-facing web servers in a screened subnet (DMZ) achieves what?",
        options: [
          "Eliminates the need for hardening",
          "Isolates internet-exposed systems so a compromise doesn't grant direct access to the internal network",
          "Doubles available bandwidth",
          "Hides servers from the internet entirely"
        ],
        correct: 1,
        explanation: "A DMZ is a buffer zone between two firewalls (or firewall interfaces): exposed services live there, and even if breached, another policy layer still separates the attacker from the internal LAN. Segmentation contains blast radius."
      },
      {
        id: "ff5",
        type: "mc",
        difficulty: 2,
        question: "An attacker sets up a fake access point with the same SSID as the corporate network to harvest credentials. This is a(n):",
        options: [
          "Bluejacking attack",
          "Evil twin attack",
          "Wardriving",
          "Jamming attack"
        ],
        correct: 1,
        explanation: "An evil twin impersonates a legitimate AP so victims connect through the attacker. Defenses: mutual authentication (802.1X/EAP-TLS), certificate validation, wireless IDS. Wardriving is just mapping networks; bluejacking is unsolicited Bluetooth messages."
      },
      {
        id: "ff6",
        type: "mc",
        difficulty: 2,
        question: "802.1X port-based network access control involves which three roles?",
        options: [
          "Client, server, firewall",
          "Supplicant, authenticator, authentication server",
          "Peer, proxy, gateway",
          "User, switch, DNS server"
        ],
        correct: 1,
        explanation: "The SUPPLICANT (device) asks the AUTHENTICATOR (switch/AP) for access; the authenticator relays credentials via EAP to the AUTHENTICATION SERVER (RADIUS), which decides. Until then the port only passes EAP traffic."
      },
      {
        id: "ff7",
        type: "boss",
        difficulty: 3,
        question: "Remote employees need full access to internal apps over untrusted networks, but the CISO wants per-application, identity-verified access with no implicit network trust. The BEST direction is:",
        options: [
          "A site-to-site IPsec tunnel to each home",
          "Zero trust network access (ZTNA) - authenticate every user/device per session and per app",
          "Full-tunnel VPN with split tunneling disabled, forever",
          "MAC address filtering on the corporate firewall"
        ],
        correct: 1,
        explanation: "'Never trust, always verify': zero trust replaces flat network-level trust with continuous identity, device, and context checks per application. Traditional VPNs grant broad network reachability once connected - exactly the implicit trust the CISO rejected."
      }
    ]
  }
];
