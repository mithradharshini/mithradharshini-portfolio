const portfolioData = {
  meta: {
    title: "Mithra Dharshini R - Portfolio",
    description: "BBA student exploring the space where business, technology and creativity meet.",
    email: "mithradharshini968.7@gmail.com",
    linkedin: "https://www.linkedin.com/in/mithra-dharshini-r-208159378",
    location: "COIMBATORE, IN",
    formspreeEndpoint: "" // TODO: Add your Formspree or Web3Forms endpoint URL here
  },
  
  hero: {
    name: "MITHRA DHARSHINI R",
    tagline: "BBA student exploring the space where business, technology and creativity meet.",
    status: "OPEN TO INTERNSHIPS",
    mission: "PRICE ProtoSem (ongoing)"
  },

  about: {
    summary: "Ambitious and adaptable BBA student interested in Marketing, Retail Management, Digital Strategy, and Entrepreneurship. Backed by hands-on operations exposure from an intensive internship, an ongoing 20-week retail problem-solving project, and demonstrated leadership through student clubs, event coordination, and public speaking.",
    skills: {
      "Business & Management": ["Strategic Planning", "Organizational Coordination", "Problem Solving", "Operational Analysis", "Team Leadership", "Event Management"],
      "Technical & Productivity": ["Microsoft Excel", "PowerPoint", "Word"],
      "Core Interests": ["Marketing Strategy", "Retail Management", "Digital Marketing", "Business Development", "Entrepreneurship"]
    }
  },

  experience: [
    {
      role: "Business Operations & Finance Intern",
      company: "Gupta Printers (Commercial Printing & Packaging)",
      duration: "21-day intensive on-site internship",
      bullets: [
        "Gained hands-on exposure to end-to-end production including printing machinery, precision cutting, and packaging pasting.",
        "Observed financial workflows, budget estimations, invoice tracking, and routine operations.",
        "Analyzed cross-functional workflow coordination across manufacturing stages for quality control and waste reduction.",
        "Prepared structured analytical reports on operational observations, bottlenecks, and business insights."
      ]
    }
  ],

  protosem: {
    title: "PRICE ProtoSem",
    role: "Innovation Engineer Trainee",
    subtitle: "20-week industry-integrated innovation programme, Phygital Retail & Intelligent Commerce Track.",
    status: "ONGOING",
    description1: "Selected for an intensive programme solving real-world retail and commerce challenges through AI, analytics, intelligent systems, IoT, prototyping, and entrepreneurship.",
    description2: "Collaborating on live industry problem statements to explore, formulate, and validate practical technological solutions by conducting systematic retail market research, consumer touchpoint analysis, and rapid solution prototyping in an incubation ecosystem.",
    tags: ["Patenting", "Retail & Intelligent Commerce", "AI & Analytics", "Intelligent Systems & IoT", "Prototyping", "Entrepreneurship"],
    activeTagIndex: 1, // Highlighting Retail & Intelligent Commerce
    
    // Timeline Data
    weeks: [
      // PHASE 1
      { week: 1, phase: 1, phaseLabel: "Phase 01 - Discovery", title: "Cohort Induction & Program Kickoff", status: "Completed" },
      { week: 2, phase: 1, phaseLabel: "Phase 01 - Discovery", title: "Retail Product Sensing & Field Observation", status: "Completed" },
      { week: 3, phase: 1, phaseLabel: "Phase 01 - Discovery", title: "Consumer Touchpoint Analysis", status: "Completed" },
      { week: 4, phase: 1, phaseLabel: "Phase 01 - Discovery", title: "Problem Statement Formulation", status: "Completed" },
      { week: 5, phase: 1, phaseLabel: "Phase 01 - Discovery", title: "[TODO: Add Phase 1 Week 5 Title]", status: "Completed" },
      
      // PHASE 2
      { week: 6, phase: 2, phaseLabel: "Phase 02 - Technology & Systems", title: "AI, IoT & Intelligent Systems Exploration", status: "Completed" },
      { week: 7, phase: 2, phaseLabel: "Phase 02 - Technology & Systems", title: "[TODO: Add Title]", status: "Completed" },
      { week: 8, phase: 2, phaseLabel: "Phase 02 - Technology & Systems", title: "[TODO: Add Title]", status: "In progress" },
      { week: 9, phase: 2, phaseLabel: "Phase 02 - Technology & Systems", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 10, phase: 2, phaseLabel: "Phase 02 - Technology & Systems", title: "[TODO: Add Title]", status: "Upcoming" },
      
      // PHASE 3
      { week: 11, phase: 3, phaseLabel: "Phase 03 - Prototyping", title: "Iterative Prototyping & Commerce Testing", status: "Upcoming" },
      { week: 12, phase: 3, phaseLabel: "Phase 03 - Prototyping", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 13, phase: 3, phaseLabel: "Phase 03 - Prototyping", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 14, phase: 3, phaseLabel: "Phase 03 - Prototyping", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 15, phase: 3, phaseLabel: "Phase 03 - Prototyping", title: "[TODO: Add Title]", status: "Upcoming" },
      
      // PHASE 4
      { week: 16, phase: 4, phaseLabel: "Phase 04 - Synthesis & Validation", title: "Commercial Viability & Venture Readiness", status: "Upcoming" },
      { week: 17, phase: 4, phaseLabel: "Phase 04 - Synthesis & Validation", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 18, phase: 4, phaseLabel: "Phase 04 - Synthesis & Validation", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 19, phase: 4, phaseLabel: "Phase 04 - Synthesis & Validation", title: "[TODO: Add Title]", status: "Upcoming" },
      { week: 20, phase: 4, phaseLabel: "Phase 04 - Synthesis & Validation", title: "[TODO: Add Title]", status: "Upcoming" }
    ]
  },

  leadership: [
    {
      role: "Joint Secretary",
      organization: "Sahitya Literature Club",
      description: "Plan and coordinate club initiatives and student-focused literary competitions; facilitate creative workshops and coordinate with institutional committees for seamless events."
    },
    {
      role: "Event Coordinator",
      organization: "PODIUM (public-speaking event)",
      description: "Managed event logistics, participant registration, speaker scheduling and on-ground coordination for a premier public-speaking event."
    },
    {
      role: "Judging Panel Member",
      organization: "INKSPIRE (creative & literary showcase)",
      description: "Evaluated entries across structured performance metrics, ensuring fair scoring, rubric adherence and constructive feedback."
    }
  ],

  certifications: [
    {
      title: "Startup Sprint",
      issuer: "SPJIMR",
      description: "Intensive 5-day executive immersion program on Startups, Entrepreneurship and Family Business Dynamics."
    },
    {
      title: "Mahatma Gandhi Scholarship",
      issuer: "Kumaraguru College",
      description: "Merit-based academic scholarship for Semester 1 excellence."
    }
  ],

  education: [
    {
      degree: "BBA",
      institution: "Kumaraguru College of Liberal Arts and Science, Coimbatore, Tamil Nadu",
      period: "2025-2028 (expected)",
      details: "Cumulative GPA 8.0 / 10."
    },
    {
      degree: "Class XII",
      institution: "State Board",
      period: "",
      details: "95%"
    },
    {
      degree: "Class X",
      institution: "State Board",
      period: "",
      details: "90%"
    }
  ],

  contactText: "Open to internship opportunities, retail innovation dialogues and collaborative business ventures."
};
