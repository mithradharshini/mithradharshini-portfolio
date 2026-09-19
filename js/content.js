/**
 * MITHRA.OS // PORTFOLIO DATA HUB
 * ----------------------------------------------------------------------------
 * This file is the SINGLE SOURCE OF TRUTH for all website content.
 * You can edit all titles, descriptions, links, and weeks here without
 * touching any HTML or CSS layout code.
 */

const portfolioData = {
  // META & CONTACT TELEMETRY
  meta: {
    name: "MITHRA DHARSHINI R",
    title: "Mithra Dharshini R | Retro Futurism Portfolio",
    description: "BBA student exploring the space where business, technology and creativity meet. Specialized in Marketing, Retail Management, Digital Strategy & Entrepreneurship.",
    location: "COIMBATORE, TAMIL NADU, IN",
    email: "mithradharshini968.7@gmail.com",
    linkedin: "https://www.linkedin.com/in/mithra-dharshini-r-208159378",
    resumePath: "assets/resume.html", // Relative path to ATS resume / printable view
    
    // Static form endpoint: Paste your Formspree (e.g. 'https://formspree.io/f/xyz')
    // or Web3Forms access key endpoint here. If empty, the form falls back to mailto:.
    formspreeEndpoint: ""
  },

  // HERO SECTION
  hero: {
    displayName: "MITHRA DHARSHINI R",
    roleTag: "BBA CANDIDATE // INNOVATION TRAINEE",
    tagline: "BBA student exploring the space where business, technology and creativity meet.",
    locationReadout: "COIMBATORE, IN",
    statusReadout: "OPEN TO INTERNSHIPS",
    missionReadout: "PRICE PROTOSEM (ONGOING)",
    ctaExplore: "EXPLORE MY WORK",
    ctaResume: "DOWNLOAD RESUME"
  },

  // RETRO TICKER / MARQUEE DISCIPLINES
  ticker: [
    "MARKETING STRATEGY",
    "RETAIL MANAGEMENT",
    "DIGITAL STRATEGY",
    "BUSINESS DEVELOPMENT",
    "ENTREPRENEURSHIP",
    "OPERATIONAL ANALYSIS",
    "INTELLIGENT COMMERCE",
    "SYSTEMS THINKING"
  ],

  // SECTION 01: ABOUT & SYSTEM MODULES
  about: {
    sectionCode: "SEC 01 // ABOUT",
    heading: "SYSTEM PROFILE & CAPABILITIES",
    summary: "Ambitious and adaptable BBA student with a strong focus in Marketing, Retail Management, Digital Strategy, and Entrepreneurship. Backed by hands-on operations exposure from an intensive printing & packaging industry internship, an ongoing 20-week retail innovation project, and demonstrated leadership through student clubs, event coordination, and public speaking.",
    
    // Skills grouped as level-less "System Modules"
    modules: [
      {
        category: "Business & Management",
        badge: "SYS.MGMT",
        skills: [
          "Strategic Planning",
          "Organizational Coordination",
          "Problem Solving",
          "Operational Analysis",
          "Team Leadership",
          "Event Management"
        ]
      },
      {
        category: "Technical & Productivity",
        badge: "SYS.TECH",
        skills: [
          "Microsoft Excel (Data Entry, Analysis & Formulas)",
          "PowerPoint (Presentations & Pitch Decks)",
          "Word (Reporting & Documentation)"
        ]
      },
      {
        category: "Core Interests",
        badge: "SYS.CORE",
        skills: [
          "Marketing Strategy",
          "Retail Management",
          "Digital Marketing",
          "Business Development",
          "Entrepreneurship"
        ]
      }
    ]
  },

  // SECTION 02: EXPERIENCE (MISSION LOG)
  experience: {
    sectionCode: "SEC 02 // EXPERIENCE",
    heading: "MISSION LOG: OPERATIONS & FINANCE",
    missions: [
      {
        role: "Business Operations & Finance Intern",
        organization: "Gupta Printers (Commercial Printing & Packaging)",
        duration: "21-Day Intensive On-Site Internship",
        location: "On-site",
        status: "COMPLETED",
        bullets: [
          "Hands-on exposure to end-to-end production operations, including industrial printing machinery, precision cutting, and packaging pasting workflows.",
          "Observed and documented key financial workflows, budget estimations, invoice tracking, and routine administrative operations.",
          "Analyzed cross-functional workflow coordination across manufacturing stages for quality control and waste reduction.",
          "Prepared structured analytical reports on operational observations, identification of production bottlenecks, and actionable business insights."
        ]
      }
    ]
  },

  // SECTION 03: PRICE PROTOSEM (FLAGSHIP 20-WEEK INNOVATION HIGHWAY)
  protosem: {
    sectionCode: "SEC 03 // FLAGSHIP PROJECT",
    leftLabel: "PROTOSEM // INNOVATION FELLOWSHIP",
    rightLabel: "20-WEEK FIELD JOURNAL",
    eyebrow: "PROGRAMME",
    title: "PRICE ProtoSem",
    role: "Innovation Engineer Trainee",
    programmeLine: "20-Week Industry-Integrated Innovation Programme, Phygital Retail & Intelligent Commerce Track",
    status: "ONGOING",
    metaBadges: [
      { label: "TRACK", value: "PHYGITAL RETAIL & COMMERCE" },
      { label: "STATUS", value: "ONGOING // IN FLIGHT" },
      { label: "CADENCE", value: "20-WEEK IMMERSION" }
    ],
    descCol1: "Selected for an intensive programme solving real-world retail and commerce challenges through AI, analytics, intelligent systems, IoT, prototyping and entrepreneurship.",
    descCol2: "Collaborating on live industry problem statements to explore, formulate and validate practical technological solutions; conducting systematic retail market research, consumer touchpoint analysis and rapid solution prototyping in an incubation ecosystem.",
    disciplineHeading: "PROGRAMME DISCIPLINES & FOCUS AREAS",
    disciplines: [
      { name: "Patenting", highlighted: false },
      { name: "Retail & Intelligent Commerce", highlighted: true },
      { name: "AI & Analytics", highlighted: false },
      { name: "Intelligent Systems & IoT", highlighted: false },
      { name: "Prototyping", highlighted: false },
      { name: "Entrepreneurship", highlighted: false }
    ],
    
    // Timeline Header
    highwayTitle: "The 20-Week Innovation Highway",
    highwaySubtitle: "Chronological progression through exploration, system discovery, prototyping, and venture validation.",

    // Phase Headers along the winding highway with paired opposite descriptors
    phases: [
      {
        phaseId: 1,
        name: "Phase 01 - Discovery",
        milestone: "Prologue & Onboarding",
        descriptor: "Retail Product Sensing & Field Observation (Weeks 01-05)"
      },
      {
        phaseId: 2,
        name: "Phase 02 - Technology & Systems",
        milestone: "Phase 02 - Technology & Systems",
        descriptor: "AI, IoT & Intelligent Systems Exploration (Weeks 06-10)"
      },
      {
        phaseId: 3,
        name: "Phase 03 - Prototyping",
        milestone: "Phase 03 - Prototyping",
        descriptor: "Iterative Prototyping & Commerce Testing (Weeks 11-15)"
      },
      {
        phaseId: 4,
        name: "Phase 04 - Synthesis & Validation",
        milestone: "Phase 04 - Synthesis & Validation",
        descriptor: "Commercial Viability & Venture Readiness (Weeks 16-20)"
      }
    ],

    // All 20 Weeks - Strictly neutral placeholders marked with TODO where week-specific deliverables are not in resume
    weeks: [
      // PHASE 1 (Weeks 01-05)
      {
        week: 1,
        phase: 1,
        phaseLabel: "PHASE 01",
        title: "Cohort Induction & Program Kickoff",
        summary: "Introduction to Phygital Retail, ecosystem orientation, and innovation toolkits.",
        status: "Completed"
      },
      {
        week: 2,
        phase: 1,
        phaseLabel: "PHASE 01",
        title: "Retail Product Sensing & Field Observation",
        summary: "Field visits and retail store observation to sense friction in customer journeys.",
        status: "Completed"
      },
      {
        week: 3,
        phase: 1,
        phaseLabel: "PHASE 01",
        title: "Consumer Touchpoint Analysis",
        summary: "Mapping digital and physical customer touchpoints across modern retail formats.",
        status: "Completed"
      },
      {
        week: 4,
        phase: 1,
        phaseLabel: "PHASE 01",
        title: "Problem Statement Formulation",
        summary: "Synthesizing research insights into structured problem statements for solution mapping.",
        status: "Completed"
      },
      {
        week: 5,
        phase: 1,
        phaseLabel: "PHASE 01",
        // TODO: Update with your specific Week 05 deliverable title
        title: "Week 05: Phase 01 Synthesis & Review",
        summary: "Discovery review milestone, presenting field observations and problem matrices.",
        status: "Completed"
      },

      // PHASE 2 (Weeks 06-10)
      {
        week: 6,
        phase: 2,
        phaseLabel: "PHASE 02",
        title: "AI, IoT & Intelligent Systems Exploration",
        summary: "Evaluating sensor architectures, computer vision, and retail automation possibilities.",
        status: "Completed"
      },
      {
        week: 7,
        phase: 2,
        phaseLabel: "PHASE 02",
        // TODO: Update with your specific Week 07 deliverable title
        title: "Week 07: System Architecture Formulation",
        summary: "Architecting hardware and software integration frameworks for the retail prototype.",
        status: "Completed"
      },
      {
        week: 8,
        phase: 2,
        phaseLabel: "PHASE 02",
        // TODO: Update with your specific Week 08 deliverable title
        title: "Week 08: [Add Deliverable Title]",
        summary: "Ongoing sprint on retail technology integration and feature validation.",
        status: "In progress"
      },
      {
        week: 9,
        phase: 2,
        phaseLabel: "PHASE 02",
        // TODO: Update with your specific Week 09 deliverable title
        title: "Week 09: [Add Deliverable Title]",
        summary: "Upcoming milestone in systems architecture and prototype design.",
        status: "Upcoming"
      },
      {
        week: 10,
        phase: 2,
        phaseLabel: "PHASE 02",
        // TODO: Update with your specific Week 10 deliverable title
        title: "Week 10: Phase 02 Mid-Way Review",
        summary: "Mid-programme technical demonstration and systems feasibility checkpoint.",
        status: "Upcoming"
      },

      // PHASE 3 (Weeks 11-15)
      {
        week: 11,
        phase: 3,
        phaseLabel: "PHASE 03",
        title: "Iterative Prototyping & Commerce Testing",
        summary: "Building low/medium-fidelity interactive mockups and testing checkout/sensing loops.",
        status: "Upcoming"
      },
      {
        week: 12,
        phase: 3,
        phaseLabel: "PHASE 03",
        // TODO: Update with your specific Week 12 deliverable title
        title: "Week 12: [Add Deliverable Title]",
        summary: "Testing user interactions and iterating on physical-digital prototype interfaces.",
        status: "Upcoming"
      },
      {
        week: 13,
        phase: 3,
        phaseLabel: "PHASE 03",
        // TODO: Update with your specific Week 13 deliverable title
        title: "Week 13: [Add Deliverable Title]",
        summary: "Field simulation and consumer feedback gathering in simulated testbeds.",
        status: "Upcoming"
      },
      {
        week: 14,
        phase: 3,
        phaseLabel: "PHASE 03",
        // TODO: Update with your specific Week 14 deliverable title
        title: "Week 14: [Add Deliverable Title]",
        summary: "Prototype refinement, bug triage, and user flow optimization.",
        status: "Upcoming"
      },
      {
        week: 15,
        phase: 3,
        phaseLabel: "PHASE 03",
        // TODO: Update with your specific Week 15 deliverable title
        title: "Week 15: Phase 03 Prototyping Sign-Off",
        summary: "Final prototype validation and hardware-software freeze.",
        status: "Upcoming"
      },

      // PHASE 4 (Weeks 16-20)
      {
        week: 16,
        phase: 4,
        phaseLabel: "PHASE 04",
        title: "Commercial Viability & Venture Readiness",
        summary: "Economic modeling, unit economics, supply chain feasibility, and patent preparation.",
        status: "Upcoming"
      },
      {
        week: 17,
        phase: 4,
        phaseLabel: "PHASE 04",
        // TODO: Update with your specific Week 17 deliverable title
        title: "Week 17: Business Model Formulation",
        summary: "Structuring revenue streams, deployment models, and customer acquisition strategies.",
        status: "Upcoming"
      },
      {
        week: 18,
        phase: 4,
        phaseLabel: "PHASE 04",
        // TODO: Update with your specific Week 18 deliverable title
        title: "Week 18: [Add Deliverable Title]",
        summary: "Refining investment deck, pitch narrative, and IP documentation.",
        status: "Upcoming"
      },
      {
        week: 19,
        phase: 4,
        phaseLabel: "PHASE 04",
        // TODO: Update with your specific Week 19 deliverable title
        title: "Week 19: Demonstration Dry-Runs",
        summary: "Technical dry-runs and prototype showcase preparations before industry juries.",
        status: "Upcoming"
      },
      {
        week: 20,
        phase: 4,
        phaseLabel: "PHASE 04",
        // TODO: Update with your specific Week 20 deliverable title
        title: "Week 20: Grand Innovation Showcase & Validation",
        summary: "Final demo day pitch, stakeholder validation, and fellowship culmination.",
        status: "Upcoming"
      }
    ]
  },

  // SECTION 04: LEADERSHIP & EXTRACURRICULARS (CREW BADGES)
  leadership: {
    sectionCode: "SEC 04 // LEADERSHIP",
    heading: "CREW BADGES & COGNITIVE MISSIONS",
    badges: [
      {
        code: "CREW.01",
        role: "Joint Secretary",
        organization: "Sahitya Literature Club",
        description: "Plan and coordinate club initiatives and student-focused literary competitions; facilitate creative workshops and coordinate with institutional committees for seamless events.",
        highlight: "Event Management & Club Governance"
      },
      {
        code: "CREW.02",
        role: "Event Coordinator",
        organization: "PODIUM (Public-Speaking Event)",
        description: "Managed event logistics, participant registration, speaker scheduling and on-ground coordination for a premier public-speaking event.",
        highlight: "Operations & Speaker Scheduling"
      },
      {
        code: "CREW.03",
        role: "Judging Panel Member",
        organization: "INKSPIRE (Creative & Literary Showcase)",
        description: "Evaluated entries across structured performance metrics, ensuring fair scoring, rubric adherence and constructive feedback.",
        highlight: "Evaluation & Quality Assessment"
      }
    ]
  },

  // SECTION 05: CERTIFICATIONS & ACHIEVEMENTS (MEDALS)
  certifications: {
    sectionCode: "SEC 05 // CERTIFICATIONS",
    heading: "HONORS & SPECIALIZED ACCREDITATIONS",
    medals: [
      {
        badgeCode: "HONOR.SPRINT",
        title: "Startup Sprint",
        issuer: "SPJIMR (S.P. Jain Institute of Management and Research)",
        duration: "5-Day Executive Immersion",
        description: "Intensive 5-day executive immersion program focused on Startups, Entrepreneurship and Family Business Dynamics.",
        tag: "Executive Immersion"
      },
      {
        badgeCode: "HONOR.SCHOLAR",
        title: "Mahatma Gandhi Scholarship",
        issuer: "Kumaraguru College of Liberal Arts and Science",
        duration: "Semester 1 Academic Distinction",
        description: "Merit-based academic scholarship awarded in recognition of outstanding academic performance and Semester 1 excellence.",
        tag: "Academic Merit"
      }
    ]
  },

  // SECTION 06: EDUCATION (FLIGHT RECORD)
  education: {
    sectionCode: "SEC 06 // FLIGHT RECORD",
    heading: "ACADEMIC TRAJECTORY",
    records: [
      {
        level: "Undergraduate Degree",
        degree: "Bachelor of Business Administration (BBA)",
        institution: "Kumaraguru College of Liberal Arts and Science",
        location: "Coimbatore, Tamil Nadu",
        period: "2025 – 2028 (Expected)",
        scoreLabel: "Cumulative GPA",
        scoreValue: "8.0 / 10",
        notes: "Specializing in Marketing, Retail, and Digital Business Operations."
      },
      {
        level: "Higher Secondary (Class XII)",
        degree: "Higher Secondary Certificate (HSC)",
        institution: "State Board",
        location: "Tamil Nadu, India",
        period: "Completed",
        scoreLabel: "Score",
        scoreValue: "95%",
        notes: "Excellence in Commerce and Business Fundamentals."
      },
      {
        level: "Secondary School (Class X)",
        degree: "Secondary School Leaving Certificate (SSLC)",
        institution: "State Board",
        location: "Tamil Nadu, India",
        period: "Completed",
        scoreLabel: "Score",
        scoreValue: "90%",
        notes: "Strong foundational academic distinction."
      }
    ]
  },

  // SECTION 07: CONTACT ("OPEN A CHANNEL")
  contact: {
    sectionCode: "SEC 07 // OPEN A CHANNEL",
    heading: "COMMUNICATION RELAY",
    subtext: "Open to internship opportunities, retail innovation dialogues and collaborative business ventures.",
    location: "Coimbatore, Tamil Nadu, India",
    email: "mithradharshini968.7@gmail.com",
    linkedin: "https://www.linkedin.com/in/mithra-dharshini-r-208159378",
    formTerminalPrompt: "TRANSMIT_TO // MITHRA.OS"
  }
};
