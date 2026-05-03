"""
Portfolio Data Store
All portfolio content served by the FastAPI backend.
"""

PROFILE = {
    "name": "Praveen Kumar Byrisetty",
    "role": "SOC Analyst · Blue Team Engineer · Security Builder",
    "tagline": "I don't just study security — I build it. From tamper-evident logging systems to deception-based honeypots, I create the tools that defenders need. Every project here is proof of skill, not just a line on a résumé.",
    "badge": "Open to SOC Analyst Roles",
    "avatar": "/assets/profile-avatar.png",
    "bio": [
        {
            "text": "I got into cybersecurity the way most curious minds do — by asking **\"what if someone breaks this?\"** What started as a fascination with how systems fail turned into a mission to make them resilient. I tore apart network packets before I could configure a firewall, and I was building detection logic before I knew what a SOC was.",
            "highlights": []
        },
        {
            "text": "Today, I build the tools that defenders actually need. My Tamper-Evident Logging System uses cryptographic hash chains to catch integrity violations in real-time. My Deception-Based Honeypot lures attackers into revealing their tactics. My Zero-Knowledge Password Manager ensures even the server never sees a plaintext credential. And my research into Quantum-Safe Federated Learning explores how we'll defend systems when today's encryption is obsolete.",
            "highlights": ["Tamper-Evident Logging System", "Deception-Based Honeypot", "Zero-Knowledge Password Manager", "Quantum-Safe Federated Learning"]
        },
        {
            "text": "I'm pursuing a career as a **SOC Analyst** because I believe the best defense starts with visibility — *if you can see it, you can stop it.* I don't chase certifications. I chase problems, build solutions, and document everything so others can learn from my process.",
            "highlights": []
        }
    ],
    "focus_areas": [
        {"icon": "", "label": "Threat Detection"},
        {"icon": "", "label": "Log Analysis"},
        {"icon": "", "label": "Deception Tech"},
        {"icon": "", "label": "Cryptographic Integrity"},
        {"icon": "", "label": "Blue Team Defense"}
    ],
    "stats": [
        {"number": 7, "label": "Security Projects"},
        {"number": 3, "label": "Domains Covered"},
        {"number": 10, "label": "Tools Mastered"}
    ],
    "socials": {
        "github": "https://github.com/praveenbyrisetty",
        "linkedin": "https://www.linkedin.com/in/praveen-kumar-byrisetty-95a592293/",
        "tryhackme": "https://tryhackme.com/p/Prav33n",
        "email": "praveen@example.com"
    },
    "hacker_avatar": "/assets/hacker_avatar.png",
    "hacker_role": "Red Team Operator · Threat Emulator · Exploit Developer",
    "hacker_tagline": "SYSTEM COMPROMISED. I don't just defend systems — I break them to understand how to protect them. My daily routine involves exploiting vulnerabilities, pivoting through networks, and thinking like an adversary.",
    "hacker_bio": [
        {
            "text": "Every system has a flaw. It's just a matter of finding it. My days are spent exploring the darker side of network architectures — **\"how can I bypass this?\"** I write custom exploits, chain vulnerabilities, and emulate advanced persistent threats (APTs) to test defenses to their breaking point.",
            "highlights": []
        },
        {
            "text": "My arsenal includes custom payloads, reverse-engineered malware, and covert C2 channels. I don't rely on automated scanners; I dig into the memory, analyze the binaries, and craft targeted attacks. Whether it's an unpatched service or a misconfigured Active Directory, I find the path of least resistance.",
            "highlights": ["custom payloads", "reverse-engineered malware", "covert C2 channels"]
        },
        {
            "text": "I operate in the shadows because understanding the **Offense** is the only way to build an unbreakable **Defense**. I document my campaigns, dissect my own attacks, and turn my offensive insights into robust security engineering solutions.",
            "highlights": []
        }
    ],
    "hacker_focus_areas": [
        {"icon": "", "label": "Exploit Dev"},
        {"icon": "", "label": "Red Teaming"},
        {"icon": "", "label": "Injection"},
        {"icon": "", "label": "Recon"},
        {"icon": "", "label": "Adversary Emulation"}
    ]
}

PROJECTS = [
    {
        "id": "tamper-logging",
        "icon": "",
        "domain": "Blue Team · Log Integrity",
        "title": "Tamper-Evident Logging System",
        "description": "A cryptographic hash-chain logging system that detects tampering in real-time. Built an interactive React dashboard that visualizes chain integrity — simulating alteration, deletion, and reordering attacks to prove detection capabilities.",
        "tech": ["Python", "SHA-256", "React", "Hash Chains", "Flask"],
        "github": "https://github.com/praveenbyrisetty/crypto_log",
        "language": "CSS",
        "stars": 1,
        "case_study": {
            "problem": "Organizations rely on log files for forensic investigations, compliance, and incident response — but logs stored in plaintext can be silently altered by malicious insiders or attackers who gain elevated access. Without integrity verification, tampered logs make investigations unreliable.",
            "tools": "Built a Python logging engine using SHA-256 hash chaining — each log entry's hash incorporates the previous entry's hash, creating a cryptographic dependency chain. Developed a React-based dashboard for real-time chain visualization and a Flask API layer.",
            "process": "Implemented three tamper simulation modes: content alteration (modifying a log entry's message), deletion (removing an entry from the chain), and reordering (swapping entry positions). Each simulation triggers chain re-validation to show exactly where and how the integrity breaks.",
            "findings": "Any single-bit change in any log entry cascades a verification failure across all subsequent entries in the chain. The system achieves 100% detection rate for all three tamper types with visual diff comparison in the dashboard.",
            "results": "Delivered a fully interactive demo with before/after chain visualization. Key learning: cryptographic integrity alone isn't enough — usability of the verification interface determines whether responders can act on tamper alerts in time."
        }
    },
    {
        "id": "honeypot",
        "icon": "",
        "domain": "Deception Tech · Threat Intel",
        "title": "Deception-Based Honeypot",
        "description": "A Flask-based deception system featuring fake login portals, dummy API endpoints, and canary files. Captures attacker behavior patterns and visualizes all unauthorized interactions through a real-time alert dashboard.",
        "tech": ["Python", "Flask", "SQLite", "Chart.js", "Logging"],
        "github": "https://github.com/praveenbyrisetty/deception-honeypot",
        "language": "CSS",
        "stars": 1,
        "case_study": {
            "problem": "Traditional perimeter defenses are reactive — they wait for attacks to hit known signatures. Organizations need proactive intelligence on attacker behavior, techniques, and entry points before real systems are compromised.",
            "tools": "Deployed a Flask application simulating a realistic corporate environment: login pages with credential harvesting detection, dummy REST APIs that log all interaction payloads, and hidden \"canary\" files that trigger alerts upon access.",
            "process": "Implemented comprehensive request logging capturing IP addresses, user agents, request paths, timestamps, and submitted payloads. Built classification logic to categorize interactions (scanning, brute force, manual exploration) and an analytics dashboard with Chart.js.",
            "findings": "Discovered distinct attacker behavioral patterns: automated scanners hit API endpoints in predictable sequences, credential stuffing attempts follow username/password dictionary patterns, and canary file access correlates strongly with directory traversal attempts.",
            "results": "Complete alert dashboard with real-time suspicious activity visualization. Key insight: honeypots are most valuable not for catching attackers, but for understanding attacker methodology to improve real system defenses."
        }
    },
    {
        "id": "password-manager",
        "icon": "",
        "domain": "AppSec · Zero-Knowledge",
        "title": "Zero-Knowledge Password Manager",
        "description": "A full-stack password manager with client-side encryption — the server never sees plaintext credentials. Features AI-powered security intelligence, password strength analytics, and breach monitoring.",
        "tech": ["React", "Node.js", "PostgreSQL", "AES-256", "AI Panel"],
        "github": "",
        "language": "JavaScript",
        "stars": 0,
        "case_study": {
            "problem": "Most password managers require users to trust a third-party server with their credentials. Even with server-side encryption, a database breach or rogue employee could expose secrets. Users need a zero-knowledge architecture where the server is mathematically unable to access plaintext data.",
            "tools": "Built with React frontend, Node.js/Express backend, and PostgreSQL database. Implemented client-side AES-256-GCM encryption with a master key derived from the user's password via PBKDF2 — all encryption/decryption happens in the browser before data touches the network.",
            "process": "Designed the API to only receive and store encrypted blobs. Added password strength analysis with entropy scoring, reuse detection, and breach database cross-referencing. Integrated a privacy-focused AI intelligence panel that operates on client-side data without exposing credentials to any ML model.",
            "findings": "The zero-knowledge model adds approximately 15ms of overhead per encrypt/decrypt operation in-browser — negligible for UX. The AI panel successfully generates contextual security recommendations without any server-side access to plaintext credentials, proving AI and privacy can coexist.",
            "results": "Production-ready application with full authentication flow, vault management, and analytics dashboard. Key lesson: zero-knowledge design requires rethinking every feature — if the server can't read the data, every search, sort, and analytics query must be client-side, fundamentally changing system architecture."
        }
    },
    {
        "id": "quantum-flqc",
        "icon": "",
        "domain": "Research · Quantum Security",
        "title": "Quantum-Safe Federated Learning (FLQC)",
        "description": "A 3-layer security architecture applying quantum E91 key distribution to federated learning for healthcare data. Proves that privacy-preserving ML training is possible even against quantum-era adversaries.",
        "tech": ["Python", "Flower FL", "E91 Protocol", "Streamlit", "Differential Privacy"],
        "github": "https://github.com/praveenbyrisetty/Quantum-Secured-Federated-Learning",
        "language": "Python",
        "stars": 1,
        "case_study": {
            "problem": "Healthcare organizations need to train machine learning models on distributed patient data without centralizing sensitive information. Current approaches rely on classical encryption that will become vulnerable to quantum computing attacks within the next decade.",
            "tools": "Implemented a 3-layer security architecture: E91 quantum key distribution at the Communication Layer, secure aggregation at the Aggregation Layer, and differential privacy at the Endpoint Layer. Used the Flower federated learning framework with HAM10000 dermatological image dataset.",
            "process": "Simulated the E91 quantum entanglement protocol for key exchange, applied noise-based differential privacy to local model updates, and implemented secure multi-party aggregation for global model computation. Built an interactive Streamlit demo UI with architecture visualizations.",
            "findings": "The quantum-secured model maintained comparable accuracy to unsecured baselines while providing theoretical information-theoretic security guarantees. Differential privacy introduced a controlled accuracy-privacy tradeoff that proved manageable for the healthcare use case.",
            "results": "Complete demonstration of quantum-resistant federated learning with interactive visualization. Key insight: post-quantum security isn't just an encryption upgrade — it requires rethinking the entire communication trust model from the ground up."
        }
    },
    {
        "id": "qkd-bb84",
        "icon": "",
        "domain": "Quantum · Cryptography",
        "title": "QKD BB84 Protocol Simulator",
        "description": "An interactive full-stack simulator of the BB84 Quantum Key Distribution protocol. Features real-time qubit visualization, eavesdropper (Eve) detection, Cascade error correction, and hybrid AES-256 encrypted messaging.",
        "tech": ["JavaScript", "React", "Flask", "Qiskit", "AES-256"],
        "github": "https://github.com/praveenbyrisetty/QKD-BB84-protocol-simulator",
        "language": "JavaScript",
        "stars": 1,
        "case_study": {
            "problem": "Quantum computing threatens to break current cryptographic key exchange methods like RSA and Diffie-Hellman. Understanding how quantum key distribution works is critical for future security professionals, but existing educational tools are either too abstract or too complex.",
            "tools": "Built a full-stack React + Flask simulator with Qiskit for quantum circuit simulation. Implemented the complete BB84 protocol flow: qubit preparation, basis selection, sifting, error detection, and privacy amplification.",
            "process": "Designed an interactive step-by-step walkthrough where users can watch Alice prepare qubits, Bob measure them, and see how an eavesdropper (Eve) introduces detectable errors. Added Cascade error correction and hybrid AES-256 encrypted messaging as the final secure communication layer.",
            "findings": "The simulator accurately demonstrates the no-cloning theorem — any eavesdropping introduces a measurable error rate above 25% in the sifted key bits, triggering automatic abort. Users can visually see why quantum cryptography provides unconditional security.",
            "results": "Deployed a complete educational tool that makes quantum cryptography accessible. Key learning: bridging the gap between quantum physics and practical security requires interactive visualization, not just mathematical proofs."
        }
    },
    {
        "id": "credential-ledger",
        "icon": "",
        "domain": "Blockchain · Identity",
        "title": "Immutable Credential Ledger",
        "description": "A tamper-proof decentralized application (dApp) for issuing and verifying academic certificates, ensuring data integrity via cryptographic hashing on Ethereum. Eliminates certificate forgery with on-chain verification.",
        "tech": ["Solidity", "Ethereum", "React", "Web3.js", "Hardhat"],
        "github": "https://github.com/praveenbyrisetty/Immutable-Credential-Ledger",
        "language": "JavaScript",
        "stars": 1,
        "case_study": {
            "problem": "Academic certificate forgery is a widespread problem — fake degrees undermine trust in credentials. Traditional verification requires contacting issuing institutions, which is slow, unreliable, and easily circumvented.",
            "tools": "Built an Ethereum-based dApp using Solidity smart contracts for certificate issuance and verification. React frontend with Web3.js for wallet integration and on-chain transaction management.",
            "process": "Designed smart contracts that store cryptographic hashes of certificates on the Ethereum blockchain. Institutions issue certificates through the dApp, and anyone can verify authenticity by comparing the hash against the on-chain record — no intermediaries required.",
            "findings": "On-chain verification provides instant, tamper-proof validation. The immutability of blockchain makes it impossible to alter or forge certificates after issuance. Gas costs for certificate issuance are manageable for institutional use cases.",
            "results": "Complete end-to-end solution from certificate issuance to public verification. Key insight: blockchain's greatest security value isn't in cryptocurrency — it's in creating immutable audit trails for critical data."
        }
    },
    {
        "id": "qubit-entanglement",
        "icon": "",
        "domain": "Quantum · Education",
        "title": "2-Qubit Entanglement Demo",
        "description": "A virtual Quantum Lab demonstrating superposition and entanglement using real quantum backend logic. Interactive visualization of Bell states, quantum measurements, and the spooky action at a distance phenomenon.",
        "tech": ["React", "Python", "Qiskit", "Flask", "CSS"],
        "github": "https://github.com/praveenbyrisetty/2-qubit-entanglement-demo",
        "language": "CSS",
        "stars": 1,
        "case_study": {
            "problem": "Quantum computing concepts like superposition and entanglement are notoriously hard to visualize. Students and professionals struggle to build intuition because existing resources are either purely mathematical or use static diagrams that fail to capture the dynamic nature of quantum states.",
            "tools": "Built a React frontend with Qiskit-powered Flask backend for real quantum circuit simulation. Designed interactive visualizations for Bloch sphere representations, Bell state preparations, and measurement collapse.",
            "process": "Created a step-by-step guided experience: users start with single-qubit superposition, learn measurement collapse, then progress to 2-qubit entanglement. Each step shows the quantum circuit, state vector, and measurement probabilities in real time.",
            "findings": "Interactive visualization dramatically improves understanding of quantum concepts. Users can see how entangled qubits produce correlated measurement results regardless of the order of measurement, building genuine intuition for non-classical correlations.",
            "results": "A complete educational tool that makes quantum entanglement tangible. Key learning: the best way to teach quantum mechanics is not through equations but through interactive experimentation where users can modify circuits and see immediate results."
        }
    }
]

SKILLS = [
    {
        "id": "log-analysis",
        "title": "Log Analysis & SIEM",
        "icon": "file-text",
        "items": [
            {"name": "Log Parsing & Correlation", "level": 90},
            {"name": "Hash Chain Verification", "level": 95},
            {"name": "Alert Triage & Response", "level": 80}
        ]
    },
    {
        "id": "threat-detection",
        "title": "Threat Detection",
        "icon": "shield",
        "items": [
            {"name": "Deception Engineering", "level": 90},
            {"name": "Behavioral Analysis", "level": 85},
            {"name": "Anomaly Detection", "level": 80}
        ]
    },
    {
        "id": "cryptography",
        "title": "Cryptography",
        "icon": "lock",
        "items": [
            {"name": "Symmetric Encryption", "level": 85},
            {"name": "Hash Functions & Integrity", "level": 95},
            {"name": "Quantum Key Distribution", "level": 75}
        ]
    },
    {
        "id": "development",
        "title": "Development",
        "icon": "code",
        "items": [
            {"name": "Python Scripting", "level": 92},
            {"name": "React & Node.js", "level": 85},
            {"name": "REST API Design", "level": 88}
        ]
    },
    {
        "id": "networking",
        "title": "Networking & Defense",
        "icon": "globe",
        "items": [
            {"name": "Network Monitoring", "level": 82},
            {"name": "Honeypot Deployment", "level": 90},
            {"name": "Traffic Analysis", "level": 78}
        ]
    },
    {
        "id": "architecture",
        "title": "Architecture & Research",
        "icon": "box",
        "items": [
            {"name": "Zero-Knowledge Design", "level": 85},
            {"name": "Federated Learning", "level": 78},
            {"name": "Security Documentation", "level": 90}
        ]
    }
]

TOOLS = [
    "Python", "React", "Node.js", "Flask", "PostgreSQL",
    "Wireshark", "Git & GitHub", "Linux CLI", "Streamlit",
    "Chart.js", "SQLite", "SHA-256 / AES", "REST APIs",
    "Flower FL", "VS Code"
]

SKILL_MATRIX = [
    {"subject": "Log Analysis & SIEM", "score": 95, "fullMark": 100},
    {"subject": "Network Security", "score": 90, "fullMark": 100},
    {"subject": "Threat Deception", "score": 85, "fullMark": 100},
    {"subject": "Cryptography", "score": 88, "fullMark": 100},
    {"subject": "Web Security", "score": 80, "fullMark": 100},
    {"subject": "Python Development", "score": 92, "fullMark": 100}
]

THM_PROFILE = {
    "username": "Prav33n",
    "profile_url": "https://tryhackme.com/p/Prav33n",
    "rank": "Top 20%",
    "level": "0x6 Voyager (Level 45)",
    "completed_rooms": 42,
    "badges": 5,
    "top_badges": [
        "Advent of Cyber 2025", 
        "Networking Nerd", 
        "Webbed", 
        "7 Day Streak"
    ],
    "focus": [
        "Blue Team & SOC (8 rooms)",
        "Networking Fundamentals (8 rooms)",
        "Web & Offensive Security (10 rooms)",
        "Malware & Forensics (6 rooms)",
        "Cloud, AI & Systems (6 rooms)"
    ]
}

LABS = [
    # ── Blue Team ──────────────────────────────────────
    {
        "id": "lab-bt-1",
        "name": "SIEM Log Analysis Challenge",
        "platform": "TryHackMe",
        "category": "Blue Team",
        "difficulty": "Medium",
        "duration": "2 hrs",
        "status": "completed",
        "objective": "Investigate a suspected breach using Splunk SIEM by correlating Windows event logs and network captures.",
        "tools_used": ["Splunk", "Wireshark", "Sysmon"],
        "what_i_did": "Imported log data into Splunk, wrote SPL queries to filter failed logins, and correlated with network traffic to trace lateral movement.",
        "what_i_solved": "Identified the attacker's initial access vector (RDP brute-force), lateral movement path, and the exfiltrated files using timeline correlation.",
        "what_i_learned": "Deepened SPL query skills, learned Sysmon event IDs for process injection detection, and improved log correlation methodology.",
        "tags": ["SIEM", "Splunk", "Incident Response", "Windows"]
    },
    {
        "id": "lab-bt-2",
        "name": "SOC Level 1 Path",
        "platform": "TryHackMe",
        "category": "Blue Team",
        "difficulty": "Easy",
        "duration": "Coming Soon",
        "status": "placeholder",
        "objective": "",
        "tools_used": [],
        "what_i_did": "",
        "what_i_solved": "",
        "what_i_learned": "",
        "tags": []
    },
    # ── Malware & Forensics ────────────────────────────
    {
        "id": "lab-mf-1",
        "name": "Malware Analysis Fundamentals",
        "platform": "TryHackMe",
        "category": "Malware & Forensics",
        "difficulty": "Medium",
        "duration": "Coming Soon",
        "status": "placeholder",
        "objective": "",
        "tools_used": [],
        "what_i_did": "",
        "what_i_solved": "",
        "what_i_learned": "",
        "tags": []
    },
    # ── Threat Detection ───────────────────────────────
    {
        "id": "lab-td-1",
        "name": "Threat Hunting with Sigma",
        "platform": "TryHackMe",
        "category": "Threat Detection",
        "difficulty": "Medium",
        "duration": "Coming Soon",
        "status": "placeholder",
        "objective": "",
        "tools_used": [],
        "what_i_did": "",
        "what_i_solved": "",
        "what_i_learned": "",
        "tags": []
    },
    # ── Network Security ───────────────────────────────
    {
        "id": "lab-ns-1",
        "name": "Network Traffic Analysis",
        "platform": "TryHackMe",
        "category": "Network Security",
        "difficulty": "Easy",
        "duration": "Coming Soon",
        "status": "placeholder",
        "objective": "",
        "tools_used": [],
        "what_i_did": "",
        "what_i_solved": "",
        "what_i_learned": "",
        "tags": []
    },
    # ── Web Security ────────────────────────────────────
    {
        "id": "lab-ws-1",
        "name": "OWASP Top 10",
        "platform": "TryHackMe",
        "category": "Web Security",
        "difficulty": "Easy",
        "duration": "Coming Soon",
        "status": "placeholder",
        "objective": "",
        "tools_used": [],
        "what_i_did": "",
        "what_i_solved": "",
        "what_i_learned": "",
        "tags": []
    },
]

CERTS = [
    {
        "id": "cert-ccep",
        "name": "Certified Cybersecurity Educator Professional (CCEP)",
        "issuer": "CCEP Certification Body",
        "issued": "2025",
        "expires": "No Expiry",
        "status": "earned",
        "badge_color": "#7c3aed",
        "description": "Validates expertise in cybersecurity operations, threat analysis, secure architecture design, and the ability to communicate security concepts effectively.",
        "verify_url": ""
    },
    {
        "id": "cert-advent",
        "name": "Advent of Cyber 2025",
        "issuer": "TryHackMe",
        "issued": "Jan 2026",
        "expires": "No Expiry",
        "status": "earned",
        "badge_color": "#1ece8a",
        "description": "Completed all 24 hands-on cybersecurity challenges covering SIEM, forensics, malware analysis, web security, and defensive security — finishing on the final day of the programme.",
        "verify_url": "https://tryhackme.com/p/Prav33n"
    },
    {
        "id": "cert-tata-forage",
        "name": "Cybersecurity Analyst Job Simulation",
        "issuer": "Tata Group / Forage",
        "issued": "Oct 2025",
        "expires": "No Expiry",
        "status": "earned",
        "badge_color": "#0066b2",
        "description": "Real-world simulation covering Identity & Access Management (IAM) fundamentals, IAM strategy assessment, crafting custom IAM solutions, and platform integration across diverse tech ecosystems.",
        "verify_url": ""
    },
    {
        "id": "cert-cisco",
        "name": "Introduction to Cybersecurity",
        "issuer": "Cisco Networking Academy",
        "issued": "Aug 2025",
        "expires": "No Expiry",
        "status": "earned",
        "badge_color": "#00bceb",
        "description": "Comprehensive foundational course covering cybersecurity threats and attack types, defense strategies, data protection principles, network security, and career pathways in the cybersecurity domain.",
        "verify_url": ""
    },
    {
        "id": "cert-internship",
        "name": "Cyber Security Internship",
        "issuer": "Codec Technologies Pvt. Ltd. (AICTE & ICAC Approved)",
        "issued": "Jan 2026",
        "expires": "No Expiry",
        "status": "earned",
        "badge_color": "#f59e0b",
        "description": "1-month AICTE & ICAC approved internship delivering hands-on exposure to network security, threat analysis, vulnerability assessment, and real-world security practices in a professional environment.",
        "verify_url": ""
    },
]

TIMELINE = [
    {
        "date": "Level 01",
        "title": "The Spark: IT Foundations",
        "description": "Where it all started — mastering TCP/IP networking, OS internals (Linux & Windows), and understanding how systems communicate before learning how to break or defend them."
    },
    {
        "date": "Level 02",
        "title": "First Real Exposure",
        "description": "Completed an AICTE & ICAC approved Cyber Security Internship at Codec Technologies. Got hands-on with security configurations, log analysis, and real-world threat identification."
    },
    {
        "date": "Level 03",
        "title": "Thinking Like an Attacker",
        "description": "Dove into TryHackMe rooms and CTF challenges to understand the attacker mindset. Learned OWASP Top 10, basic exploitation, and why knowing offense is critical to building strong defense."
    },
    {
        "date": "Level 04",
        "title": "Building Secure Systems",
        "description": "Started building real projects — Tamper-Evident Hash Chains, Deception-based Honeypots, Zero-Knowledge Password Vaults, and Quantum-Safe Federated Learning. Proof that I can engineer, not just study."
    },
    {
        "date": "CURRENT",
        "title": "Preparing for SOC Analyst / L1",
        "description": "Currently sharpening skills in SIEM log analysis (Splunk), alert triage, incident response workflows, and network traffic analysis. Actively preparing and applying for SOC Analyst roles."
    },
    {
        "date": "Level 06",
        "title": "→ Detection Engineering",
        "description": "Next goal: transition from monitoring alerts to writing them. Learn to craft custom Sigma/Yara rules, build threat models, and automate Tier-1 SOC workflows with SOAR platforms."
    },
    {
        "date": "Level 07",
        "title": "→ Proactive Threat Hunting",
        "description": "Operate under the assumption of breach. Proactively hunt for Advanced Persistent Threats (APTs) using behavioral anomaly detection, memory forensics, and threat intelligence feeds."
    },
    {
        "date": "Level 08",
        "title": "→ Security Architecture",
        "description": "Design and implement Zero-Trust environments, secure multi-cloud infrastructures, and drive DevSecOps integration across engineering pipelines at scale."
    },
    {
        "date": "Level 09",
        "title": "→ Purple Team Leadership",
        "description": "Bridge the gap between offense and defense. Direct complex adversary emulation exercises to continuously validate and harden an organization's security posture."
    },
    {
        "date": "The Peak",
        "title": "→ Elite Professional / CISO",
        "description": "The ultimate goal. Directing global risk strategy, advising executive boards, contributing bleeding-edge research, and mentoring the next generation of defenders."
    }
]
