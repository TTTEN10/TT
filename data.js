/* ============================================================
   Portfolio OS - Profile data model
   Source: 26.1 TENCVEN.pdf + LinkedIn (tt10)
   ============================================================ */
(function () {
  const profile = {
    name: "Thibaut Tenenbaum",
    handle: "tt10",
    role: "Lead Project Manager · Founder @ SafePsy · Ergonomist & Work Psychologist",
    tagline:
      "Shaping environments where teams and individuals can grow, perform, and feel fulfilled.",
    identity:
      "Lead project manager at Scaleway and founder of SafePsy with a rare dual profile: large-scale operations delivery across data centers, supply chain, and infrastructure — plus certified expertise in work psychology and ergonomics, and a privacy-first approach to AI.",
    status: {
      state: "Lead Project Manager at Scaleway · Founder, SafePsy",
      availableFrom: "2026-01-01",
      seeking:
        "Product, project & program management · operations · ergonomics · workplace transformation",
      location: "Greater Paris Metropolitan Region, France",
      locationShort: "Paris Region, France",
      timezone: "Europe/Paris",
      relocation: "Open to hybrid roles in France & Europe",
    },
    contact: {
      email: "ttten@protonmail.com",
      phone: "+33 6 24 07 64 09",
      linkedin: "https://www.linkedin.com/in/tt10/",
      github: "https://github.com/TT10",
    },
    about: {
      title: "About Thibaut",
      short:
        "Lead PM at Scaleway, founder of SafePsy, certified work psychologist & ergonomist — from 100k+ server deployments to human-centered, privacy-first product design.",
      paragraphs: [
        "I am Lead Project Manager at Scaleway, Europe's sovereign cloud provider, leading Operations, Product, and Engineering managers on new products from qualification to market availability.",
        "My path spans deployments across 11 data centers (100k+ servers), supply chain and logistics optimization for the COO, and now product-scale program leadership — cutting deployment time-to-market by 30% along the way.",
        "Alongside this operational track, I earned a Master in Work Psychology & Ergonomics (Paris Nanterre) and a Bachelor in Psychology (Rennes), with research on data privacy in telepsychology.",
        "Former Chief Master Sergeant in Military Intelligence (IDF), I led multidisciplinary teams of 10+ people — a foundation I still draw on for cross-functional leadership, conflict resolution, and strategic prioritization.",
        "Since January 2026 I'm founding SafePsy, a privacy-first AI companion for thoughtful self-reflection and emotional support: users own their data through a DID token, and the platform never accesses or uses their data.",
      ],
      tags: [
        "Lead Project Management",
        "Work Psychology",
        "Ergonomics",
        "Data Center Operations",
        "Supply Chain",
        "Scaleway",
        "SafePsy",
        "Founder",
        "Cross-functional Leadership",
      ],
    },
    resume: {
      title: "Resume Preview",
      summary:
        "Lead project manager at Scaleway and founder of SafePsy, with certified work psychology & ergonomics credentials, deep operations experience, and a track record of large-scale infrastructure delivery.",
      body:
        "Combines product, project, and program management with data-center operations, supply chain coordination, human-factor expertise, and privacy-first product thinking — from server migrations at scale to ergonomic workplace interventions and a DID-based AI companion.",
      focus: [
        "Product, Project & Program Management",
        "Operations & Data Center Deployments",
        "Work Psychology & Ergonomics",
        "Supply Chain & Infrastructure",
      ],
      strength:
        "Managed new BareMetal product creation and cut TTM by 30% (over €1M MRR in under 10 months); led compliance certifications involving 300+ people; drove process improvements across a 400+ person tech environment.",
      quickSummary: [
        { k: "Management", v: "SAFe, Waterfall, MoSCoW, RACI/DACI, SDLC" },
        { k: "Operations", v: "DC ops, hardware, supply chain, 11 DCs" },
        { k: "Psychology", v: "Work psych, ergonomics, telepsychology research" },
        { k: "Tools", v: "Atlassian, Asana, Notion, K8s, Terraform, Docker, Python, Solidity" },
      ],
      downloadLabel: "Download CV",
      downloadUrl: "./26%20TENCVEN.pdf",
    },
    trackRecords: [
      "Managed new BareMetal products creation, reduced TTM by 30% (+1M€ MRR in under 10 months)",
      "Led successful compliance certifications involving 300+ people",
      "Coordinated processes implementation in tech environment of 400+ people to improve productivity",
    ],
    certifications: [
      "Scaleway Ecosystems — Elements & Dedibox",
      "Essentials of Scaleway AI & GPUs",
      "Duke University — Decentralized Finance",
    ],
    education: [
      {
        degree: "Master — Work Psychology & Ergonomics",
        school: "Université Paris Nanterre (Paris X)",
        period: "Sep 2023 — Jun 2025",
        note: "Thesis: Ensuring Data Privacy in Telepsychology — Methodological, Ethical, and Ergonomic Aspects. Final project: ergonomic intervention, relocation, and reorganization of a Scaleway operations facility.",
      },
      {
        degree: "Bachelor — Psychology (Work & Social Psychology)",
        school: "Université Rennes 2",
        period: "Sep 2020 — Jun 2023",
        note: "Research paper: The challenges of data security and confidentiality in telepsychology platforms.",
      },
    ],
    languages: [
      {
        code: "FR",
        name: "French",
        nativeName: "Français",
        level: "C2",
        blurb: "Native mastery — professional, academic, and daily use.",
        contexts: ["Native speaker", "Professional", "Academic"],
      },
      {
        code: "HE",
        name: "Hebrew",
        nativeName: "עברית",
        level: "C2",
        blurb: "Full professional proficiency; used during military service and in daily life.",
        contexts: ["Professional", "Military service", "Daily life"],
      },
      {
        code: "EN",
        name: "English",
        nativeName: "English",
        level: "C1",
        blurb: "Advanced professional English in multinational tech and cross-functional environments.",
        contexts: ["Professional", "Documentation", "Cross-functional collaboration"],
      },
    ],
    clinical: {
      license: {
        status: "Licensed Psychologist & Ergonomist",
        label: "RPPS",
        registry: "Répertoire Partagé des Professionnels de Santé",
        number: "10112177349",
        note: "Registered professional practice in psychology, with certified expertise in work psychology and ergonomics (Master, Paris Nanterre).",
      },
      psychotherapy: {
        title: "Psychotherapy",
        short: "Online psychotherapy for stress, burnout, and anxiety",
        intro:
          "As a licensed psychologist and ergonomist, I offer online psychotherapy that blends clinical psychology with human-factor science. Sessions are held remotely (telepsychology) and designed around privacy by default — the same principle behind the SafePsy AI companion I am building.",
        areas: [
          { t: "Stress & burnout prevention", d: "Prevention of psychosocial risks (RPS) and recovery from burnout, grounded in evidence-based approaches." },
          { t: "Anxiety & performance pressure", d: "Managing anxiety, perfectionism, and pressure in intense work environments." },
          { t: "Work-related difficulties", d: "Job dissatisfaction, conflict, relationships at work, and difficult transitions." },
          { t: "Wellbeing & life balance", d: "Building sustainable routines and support for broader mental wellbeing." },
        ],
        methods: ["Evidence-based approaches", "Online / telepsychology", "Privacy-first sessions", "French & English"],
      },
      coaching: {
        title: "Coaching",
        short: "Work & wellbeing coaching for individuals and teams",
        intro:
          "Coaching that pairs operational leadership experience (teams of 10+, 400+ person tech environments) with certified work psychology and ergonomics — helping people perform well while protecting their wellbeing. Licensed psychologist & ergonomist.",
        pillars: [
          { t: "Leadership & management", d: "Support new and experienced leaders with structure, feedback, and delegation." },
          { t: "Career transitions", d: "Navigate role changes, promotions, and cross-functional moves with clarity." },
          { t: "Team & org dynamics", d: "Improve collaboration, conflict resolution, and team effectiveness." },
          { t: "QVCT & workplace quality", d: "Improve quality of life and working conditions, informed by ergonomic analysis." },
        ],
        outcomes: ["Structured methodology", "Practical tools", "Confidentiality by default", "Telecoaching available"],
      },
    },
  };

  const experience = [
    {
      id: "exp-safe",
      company: "SafePsy",
      title: "Founder",
      kind: "Privacy-First AI Companion · Web3 / DID",
      period: "Jan 2026 — Present",
      location: "Paris Region, France",
      summary:
        "Founding SafePsy, a privacy-first AI companion for thoughtful self-reflection and emotional support. Users own their data via a DID (decentralized ID) token — the platform does not access or use users' data.",
      points: [
        "Building a privacy-first AI companion for self-reflection and emotional support.",
        "Users own their data via a DID token for optimal privacy.",
        "The platform never accesses or uses users' data.",
        "Blends AI, Web3 identity, and work-psychology insight on emotional wellbeing.",
      ],
      impact:
        "Pioneers a privacy-first category in AI wellbeing with self-sovereign data ownership at its core.",
      stack: [
        "Product & GTM",
        "AI / ML",
        "Blockchain & DID",
        "Privacy by Design",
        "Data Ownership",
      ],
      accent: "var(--rose)",
    },
    {
      id: "exp-a",
      company: "Scaleway",
      title: "Lead Project Manager",
      kind: "Product · Operations · Program Management",
      period: "Aug 2025 — Present",
      location: "Paris Region, France",
      summary:
        "Leading Operations, Product, and Engineering managers on new products from qualification to market availability, including global product and financial forecast implementation.",
      points: [
        "Own end-to-end delivery for new products from qualification through market availability.",
        "Lead cross-functional managers across Operations, Product, and Engineering.",
        "Implement global product and financial forecasting processes.",
        "Manage new BareMetal product creation from qualification to market, cutting TTM by 30% (over €1M MRR in under 10 months).",
        "Drive strategic prioritization across competing operational and product demands.",
        "Apply ergonomics and work-psychology lens to workplace and organizational topics.",
      ],
      impact:
        "Anchors Scaleway's new-product pipeline with structured program leadership and cross-functional alignment at scale.",
      stack: [
        "Program Management",
        "Product Forecasting",
        "Cross-functional Leadership",
        "SAFe",
        "Stakeholder Alignment",
        "Financial Planning",
        "BareMetal Products",
      ],
      accent: "var(--ac)",
    },
    {
      id: "exp-b",
      company: "Scaleway",
      title: "Operations Project Manager",
      kind: "Hardware · Supply Chain · Logistics",
      period: "Dec 2024 — Aug 2025",
      location: "Paris Region, France",
      summary:
        "Managed hardware, supply chain, and logistics internal projects for the COO and deputy: process optimization, global deployment planning, and supply/operations forecasting.",
      points: [
        "Optimized internal processes across hardware, supply chain, and logistics.",
        "Planned global deployment initiatives with operations leadership.",
        "Built supply and operations forecasts for executive decision-making.",
        "Coordinated stakeholders across COO office, supply chain, and field teams.",
        "Contributed to deployment TTM reduction initiatives.",
      ],
      impact:
        "Helped streamline operations workflows and improve planning visibility for Scaleway's physical infrastructure footprint.",
      stack: [
        "Operations PM",
        "Supply Chain",
        "Process Optimization",
        "Forecasting",
        "Hardware Logistics",
        "Atlassian",
      ],
      accent: "var(--info)",
    },
    {
      id: "exp-c",
      company: "Scaleway",
      title: "Deployments Project Manager",
      kind: "Data Center · Infrastructure · Migrations",
      period: "Sep 2023 — Dec 2024",
      location: "Paris Region, France · 11 Data Centers",
      summary:
        "Coordinated supply chain operations and managed hardware/network physical installation, decommissioning, removal, and migrations for 100k+ servers across 11 data centers.",
      points: [
        "Managed physical installation, decommissioning, and migration of 100k+ servers.",
        "Coordinated supply chain operations across 11 data centers.",
        "Led migrations within SLA maintenance timeframes involving 30+ people.",
        "Reduced deployment time-to-market by 30%.",
        "Handled hardware, network, and logistics coordination under tight operational constraints.",
      ],
      impact:
        "Delivered large-scale infrastructure migrations on schedule while cutting deployment TTM by 30%.",
      stack: [
        "Data Center Ops",
        "Server Migrations",
        "Supply Chain",
        "SLA Management",
        "Hardware Installation",
        "Risk Mitigation",
      ],
      accent: "var(--ok)",
    },
    {
      id: "exp-d",
      company: "Israel Defense Forces",
      title: "Chief Master Sergeant — Military Intelligence",
      kind: "Leadership · Operations · Intelligence",
      period: "Nov 2016 — Jul 2019",
      location: "Israel",
      summary:
        "Led operations of a multidisciplinary intelligence team of 10+ people in a high-stakes operational environment.",
      points: [
        "Led a multidisciplinary team of 10+ people in military intelligence operations.",
        "Managed operational planning, coordination, and execution under pressure.",
        "Built cross-functional leadership and conflict-resolution skills in complex environments.",
        "Developed Hebrew (C2) professional fluency in operational contexts.",
      ],
      stack: [
        "Team Leadership",
        "Operations",
        "Intelligence",
        "Conflict Resolution",
        "Strategic Planning",
      ],
      accent: "var(--warn)",
    },
  ];

  const projects = [
    {
      id: "project-facility",
      name: "Scaleway Operations Facility Reorganization",
      kind: "Master Final Project · Ergonomics",
      year: "2025",
      oneliner:
        "Ergonomic intervention, relocation, and reorganization of a Scaleway operations facility.",
      accent: "var(--ok)",
      tags: ["Ergonomics", "Work Psychology", "Facility Design", "Scaleway"],
      hero: "project-facility",
      problem:
        "A Scaleway operations facility needed relocation and reorganization without disrupting critical infrastructure workflows or employee wellbeing.",
      solution:
        "Conducted an ergonomic intervention covering activity analysis, workplace layout, relocation planning, and organizational reconfiguration aligned with operational constraints.",
      architecture: [
        { label: "Diagnosis", desc: "Activity analysis and ergonomic assessment of existing facility workflows." },
        { label: "Intervention", desc: "Designed relocation and reorganization plan with human-factor priorities." },
        { label: "Stakeholders", desc: "Aligned operations, HR, and facility teams on scope and rollout." },
        { label: "Delivery", desc: "Produced actionable recommendations for facility transformation." },
      ],
      challenges: [
        "Balancing operational continuity with major physical reorganization.",
        "Applying academic ergonomics frameworks inside a live data-center operations context.",
      ],
      lessons:
        "Ergonomic intervention is most effective when embedded in real operational constraints — not treated as a standalone HR exercise.",
      screens: ["Activity map", "Layout proposal", "Intervention plan"],
    },
    {
      id: "project-audit",
      name: "2,500 sqm Facility Audit & Redevelopment SOW",
      kind: "Operations · Ergonomics · CapEx",
      year: "2025",
      oneliner:
        "Audited 2,500 sqm of operational facilities and produced a €1M+ redevelopment statement of work.",
      accent: "var(--info)",
      tags: ["Facility Audit", "SOW", "Operations", "CapEx Planning"],
      hero: "project-audit",
      problem:
        "Operational facilities required a structured assessment before a major redevelopment investment could be scoped and approved.",
      solution:
        "Audited 2,500 sqm of operational space and produced a comprehensive SOW for €1M+ redevelopment, covering scope, constraints, and implementation priorities.",
      architecture: [
        { label: "Audit", desc: "Site walk-through and documentation of 2,500 sqm operational space." },
        { label: "Analysis", desc: "Identified gaps, risks, and improvement opportunities." },
        { label: "SOW", desc: "Structured scope, budget envelope, and delivery phases for €1M+ program." },
        { label: "Alignment", desc: "Presented findings to operations and leadership stakeholders." },
      ],
      challenges: [
        "Translating physical facility observations into an executive-ready investment case.",
        "Coordinating technical, operational, and financial stakeholders on scope.",
      ],
      lessons:
        "A rigorous facility audit saves more than it costs when CapEx decisions involve hundreds of people and millions of euros.",
      screens: ["Audit report", "SOW document", "Stakeholder review"],
    },
    {
      id: "project-ttm",
      name: "BareMetal Products & 30% TTM Reduction",
      kind: "Product Creation · Process Innovation",
      year: "2025-26",
      oneliner:
        "Managed new BareMetal product creation end-to-end, cutting time-to-market by 30% (over €1M MRR in under 10 months).",
      accent: "var(--ac)",
      tags: ["BareMetal", "Product Creation", "TTM", "Scaleway"],
      hero: "project-ttm",
      problem:
        "New BareMetal product cycles were too slow, delaying infrastructure offers to market and squeezing revenue ramp.",
      solution:
        "Led product creation from qualification to market with tight coordination across Operations, Product, and Engineering — cutting TTM by 30% and delivering over €1M MRR in under 10 months.",
      architecture: [
        { label: "Qualification", desc: "Scoped and qualified the new BareMetal offering with ops, product, and engineering." },
        { label: "Coordination", desc: "Aligned cross-functional managers on roadmaps, forecasts, and dependencies." },
        { label: "Execution", desc: "Drove the build-to-market flow with global product and financial forecasts." },
        { label: "Impact", desc: "Cut TTM by 30%; over €1M MRR in under 10 months." },
      ],
      challenges: [
        "Compressing go-to-market cycles without breaking operating reliability.",
        "Deciding priorities between product roadmap, capacity, and compliance.",
      ],
      lessons:
        "TTM gains come from fixing handoffs between product, operations, and engineering — not from pushing individual teams harder.",
      screens: ["Product roadmap", "TTM metric", "MRR trajectory"],
    },
    {
      id: "project-migration",
      name: "Large-Scale Server Migrations",
      kind: "Infrastructure · Program Delivery",
      year: "2024",
      oneliner:
        "SLA-critical migrations across 100k+ servers and 11 data centers, coordinating 30+ people.",
      accent: "var(--warn)",
      tags: ["Migrations", "Data Centers", "SLA", "100k+ Servers"],
      hero: "project-migration",
      problem:
        "Physical server installation, decommissioning, and migration at Scaleway's scale requires flawless coordination across supply chain, field ops, and network teams within strict maintenance windows.",
      solution:
        "Coordinated end-to-end migration programs across 11 data centers, managing hardware logistics, installation, decommissioning, and network cutovers within SLA timeframes.",
      architecture: [
        { label: "Planning", desc: "Built migration schedules aligned with SLA maintenance windows." },
        { label: "Coordination", desc: "Orchestrated 30+ people across supply chain, DC ops, and network." },
        { label: "Execution", desc: "Managed install, decommission, and removal for 100k+ server estate." },
        { label: "Close-out", desc: "Validated completion, documented lessons, and stabilized operations." },
      ],
      challenges: [
        "Maintaining SLA compliance during high-risk physical infrastructure changes.",
        "Coordinating parallel workstreams across 11 geographically distributed sites.",
      ],
      lessons:
        "At infrastructure scale, migration success is 90% planning and stakeholder alignment — 10% execution.",
      screens: ["Migration timeline", "RACI matrix", "SLA tracker"],
    },
    {
      id: "project-telepsy",
      name: "Telepsychology Data Privacy Research",
      kind: "Academic · Work Psychology",
      year: "2025",
      oneliner:
        "Master's thesis on methodological, ethical, and ergonomic aspects of data privacy in telepsychology.",
      accent: "var(--rose)",
      tags: ["Research", "Telepsychology", "Data Privacy", "Ethics"],
      hero: "project-telepsy",
      problem:
        "Telepsychology platforms raise complex questions about data security, confidentiality, and ergonomic fit for practitioners and patients.",
      solution:
        "Conducted master's thesis research examining methodological, ethical, and ergonomic dimensions of ensuring data privacy in telepsychology settings.",
      architecture: [
        { label: "Literature", desc: "Reviewed ethical, legal, and ergonomic frameworks for telepsychology." },
        { label: "Methodology", desc: "Designed research approach for privacy and usability analysis." },
        { label: "Analysis", desc: "Synthesized findings on data security and confidentiality challenges." },
        { label: "Recommendations", desc: "Proposed guidelines for platform design and clinical practice." },
      ],
      challenges: [
        "Bridging clinical psychology ethics with technical data-privacy requirements.",
        "Completing rigorous academic research while working full-time at Scaleway.",
      ],
      lessons:
        "Privacy in telepsychology is not just a technical problem — it is an ergonomic and ethical design problem.",
      screens: ["Research framework", "Ethics review", "Thesis defense"],
    },
  ];

  const skillCats = {
    management: { name: "Project Management", color: "#16b87f" },
    operations: { name: "Operations & Infrastructure", color: "#54a8ff" },
    psychology: { name: "Work Psychology & Ergonomics", color: "#3ecf8e" },
    tech: { name: "Tools & Technical", color: "#ff6a8a" },
  };

  const skills = [
    { id: "skill-pm", name: "Program Management", cat: "management", blurb: "Lead cross-functional programs from qualification to market availability.", projects: ["project-migration", "project-ttm"], exp: ["exp-a", "exp-b"], tech: ["SAFe", "Waterfall", "MoSCoW", "RACI/DACI", "SDLC"] },
    { id: "skill-agile", name: "Agile & SAFe Delivery", cat: "management", blurb: "SAFe, iterative delivery, backlog prioritization, and sprint coordination.", projects: ["project-ttm"], exp: ["exp-a", "exp-c"], tech: ["SAFe", "Scrum", "Agile", "SDLC"] },
    { id: "skill-stake", name: "Stakeholder Alignment", cat: "management", blurb: "Align executives, ops, product, and engineering around shared outcomes.", projects: ["project-audit", "project-facility"], exp: ["exp-a", "exp-b"], tech: ["Communication", "Facilitation", "Reporting"] },
    { id: "skill-prior", name: "Strategic Prioritization", cat: "management", blurb: "Prioritize competing demands using MoSCoW, RACI, and risk-based framing.", projects: ["project-ttm"], exp: ["exp-a"], tech: ["MoSCoW", "RACI/DACI", "Risk Analysis"] },
    { id: "skill-conflict", name: "Conflict Resolution", cat: "management", blurb: "Resolve cross-team friction in high-pressure operational environments.", projects: ["project-migration"], exp: ["exp-d", "exp-c"], tech: ["Mediation", "Negotiation", "Leadership"] },
    { id: "skill-dc", name: "Data Center Operations", cat: "operations", blurb: "Physical infrastructure ops across 11 data centers and 100k+ servers.", projects: ["project-migration"], exp: ["exp-c"], tech: ["DC Ops", "Hardware", "SLA Management"] },
    { id: "skill-deploy", name: "Deployments & Migrations", cat: "operations", blurb: "Server install, decommission, removal, and migration at scale.", projects: ["project-migration", "project-ttm"], exp: ["exp-c"], tech: ["Migrations", "Cutovers", "Maintenance Windows"] },
    { id: "skill-supply", name: "Supply Chain & Logistics", cat: "operations", blurb: "Hardware supply chain coordination and global deployment planning.", projects: ["project-migration"], exp: ["exp-b", "exp-c"], tech: ["Supply Chain", "Logistics", "Forecasting"] },
    { id: "skill-hw", name: "Hardware & Network Install", cat: "operations", blurb: "Coordinate physical hardware and network installation programs.", projects: ["project-migration"], exp: ["exp-c"], tech: ["Hardware Design", "Network", "Installation"] },
    { id: "skill-psy", name: "Work Psychology", cat: "psychology", blurb: "Understand how people experience work, stress, motivation, and change.", projects: ["project-telepsy", "project-facility"], exp: ["exp-a"], tech: ["Assessment", "Intervention", "RPS Prevention"] },
    { id: "skill-ergo", name: "Ergonomics", cat: "psychology", blurb: "Activity analysis and ergonomic intervention for workplace environments.", projects: ["project-facility", "project-audit"], exp: ["exp-a"], tech: ["Activity Analysis", "Actograph", "Assessment"] },
    { id: "skill-tele", name: "Telepsychology Research", cat: "psychology", blurb: "Data privacy, ethics, and ergonomic aspects of telepsychology platforms.", projects: ["project-telepsy"], exp: [], tech: ["Ethics", "Data Privacy", "Research"] },
    { id: "skill-qvct", name: "QVCT & Workplace Quality", cat: "psychology", blurb: "Improve quality of life and working conditions in operational settings.", projects: ["project-facility"], exp: ["exp-a"], tech: ["QVCT", "Wellbeing", "Prevention"] },
    { id: "skill-k8s", name: "Cloud & DevOps Stack", cat: "tech", blurb: "Kubernetes, Docker, Terraform, CI/CD, and observability tooling.", projects: ["project-migration"], exp: ["exp-c"], tech: ["Kubernetes", "Docker", "Terraform", "Grafana"] },
    { id: "skill-code", name: "Scripting & Development", cat: "tech", blurb: "Python, TypeScript, Node.js, SQL, PostgreSQL, R, YAML, and automation for ops workflows.", projects: [], exp: ["exp-c"], tech: ["Python", "TypeScript", "Node.js", "SQL", "PostgreSQL", "R", "YAML"] },
    { id: "skill-bi", name: "Analytics & Reporting", cat: "tech", blurb: "Tableau, Power BI, Grafana for operations and program dashboards.", projects: ["project-ttm"], exp: ["exp-b"], tech: ["Tableau", "Power BI", "Grafana"] },
    { id: "skill-tools", name: "Collaboration Tools", cat: "tech", blurb: "Atlassian suite, Asana, Notion, OpenProject, M365, and Google Workspace.", projects: [], exp: ["exp-a", "exp-b"], tech: ["Jira", "Confluence", "Asana", "Notion", "OpenProject", "M365"] },
    { id: "skill-research", name: "Research & Statistics", cat: "tech", blurb: "R, Jamovi, and actography for work psychology and ergonomics research.", projects: ["project-telepsy"], exp: [], tech: ["R", "Jamovi", "Actograph"] },
    { id: "skill-biz", name: "Business & Financial Planning", cat: "management", blurb: "Business plans, P&L management, ROI analysis, and OKR/KPI-driven decision making.", projects: ["project-ttm"], exp: ["exp-a", "exp-safe"], tech: ["Business Plan", "P&L", "ROI Analysis", "OKRs", "KPIs"] },
    { id: "skill-gtm", name: "GTM & Customer Development", cat: "management", blurb: "GTM strategy, discovery, and customer development for new products and ventures.", projects: [], exp: ["exp-safe", "exp-a"], tech: ["GTM Strategy", "Discovery", "Customer Development"] },
    { id: "skill-web3", name: "Blockchain & Self-Sovereign Identity", cat: "tech", blurb: "Solidity, Hardhat, Remix, Gnosis, OpenZeppelin; DID-first privacy architecture.", projects: [], exp: ["exp-safe"], tech: ["Solidity", "Hardhat", "Remix", "Gnosis", "OpenZeppelin"] },
    { id: "skill-ai", name: "AI & ML Infrastructure", cat: "tech", blurb: "ML inference, VMs, GPUaaS, Kubernetes, and bare-metal infrastructure for AI workloads.", projects: [], exp: ["exp-safe", "exp-c"], tech: ["ML Inference", "VMs", "GPUaaS", "Bare Metal"] },
    { id: "skill-sec", name: "Cyber & Info Security", cat: "tech", blurb: "Encryption, privacy, and data protection applied to infrastructure and consumer products.", projects: ["project-telepsy"], exp: ["exp-safe"], tech: ["Encryption", "Privacy", "Data Protection"] },
  ];

  const terminal = {
    prompt: "tt10@portfolio:~$",
    mission:
      "Lead PM at Scaleway · founder of SafePsy · certified work psychologist & ergonomist. From 100k+ server migrations to a privacy-first AI companion.",
    strengths: profile.trackRecords.map((r) => r.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)),
    focus: profile.resume.focus,
    why:
      "Rare combination of large-scale infrastructure program delivery, certified human-factor expertise, and privacy-first product building — valuable for operations, product, and people transformation inside tech organizations.",
  };

  const modules = [
    { id: "mission", name: "Mission Control", short: "Status", icon: "mission", desc: "Current status & overview", accent: "var(--ac)" },
    { id: "about", name: "About Me", short: "About", icon: "book", desc: "Personal profile", accent: "var(--info)" },
    { id: "resume", name: "Resume Preview", short: "Resume", icon: "layers", desc: "Recruiter-ready summary", accent: "var(--ok)" },
    { id: "experience", name: "Experience Database", short: "Career", icon: "exp", desc: "Interactive career timeline", accent: "var(--info)" },
    { id: "projects", name: "Project Laboratory", short: "Work", icon: "lab", desc: "Operations & people projects", accent: "var(--ok)" },
    { id: "skills", name: "Skill Stack", short: "Skills", icon: "skills", desc: "Grouped professional skills", accent: "var(--warn)" },
    { id: "languages", name: "Languages", short: "Languages", icon: "globe", desc: "Language proficiency", accent: "var(--ok)" },
    { id: "education", name: "Education", short: "Education", icon: "book", desc: "Academic background", accent: "var(--ac)" },
    { id: "psychotherapy", name: "Psychotherapy", short: "Therapy", icon: "psy", desc: "Licensed psychologist — online therapy", accent: "var(--rose)" },
    { id: "coaching", name: "Coaching", short: "Coaching", icon: "coach", desc: "Work & wellbeing coaching", accent: "var(--warn)" },
    { id: "assistant", name: "Recruiter Assistant", short: "Ask AI", icon: "ai", desc: "Ask anything about the profile", accent: "var(--rose)" },
    { id: "contact", name: "Contact", short: "Contact", icon: "mail", desc: "Email, LinkedIn, GitHub", accent: "var(--ac-bright)" },
    { id: "console", name: "Command Center", short: "Terminal", icon: "term", desc: "Terminal mode", accent: "var(--tx-1)" },
  ];

  window.JP = { profile, experience, projects, skills, skillCats, modules, terminal };
})();
