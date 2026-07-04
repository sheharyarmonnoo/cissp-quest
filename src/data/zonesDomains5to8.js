// CISSP Quest - Zones for Domains 5-8
// Domain 5: Identity & Access Management | Domain 6: Security Assessment & Testing
// Domain 7: Security Operations | Domain 8: Software Development Security

export const ZONES_D5_D8 = [
  {
    id: "identity-isles",
    name: "Identity Isles",
    icon: "🏝️",
    description: "Prove who you are: factors, MFA, SSO, and the identity lifecycle",
    topic: "D5: Authentication & Identity",
    unlocked: false,
    enemy: { name: "Imposter Djinn", icon: "🧞" },
    questions: [
      {
        id: "ii1",
        type: "mc",
        difficulty: 1,
        question: "A password is which authentication factor type?",
        options: [
          "Something you have",
          "Something you know",
          "Something you are",
          "Somewhere you are"
        ],
        correct: 1,
        explanation: "Type 1 = something you KNOW (password, PIN), Type 2 = something you HAVE (token, smart card, authenticator app), Type 3 = something you ARE (biometrics). True MFA combines DIFFERENT types - password + PIN is still one factor."
      },
      {
        id: "ii2",
        type: "mc",
        difficulty: 1,
        question: "Which combination is TRUE multifactor authentication?",
        options: [
          "Password + security questions",
          "PIN + password",
          "Smart card + PIN",
          "Fingerprint + iris scan"
        ],
        correct: 2,
        explanation: "Smart card (have) + PIN (know) = two DIFFERENT factor types. Password + security questions are both 'know'; fingerprint + iris are both 'are'. Same-type combos are just multi-step, not multi-factor."
      },
      {
        id: "ii3",
        type: "mc",
        difficulty: 2,
        question: "In biometrics, the Crossover Error Rate (CER) is the point where:",
        options: [
          "Enrollment time equals verification time",
          "False Rejection Rate equals False Acceptance Rate",
          "The system rejects all users",
          "Template size equals sample size"
        ],
        correct: 1,
        explanation: "CER (or EER) is where FRR (Type I - genuine users rejected) equals FAR (Type II - impostors accepted). Lower CER = more accurate system. For security-critical systems, tune toward lower FAR even at the cost of more false rejections."
      },
      {
        id: "ii4",
        type: "mc",
        difficulty: 2,
        question: "Identification differs from authentication in that identification is:",
        options: [
          "Proving your claimed identity",
          "Claiming an identity (e.g., typing a username)",
          "Being granted permissions",
          "Recording actions in logs"
        ],
        correct: 1,
        explanation: "The IAAA chain: Identification (claim - username), Authentication (prove - password/token/biometric), Authorization (what you may access), Accountability (auditing ties actions to you)."
      },
      {
        id: "ii5",
        type: "mc",
        difficulty: 2,
        question: "When an employee transfers departments repeatedly and keeps accumulating old permissions, this is called:",
        options: [
          "Privilege escalation",
          "Authorization creep (privilege creep)",
          "Separation of duties",
          "Account takeover"
        ],
        correct: 1,
        explanation: "Privilege/authorization creep violates least privilege and is caught by periodic ACCESS REVIEWS and enforced by proper provisioning/deprovisioning in the identity lifecycle. Escalation is an attacker gaining rights; creep is legitimate access accumulating unchecked."
      },
      {
        id: "ii6",
        type: "mc",
        difficulty: 2,
        question: "Federated identity (e.g., logging into a partner site with your corporate credentials) primarily relies on:",
        options: [
          "Shared password databases between organizations",
          "A trust relationship where an identity provider asserts your identity to a service provider",
          "Each site issuing separate accounts",
          "Biometric enrollment at every provider"
        ],
        correct: 1,
        explanation: "In federation, the Identity Provider (IdP) authenticates you and sends a signed assertion (SAML, OIDC) to the Service Provider (SP), which trusts it. Passwords never cross the boundary - the trust and the assertion do."
      },
      {
        id: "ii7",
        type: "boss",
        difficulty: 3,
        question: "A terminated administrator's account was disabled, but backdoor access continued via a service account only they knew. The BEST preventive control for the future is:",
        options: [
          "Faster HR notifications",
          "Managed service accounts with vaulted, rotated credentials and privileged access management (PAM)",
          "Annual password changes for all accounts",
          "Prosecuting the former admin"
        ],
        correct: 1,
        explanation: "PAM vaults privileged credentials, rotates them automatically, brokers sessions, and logs use - so no individual 'owns' a shared secret that survives their departure. Faster HR alerts help the known account, but the vault kills the unknown backdoor pattern."
      }
    ]
  },
  {
    id: "access-abyss",
    name: "Access Abyss",
    icon: "🕳️",
    description: "Descend into access control models, Kerberos, SAML, and OAuth",
    topic: "D5: Access Control Models & Protocols",
    unlocked: false,
    enemy: { name: "Cerberus of Kerberos", icon: "🐕" },
    questions: [
      {
        id: "aa1",
        type: "mc",
        difficulty: 1,
        question: "In which access control model does the data OWNER decide who gets access, typically via ACLs?",
        options: [
          "Mandatory Access Control (MAC)",
          "Discretionary Access Control (DAC)",
          "Role-Based Access Control (RBAC)",
          "Rule-Based Access Control"
        ],
        correct: 1,
        explanation: "DAC = owner discretion (NTFS permissions, Unix modes). MAC = system-enforced labels/clearances (military). RBAC = permissions bundled into job roles. Rule-based = global rules like firewall ACLs applied to everyone."
      },
      {
        id: "aa2",
        type: "mc",
        difficulty: 2,
        question: "Which model grants access based on attributes of the subject, object, and environment (e.g., department = finance AND time = business hours)?",
        options: [
          "RBAC",
          "ABAC",
          "MAC",
          "DAC"
        ],
        correct: 1,
        explanation: "Attribute-Based Access Control evaluates policies over attributes (subject, resource, action, context) - the most granular and flexible model, used by XACML and modern cloud IAM policies. RBAC is a common special case of it."
      },
      {
        id: "aa3",
        type: "mc",
        difficulty: 2,
        question: "In Kerberos, what does the client present to access a specific file server?",
        options: [
          "Its password, sent to the file server",
          "A service ticket obtained from the Ticket Granting Service",
          "The TGT directly to the file server",
          "An OAuth access token"
        ],
        correct: 1,
        explanation: "Flow: authenticate to the KDC's Authentication Service, receive a TGT; present the TGT to the Ticket Granting Service to get a SERVICE TICKET for the target server; present that to the server. Passwords never cross the network; timestamps limit replay (clock sync matters)."
      },
      {
        id: "aa4",
        type: "mc",
        difficulty: 2,
        question: "Kerberos' single point of failure is:",
        options: [
          "The client workstation",
          "The Key Distribution Center (KDC)",
          "The DNS server",
          "The service ticket"
        ],
        correct: 1,
        explanation: "If the KDC goes down, nobody gets tickets; if it's compromised, every principal's secret is exposed (hello, golden ticket attacks). Harden and replicate the KDC. Kerberos also depends on synchronized clocks (typically within 5 minutes)."
      },
      {
        id: "aa5",
        type: "mc",
        difficulty: 2,
        question: "SAML is BEST described as:",
        options: [
          "An XML-based standard for exchanging authentication and authorization assertions, common in enterprise web SSO",
          "A password hashing algorithm",
          "A network authentication protocol using tickets",
          "An API authorization framework using JSON tokens"
        ],
        correct: 0,
        explanation: "SAML = XML assertions from IdP to SP for web SSO (enterprise). OAuth 2.0 = delegated AUTHORIZATION for APIs; OpenID Connect adds an identity layer (JSON/JWT) on top of OAuth. Kerberos = the ticket protocol for internal networks."
      },
      {
        id: "aa6",
        type: "mc",
        difficulty: 1,
        question: "OAuth 2.0 is fundamentally a protocol for:",
        options: [
          "Authentication",
          "Delegated authorization (letting an app act on your behalf without your password)",
          "Encryption key exchange",
          "Directory replication"
        ],
        correct: 1,
        explanation: "OAuth grants an application scoped ACCESS to resources (e.g., 'this app may read your calendar') without sharing credentials. It is not authentication by itself - that's why OpenID Connect exists on top of it."
      },
      {
        id: "aa7",
        type: "boss",
        difficulty: 3,
        question: "A hospital must guarantee that even system administrators cannot relabel or share patient records in violation of central policy. Which access control model BEST fits this requirement?",
        options: [
          "DAC, with strict ACL reviews",
          "MAC - labels and clearances enforced by the system, not modifiable at user discretion",
          "RBAC with an 'admin' role",
          "Rule-based control on the perimeter firewall"
        ],
        correct: 1,
        explanation: "Only MAC takes access decisions out of ALL users' hands - the system enforces labels per central policy, and even admins can't override at discretion. DAC by definition allows owner discretion; RBAC admins can typically re-assign roles."
      }
    ]
  },
  {
    id: "audit-arena",
    name: "Audit Arena",
    icon: "⚖️",
    description: "Battle through assessments, audits, and SOC reports",
    topic: "D6: Assessments, Audits & SOC Reports",
    unlocked: false,
    enemy: { name: "Audit Wyvern", icon: "🐉" },
    questions: [
      {
        id: "ar1",
        type: "mc",
        difficulty: 1,
        question: "Which SOC report type evaluates controls relevant to security, availability, processing integrity, confidentiality, and privacy?",
        options: [
          "SOC 1",
          "SOC 2",
          "SOC 4",
          "SAS 70"
        ],
        correct: 1,
        explanation: "SOC 2 covers the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy) - the report to request from cloud/SaaS vendors. SOC 1 covers controls relevant to financial reporting; SOC 3 is a public summary of SOC 2."
      },
      {
        id: "ar2",
        type: "mc",
        difficulty: 2,
        question: "A SOC 2 Type II report differs from Type I because Type II:",
        options: [
          "Is available to the general public",
          "Tests operating EFFECTIVENESS of controls over a period of time (typically 6-12 months)",
          "Only describes controls at a single point in time",
          "Is performed by the vendor itself"
        ],
        correct: 1,
        explanation: "Type I = design suitability at a POINT in time (snapshot). Type II = design AND operating effectiveness over a PERIOD - much stronger assurance. When vetting vendors, ask for Type II."
      },
      {
        id: "ar3",
        type: "mc",
        difficulty: 1,
        question: "The KEY difference between an internal audit and an external (third-party) audit is:",
        options: [
          "Internal audits are always more thorough",
          "External audits provide independent assurance free from organizational bias",
          "External audits never see sensitive data",
          "Internal audits are required by law"
        ],
        correct: 1,
        explanation: "Independence is the value: external auditors have no stake in the outcome, so their assurance carries weight with regulators, customers, and boards. Internal audit is valuable for continuous improvement but reports within the org."
      },
      {
        id: "ar4",
        type: "mc",
        difficulty: 2,
        question: "Synthetic transactions are used in security testing to:",
        options: [
          "Generate fake financial statements",
          "Proactively test system behavior and availability by simulating user activity",
          "Fuzz binary inputs",
          "Replace penetration testing"
        ],
        correct: 1,
        explanation: "Synthetic (scripted) transactions emulate real user actions to verify functionality, performance, and monitoring - catching failures before users do. Contrast with RUM (real user monitoring), which observes actual traffic."
      },
      {
        id: "ar5",
        type: "mc",
        difficulty: 2,
        question: "Code review where the author walks peers through the code, with roles and preparation, is called:",
        options: [
          "Pair programming",
          "A formal inspection (e.g., Fagan inspection)",
          "Fuzzing",
          "Static analysis"
        ],
        correct: 1,
        explanation: "Fagan inspection is the most formal review: planning, overview, preparation, inspection meeting, rework, follow-up, with defined roles (moderator, reader, recorder). Most orgs use lighter-weight reviews, but know the formal end of the spectrum."
      },
      {
        id: "ar6",
        type: "mc",
        difficulty: 2,
        question: "Which metric matters MOST when reviewing an account access review program?",
        options: [
          "Number of accounts created per month",
          "Whether access rights match current job responsibilities (least privilege validation)",
          "Password length distribution",
          "Login success rate"
        ],
        correct: 1,
        explanation: "The point of access reviews (recertification) is confirming that each user's CURRENT access maps to CURRENT duties - catching privilege creep, orphaned accounts, and toxic combinations. Volume metrics don't prove appropriateness."
      },
      {
        id: "ar7",
        type: "boss",
        difficulty: 3,
        question: "Management asks you to 'pass the upcoming audit no matter what' by temporarily tightening controls, then relaxing them after. Your BEST response as a CISSP is:",
        options: [
          "Comply - management owns risk decisions",
          "Refuse and explain that misrepresenting control effectiveness violates ethics and exposes the organization to greater liability",
          "Comply but document your objection privately",
          "Anonymously tip off the auditors"
        ],
        correct: 1,
        explanation: "Gaming an audit is misrepresentation - it violates the ISC2 canons (act honorably, honestly; protect the common good) and creates legal exposure. Advise management honestly of the risk; ethics questions on the exam reward integrity over obedience."
      }
    ]
  },
  {
    id: "pentest-pit",
    name: "Pentest Pit",
    icon: "🕷️",
    description: "Crawl through vulnerability scans, pentests, and log review",
    topic: "D6: Vulnerability Mgmt & Testing",
    unlocked: false,
    enemy: { name: "Scanner Scorpion", icon: "🦂" },
    questions: [
      {
        id: "pt1",
        type: "mc",
        difficulty: 1,
        question: "The KEY difference between a vulnerability scan and a penetration test is that a penetration test:",
        options: [
          "Is fully automated",
          "Actively exploits weaknesses to demonstrate real impact",
          "Only reviews documentation",
          "Never requires authorization"
        ],
        correct: 1,
        explanation: "Scanners identify and report potential weaknesses; pentesters EXPLOIT them to prove access and impact. Both require formal authorization - a pentest without signed rules of engagement is just an attack."
      },
      {
        id: "pt2",
        type: "mc",
        difficulty: 1,
        question: "A penetration test where testers receive zero prior knowledge of the environment is called:",
        options: [
          "White box (crystal box)",
          "Gray box",
          "Black box (zero knowledge)",
          "Blue box"
        ],
        correct: 2,
        explanation: "Black box = no knowledge (simulates external attacker, more realistic, slower). White box = full knowledge (most thorough coverage per hour). Gray box = partial knowledge (simulates insider or informed attacker)."
      },
      {
        id: "pt3",
        type: "mc",
        difficulty: 2,
        question: "A vulnerability scanner reports a critical flaw that turns out not to exist. This is a:",
        options: [
          "False negative",
          "False positive",
          "True negative",
          "Zero day"
        ],
        correct: 1,
        explanation: "False positive = reported but not real (wastes effort). False NEGATIVE = real but not reported - far more dangerous because it breeds false confidence. Tuning and authenticated scans reduce both."
      },
      {
        id: "pt4",
        type: "mc",
        difficulty: 2,
        question: "Authenticated (credentialed) vulnerability scans are preferred over unauthenticated scans because they:",
        options: [
          "Run faster",
          "See inside the host (patch levels, configurations), yielding fewer false positives and deeper findings",
          "Don't require network access",
          "Are invisible to the IDS"
        ],
        correct: 1,
        explanation: "With credentials, the scanner reads actual installed versions and configs instead of inferring from banners - more accurate, more complete. Use dedicated scan accounts with least privilege and vaulted credentials."
      },
      {
        id: "pt5",
        type: "mc",
        difficulty: 2,
        question: "During a pentest, the tester finds evidence of an ACTIVE, unrelated criminal compromise. The correct action is to:",
        options: [
          "Exploit it further to map the attacker",
          "Stop and immediately notify the client per the rules of engagement",
          "Remove the attacker's malware",
          "Finish the test first, then mention it in the report"
        ],
        correct: 1,
        explanation: "Rules of engagement standard practice: an active breach discovery halts testing and triggers immediate client notification, so incident response can begin and evidence is preserved. The tester must not tamper with a crime scene."
      },
      {
        id: "pt6",
        type: "mc",
        difficulty: 2,
        question: "NIST-style penetration test phases in correct order are:",
        options: [
          "Attack, planning, discovery, reporting",
          "Planning, discovery, attack, reporting",
          "Discovery, reporting, attack, planning",
          "Reporting, planning, attack, discovery"
        ],
        correct: 1,
        explanation: "Planning (scope, RoE, authorization) -> Discovery (recon, scanning, enumeration) -> Attack (gain access, escalate, pivot) -> Reporting (findings, evidence, remediation guidance). Order questions are free points - memorize the sequences."
      },
      {
        id: "pt7",
        type: "boss",
        difficulty: 3,
        question: "Your quarterly scans keep flagging the same critical vulnerabilities on the same servers. Patches exist. The ROOT problem is most likely:",
        options: [
          "The scanner needs replacement",
          "A broken vulnerability MANAGEMENT process - no ownership, SLAs, or remediation tracking",
          "Too many false positives",
          "Insufficient scan frequency"
        ],
        correct: 1,
        explanation: "Scanning is detection; MANAGEMENT is assigning owners, prioritizing by risk, tracking remediation to SLA, and verifying closure. Recurring known-fixable criticals indicate the process after the scan is broken - think program, not tool."
      }
    ]
  },
  {
    id: "soc-swamp",
    name: "SOC Swamp",
    icon: "🐊",
    description: "Wade through incident response, SIEM, and security operations",
    topic: "D7: Incident Response & Monitoring",
    unlocked: false,
    enemy: { name: "Incident Imp", icon: "👺" },
    questions: [
      {
        id: "ss1",
        type: "mc",
        difficulty: 1,
        question: "Place these incident response steps in correct order:",
        options: [
          "Detection, Response, Mitigation, Reporting, Recovery, Remediation, Lessons Learned",
          "Response, Detection, Recovery, Mitigation, Reporting, Lessons Learned, Remediation",
          "Detection, Mitigation, Response, Recovery, Reporting, Remediation, Lessons Learned",
          "Mitigation, Detection, Response, Reporting, Remediation, Recovery, Lessons Learned"
        ],
        correct: 0,
        explanation: "The CISSP sequence: Detection -> Response -> Mitigation (contain) -> Reporting -> Recovery (restore) -> Remediation (fix root cause) -> Lessons Learned. Mnemonic: 'DR. MR. RRL'. NIST condenses to Preparation, Detection & Analysis, Containment/Eradication/Recovery, Post-Incident."
      },
      {
        id: "ss2",
        type: "mc",
        difficulty: 2,
        question: "During containment of a compromised server, why might you isolate it from the network rather than power it off?",
        options: [
          "Powering off is too slow",
          "Volatile memory evidence (running processes, connections, keys) is lost on power-off",
          "Isolation is cheaper",
          "The attacker might notice a shutdown"
        ],
        correct: 1,
        explanation: "RAM holds critical forensic evidence - live connections, injected code, encryption keys - destroyed by power-off. Isolate, capture volatile data in order of volatility (registers/cache -> RAM -> disk -> archival), then decide next steps."
      },
      {
        id: "ss3",
        type: "mc",
        difficulty: 1,
        question: "A SIEM's PRIMARY function is to:",
        options: [
          "Block attacks at the perimeter",
          "Aggregate, correlate, and alert on log/event data from across the environment",
          "Encrypt log files",
          "Replace antivirus"
        ],
        correct: 1,
        explanation: "SIEM = centralized collection + normalization + CORRELATION of events (e.g., failed logins across 5 systems + a success = alert), plus retention for investigations and compliance. SOAR adds automated response playbooks on top."
      },
      {
        id: "ss4",
        type: "mc",
        difficulty: 2,
        question: "An IPS differs from an IDS because an IPS:",
        options: [
          "Only generates better reports",
          "Sits inline and can actively block malicious traffic",
          "Cannot use signatures",
          "Works only on endpoints"
        ],
        correct: 1,
        explanation: "IDS = detect and alert (out-of-band, passive). IPS = inline, can drop/block in real time - but a false positive now blocks LEGITIMATE traffic, so tuning matters. Detection methods for both: signature-based and anomaly/behavior-based."
      },
      {
        id: "ss5",
        type: "mc",
        difficulty: 2,
        question: "Egress monitoring is important because it can detect:",
        options: [
          "Inbound port scans",
          "Data exfiltration and command-and-control beaconing from inside your network",
          "Physical tailgating",
          "Password reuse"
        ],
        correct: 1,
        explanation: "Watching OUTBOUND traffic catches what perimeter-focused defense misses: compromised hosts phoning home, DNS tunneling, large unusual transfers. Assume breach - the interesting traffic is often leaving, not arriving."
      },
      {
        id: "ss6",
        type: "mc",
        difficulty: 1,
        question: "Which control type is a honeypot?",
        options: [
          "Corrective",
          "Detective (and deterrent/research)",
          "Recovery",
          "Compensating"
        ],
        correct: 1,
        explanation: "A honeypot is a decoy that DETECTS attacker activity (any touch is suspicious by definition) and gathers intelligence. Legal note: it must entice, not ENTRAP - never induce someone to commit a crime they wouldn't otherwise commit."
      },
      {
        id: "ss7",
        type: "boss",
        difficulty: 3,
        question: "At 2 AM, ransomware is actively encrypting a file server. As incident commander, your FIRST action is:",
        options: [
          "Begin restoring from backups immediately",
          "Contain - isolate affected systems to stop the spread",
          "Email all staff about the incident",
          "Wipe and reimage the file server"
        ],
        correct: 1,
        explanation: "Active spread means CONTAINMENT first - isolate infected hosts/segments to limit damage. Recovery (backups) comes after containment and eradication; restoring into an active infection just re-encrypts your restores. Classic 'what do you do FIRST' pattern: stop the bleeding."
      }
    ]
  },
  {
    id: "disaster-domain",
    name: "Disaster Domain",
    icon: "🌪️",
    description: "Survive BCP/DR: RTO, RPO, backups, sites, and forensics",
    topic: "D7: BCP/DR & Forensics",
    unlocked: false,
    enemy: { name: "Downtime Demon", icon: "😈" },
    questions: [
      {
        id: "dm1",
        type: "mc",
        difficulty: 1,
        question: "RPO (Recovery Point Objective) defines:",
        options: [
          "How quickly systems must be restored",
          "The maximum tolerable DATA LOSS, measured in time (how old restored data may be)",
          "The maximum total downtime before the business fails",
          "The cost of recovery"
        ],
        correct: 1,
        explanation: "RPO = data loss tolerance (drives backup frequency: RPO of 1 hour means backups/replication at least hourly). RTO = how fast you must restore service. MTD/MAE = maximum tolerable downtime; RTO must be less than MTD."
      },
      {
        id: "dm2",
        type: "mc",
        difficulty: 2,
        question: "Which recovery site provides the FASTEST failover?",
        options: [
          "Cold site",
          "Warm site",
          "Hot site",
          "Reciprocal agreement"
        ],
        correct: 2,
        explanation: "Hot site: fully equipped, near-real-time data, hours to fail over - most expensive. Warm: equipment but stale data, days. Cold: empty space with power/HVAC, weeks - cheapest. Match site choice to RTO and budget, not prestige."
      },
      {
        id: "dm3",
        type: "mc",
        difficulty: 2,
        question: "Which backup strategy uses the LEAST daily backup time but the LONGEST restore chain?",
        options: [
          "Full daily",
          "Full weekly + differential daily",
          "Full weekly + incremental daily",
          "Mirrored storage"
        ],
        correct: 2,
        explanation: "INCREMENTAL backs up only changes since the last backup of ANY type (fast, small) but restore needs the full PLUS every incremental since. DIFFERENTIAL captures all changes since the last FULL (grows daily, restore = full + latest differential only)."
      },
      {
        id: "dm4",
        type: "mc",
        difficulty: 2,
        question: "Which DR test type actually fails over production processing to the recovery site?",
        options: [
          "Tabletop exercise",
          "Structured walkthrough",
          "Parallel test",
          "Full interruption test"
        ],
        correct: 3,
        explanation: "Order of increasing risk/realism: checklist review -> tabletop/walkthrough -> simulation -> parallel test (recovery site processes alongside production) -> FULL INTERRUPTION (production actually stops - highest confidence, highest risk, needs executive approval)."
      },
      {
        id: "dm5",
        type: "mc",
        difficulty: 1,
        question: "RAID 5 provides fault tolerance through:",
        options: [
          "Mirroring all data to a second disk",
          "Striping with distributed parity - survives one disk failure",
          "Striping with no redundancy",
          "Two independent parity blocks"
        ],
        correct: 1,
        explanation: "RAID 0 = striping only (no fault tolerance). RAID 1 = mirroring. RAID 5 = striping + single distributed parity (survives 1 disk, minimum 3 disks). RAID 6 = dual parity (survives 2). RAID 10 = mirror + stripe."
      },
      {
        id: "dm6",
        type: "mc",
        difficulty: 2,
        question: "Chain of custody documentation exists PRIMARILY to:",
        options: [
          "Speed up incident response",
          "Prove evidence integrity - who collected, handled, and stored it, unbroken from seizure to court",
          "Assign blame to attackers",
          "Satisfy backup retention rules"
        ],
        correct: 1,
        explanation: "Without an unbroken, documented chain of custody, evidence is challengeable and often inadmissible. Record every transfer: who, what, when, where, why. Work on forensic COPIES (verified by hash), never originals."
      },
      {
        id: "dm7",
        type: "boss",
        difficulty: 3,
        question: "The business says a payment system's MTD is 4 hours and acceptable data loss is 15 minutes. Nightly backups to a warm site restore in 8 hours. What is your assessment?",
        options: [
          "The plan is adequate",
          "Both RTO and RPO are violated - you need faster recovery (hot site/HA) and near-continuous replication",
          "Only the RPO is fine",
          "MTD is irrelevant to backup design"
        ],
        correct: 1,
        explanation: "Required: RTO < 4 hrs, RPO <= 15 min. Actual: restore takes 8 hrs (RTO fail) and nightly backups risk up to 24 hrs of loss (RPO fail). Recommend hot standby/clustering plus synchronous or near-real-time replication - and present the cost to management for a risk decision."
      }
    ]
  },
  {
    id: "code-caverns",
    name: "Code Caverns",
    icon: "⛏️",
    description: "Mine the SDLC, DevSecOps, and secure coding practices",
    topic: "D8: SDLC & DevSecOps",
    unlocked: false,
    enemy: { name: "Bug Behemoth", icon: "🪲" },
    questions: [
      {
        id: "cc1",
        type: "mc",
        difficulty: 1,
        question: "When is it CHEAPEST and most effective to address security in software development?",
        options: [
          "During penetration testing before release",
          "As early as possible - requirements and design phases",
          "After deployment via patches",
          "During code review only"
        ],
        correct: 1,
        explanation: "Shift left: a flaw fixed at requirements/design costs a fraction of one fixed in production. Security must be baked into the SDLC (requirements, threat modeling at design, secure coding, testing gates), not bolted on."
      },
      {
        id: "cc2",
        type: "mc",
        difficulty: 2,
        question: "Static application security testing (SAST) differs from dynamic testing (DAST) because SAST:",
        options: [
          "Tests the running application from outside",
          "Analyzes source code or binaries WITHOUT executing the program",
          "Requires production deployment",
          "Only works on web applications"
        ],
        correct: 1,
        explanation: "SAST = white-box analysis of code at rest (early in pipeline, finds flaws by line number, more false positives). DAST = black-box testing of the RUNNING app (finds runtime/config issues, no code needed). Use both; IAST/RASP blend them."
      },
      {
        id: "cc3",
        type: "mc",
        difficulty: 2,
        question: "In DevSecOps, security gates in the CI/CD pipeline should:",
        options: [
          "Require manual security sign-off for every commit",
          "Automate security testing (SAST, SCA, secrets scanning) so security keeps pace with delivery",
          "Run only before annual releases",
          "Be owned exclusively by the security team"
        ],
        correct: 1,
        explanation: "DevSecOps automates security INTO the pipeline - scanning code, dependencies (SCA for supply chain), containers, and secrets on every build. Manual bottlenecks get bypassed; automated guardrails scale. Security becomes everyone's job."
      },
      {
        id: "cc4",
        type: "mc",
        difficulty: 1,
        question: "Software configuration management and change control exist PRIMARILY to:",
        options: [
          "Slow down releases",
          "Ensure changes are authorized, tested, documented, and reversible",
          "Eliminate all bugs",
          "Track developer productivity"
        ],
        correct: 1,
        explanation: "Change management: request -> review/approve (CAB) -> test -> implement with a ROLLBACK plan -> document. Unauthorized change is how outages and breaches sneak in; auditability and reversibility are the point."
      },
      {
        id: "cc5",
        type: "mc",
        difficulty: 2,
        question: "A Software Bill of Materials (SBOM) helps manage which risk?",
        options: [
          "Insider threat",
          "Supply chain risk - knowing which third-party/open-source components (and vulnerabilities) are inside your software",
          "Physical theft of servers",
          "Social engineering"
        ],
        correct: 1,
        explanation: "An SBOM inventories every component in a build. When the next Log4j-style flaw drops, orgs with SBOMs know in minutes whether and where they're exposed. Software composition analysis (SCA) tooling generates and checks them."
      },
      {
        id: "cc6",
        type: "mc",
        difficulty: 2,
        question: "Fuzzing tests software by:",
        options: [
          "Reviewing code line by line",
          "Feeding malformed, unexpected, or random inputs to provoke crashes and undefined behavior",
          "Simulating user load",
          "Comparing code against style guides"
        ],
        correct: 1,
        explanation: "Fuzzers hammer inputs (mutation-based or generation-based/smart) to expose memory corruption, crashes, and input-validation failures that structured tests miss. Great for parsers, protocols, and file formats."
      },
      {
        id: "cc7",
        type: "boss",
        difficulty: 3,
        question: "Developers need production-like data for testing. Handing them a copy of the production customer database is wrong because:",
        options: [
          "Test environments are too small",
          "It exposes real PII to lower-security environments - use masked, tokenized, or synthetic data instead",
          "Developers can't be trusted",
          "Production data is too large to copy"
        ],
        correct: 1,
        explanation: "Test/dev environments have weaker controls and broader access - real PII there is a breach waiting to happen (and a privacy violation). Data masking, tokenization, or synthetic generation preserves realism without exposure. Least privilege applies to DATA, not just accounts."
      }
    ]
  },
  {
    id: "injection-junction",
    name: "Injection Junction",
    icon: "💉",
    description: "Fight off OWASP attacks, malware, and database threats",
    topic: "D8: Web Attacks & Malware",
    unlocked: false,
    enemy: { name: "SQL Serpent", icon: "🐍" },
    questions: [
      {
        id: "ij1",
        type: "mc",
        difficulty: 1,
        question: "The PRIMARY defense against SQL injection is:",
        options: [
          "Encrypting the database",
          "Parameterized queries (prepared statements) and input validation",
          "A stronger database password",
          "Hiding error messages"
        ],
        correct: 1,
        explanation: "Parameterized queries separate CODE from DATA - user input can never be executed as SQL. Add input validation (allowlists), least-privilege DB accounts, and stored procedures. Hiding errors helps but stops nothing."
      },
      {
        id: "ij2",
        type: "mc",
        difficulty: 2,
        question: "Stored XSS differs from reflected XSS because stored XSS:",
        options: [
          "Only affects the attacker's own session",
          "Persists the malicious script on the server (e.g., in a comment), attacking every visitor",
          "Requires no JavaScript",
          "Cannot steal cookies"
        ],
        correct: 1,
        explanation: "Reflected XSS bounces the payload off a request (victim must click a crafted link). STORED XSS lives in the application's data and fires for everyone who views it - higher impact. Defenses: output encoding, input validation, Content Security Policy, HttpOnly cookies."
      },
      {
        id: "ij3",
        type: "mc",
        difficulty: 2,
        question: "CSRF (cross-site request forgery) attacks work because:",
        options: [
          "The attacker cracks the session cookie",
          "The browser automatically sends the victim's session credentials with forged requests to a site where they're logged in",
          "TLS is not used",
          "The server has weak passwords"
        ],
        correct: 1,
        explanation: "CSRF rides the victim's EXISTING authenticated session - a hidden request from an evil page carries their cookies automatically. Defenses: anti-CSRF tokens, SameSite cookies, re-authentication for sensitive actions. XSS steals trust in a site; CSRF exploits a site's trust in the browser."
      },
      {
        id: "ij4",
        type: "mc",
        difficulty: 2,
        question: "Malware that encrypts its own body differently with each infection to evade signature detection is called:",
        options: [
          "A logic bomb",
          "Polymorphic malware",
          "A worm",
          "Adware"
        ],
        correct: 1,
        explanation: "Polymorphic malware mutates its signature each generation (metamorphic goes further, rewriting its code). This defeats pure signature AV - hence heuristic/behavioral detection and EDR. A logic bomb triggers on a condition; a worm self-propagates."
      },
      {
        id: "ij5",
        type: "mc",
        difficulty: 1,
        question: "What distinguishes a worm from a virus?",
        options: [
          "Worms are always less harmful",
          "Worms self-propagate across networks without a host file or user action",
          "Viruses only infect Linux",
          "Worms require email attachments"
        ],
        correct: 1,
        explanation: "A VIRUS attaches to a host file/program and needs user action to spread; a WORM spreads autonomously by exploiting network services (Morris, SQL Slammer, WannaCry). Worms create the fastest, widest outbreaks."
      },
      {
        id: "ij6",
        type: "mc",
        difficulty: 2,
        question: "In databases, inference attacks involve:",
        options: [
          "Injecting SQL through forms",
          "Deducing sensitive information by combining multiple pieces of authorized, less-sensitive data",
          "Brute-forcing table names",
          "Deleting audit logs"
        ],
        correct: 1,
        explanation: "Inference = deriving secrets from legitimate queries (e.g., salary of one person from department aggregates). AGGREGATION is the related problem where combined data is more sensitive than its parts. Defenses: polyinstantiation, query restrictions, noise/partitioning."
      },
      {
        id: "ij7",
        type: "boss",
        difficulty: 3,
        question: "A web app builds SQL from user input, and the dev proposes fixing it by blocking the words 'SELECT' and 'DROP' at the WAF. As the security advisor, you should say:",
        options: [
          "Approve - blocklists are industry standard",
          "Reject as the primary fix - blocklists are bypassable; require parameterized queries in the code, with the WAF as defense in depth only",
          "Approve if 'UNION' is also blocked",
          "Move the database behind a second firewall instead"
        ],
        correct: 1,
        explanation: "Blocklist filtering is trivially bypassed (encoding, case tricks, synonyms like sElEcT or char()). The root cause is code mixing data with commands - only parameterization fixes that. A WAF is a compensating layer, never the primary control. Fix causes, not symptoms."
      }
    ]
  }
];
