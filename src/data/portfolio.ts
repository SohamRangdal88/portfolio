/**
 * Centralized portfolio content + typed interfaces.
 * Components consume this file — update copy/links here without touching components.
 *
 * IMPORTANT (per spec): do NOT invent metrics, dates, links, testimonials.
 * Optional fields that are `null` / empty are hidden by the UI.
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  handle: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  context: string;
}

export interface ArchitectureStage {
  id: string;
  title: string;
  focus: string;
  context: string;
}

export interface ArchitectureTrack {
  id: string;
  title: string;
  summary: string;
  stages: ArchitectureStage[];
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  blurb: string;
  items: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  overview: string;
  problem: string;
  approach: string;
  caseStudy: {
    headline: string;
    narrative: string;
  };
  architecture: string[];
  features: string[];
  stack: string[];
  metrics: ProjectMetric[];
  /** Real URLs only. Leave `null` when not available — UI hides the action. */
  github: string | null;
  live: string | null;
  accent: "graphite" | "clay" | "ochre" | "plum" | "slate";
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyUrl: string | null;
  employmentType: "internship" | "freelance";
  location: string;
  period: string;
  summary: string;
  contributions: string[];
  tech: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  qualification: string;
  period: string;
  score: string;
  scoreLabel: string;
  details?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  placement: string;
  description: string;
  context: string;
}

export interface LabDemo {
  id: string;
  index: string;
  label: string;
  title: string;
  caption: string;
}

/* ------------------------------------------------------------------ */
/*  SITE                                                               */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Soham Rangdal",
  shortName: "Soham",
  role: "Developer",
  location: "Solapur, Maharashtra, India",
  email: "sohamrangdal88@gmail.com",
  headlineTop: "SOHAM",
  headlineBottom: "RANGDAL.",
  tagline: ["I BUILD SOFTWARE", "FROM CLEAR IDEAS", "TO WORKING SYSTEMS."],
  description:
    "Final-year Information Technology student with internship and freelance experience across backend services, AI applications, APIs and full-stack software.",
  /** Drop a real file at /public/resume.pdf and set this to "/resume.pdf" to enable the download CTA. */
  resumeUrl: null as string | null,
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "education", label: "Education", href: "#education" },
  { id: "about", label: "About", href: "#about" },
  { id: "expertise", label: "Expertise", href: "#expertise" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "lab", label: "Lab", href: "#lab" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const SOCIALS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/sohamrangdal88",
    handle: "github.com/sohamrangdal88",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/sohamrangdal",
    handle: "linkedin.com/in/sohamrangdal",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:sohamrangdal88@gmail.com",
    handle: "sohamrangdal88@gmail.com",
  },
];

export const SYSTEM_DESIGN_TRACKS: ArchitectureTrack[] = [
  {
    id: "ai-systems",
    title: "AI application",
    summary: "A controlled path from a user request to a tested model-backed response.",
    stages: [
      {
        id: "input",
        title: "Input & validation",
        focus: "Define the request, capture relevant context, and validate the expected inputs.",
        context: "API contracts · input handling",
      },
      {
        id: "orchestration",
        title: "Workflow orchestration",
        focus: "Coordinate prompts, state and the order of model or tool calls.",
        context: "LangChain · LangGraph · Python",
      },
      {
        id: "context",
        title: "Models & context",
        focus: "Supply the model with task instructions and relevant application or retrieved data.",
        context: "LLM APIs · retrieval · structured data",
      },
      {
        id: "integrations",
        title: "Tools & integrations",
        focus: "Connect bounded application actions through APIs and explicit tool inputs/outputs.",
        context: "REST APIs · tool use",
      },
      {
        id: "quality",
        title: "Evaluation & response",
        focus: "Test request paths, inspect generated results, and refine the workflow.",
        context: "API tests · prompt iteration",
      },
    ],
  },
  {
    id: "software-systems",
    title: "Software system",
    summary: "A maintainable application boundary from the interface to tested services and data.",
    stages: [
      {
        id: "interface",
        title: "User interface",
        focus: "Present clear workflows and keep user interactions separate from service logic.",
        context: "React · TypeScript",
      },
      {
        id: "api",
        title: "API boundary",
        focus: "Expose explicit REST endpoints and validate requests before they reach domain logic.",
        context: "FastAPI · Flask · REST",
      },
      {
        id: "services",
        title: "Application services",
        focus: "Keep business workflows composable and independent of transport details.",
        context: "Python · service modules",
      },
      {
        id: "data",
        title: "Data & search",
        focus: "Choose storage by access pattern: relational records, full-text search or vector retrieval.",
        context: "PostgreSQL · Elasticsearch · vector stores",
      },
      {
        id: "delivery",
        title: "Testing & delivery",
        focus: "Exercise API behavior, package services, and prepare the application for deployment.",
        context: "API tests · Docker · deployment",
      },
    ],
  },
];

export const COUNTER_STATS: StatItem[] = [
  { id: "c1", value: 10000, suffix: "+", label: "Documents indexed", context: "Daivik" },
  { id: "c2", value: 200, prefix: "<", suffix: "ms", label: "Retrieval latency", context: "RAG pipeline" },
  { id: "c3", value: 5, suffix: "+", label: "Clients served", context: "Freelance" },
  { id: "c4", value: 9.2, decimals: 1, suffix: "/10", label: "CGPA", context: "B.Tech IT" },
  { id: "c5", value: 30, suffix: "+", label: "API test cases", context: "API test suite" },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "I'm Soham Rangdal, a final-year Information Technology student at Walchand Institute of Technology, Solapur.",
  "Across internships and freelance work, I've built backend services, APIs, AI-powered workflows and full-stack applications.",
  "I enjoy connecting the parts: clear interfaces, practical data handling, useful automation and systems that are straightforward to test and operate.",
  "I focus on understanding the problem, choosing practical tools and delivering maintainable software.",
];

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    index: "01",
    title: "Programming",
    blurb: "Languages I build systems in.",
    items: ["Python", "SQL", "C", "C++"],
  },
  {
    id: "ai",
    index: "02",
    title: "AI & Generative AI",
    blurb: "The intelligence layer.",
    items: [
      "LLMs",
      "RAG",
      "NLP",
      "Machine Learning",
      "AI Agents",
      "Prompt Engineering",
      "Embeddings",
      "Semantic Search",
    ],
  },
  {
    id: "frameworks",
    index: "03",
    title: "Frameworks",
    blurb: "Orchestration & model tooling.",
    items: [
      "LangChain",
      "LangGraph",
      "Hugging Face",
      "Sentence Transformers",
      "OpenAI API",
    ],
  },
  {
    id: "vector",
    index: "04",
    title: "Vector Databases",
    blurb: "Storage for semantic retrieval.",
    items: ["ChromaDB", "Pinecone", "FAISS"],
  },
  {
    id: "ml",
    index: "05",
    title: "ML & Data Science",
    blurb: "Training, evaluation & analysis.",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Model Training",
      "Model Evaluation",
      "Feature Engineering",
      "Data Analysis",
    ],
  },
  {
    id: "backend",
    index: "06",
    title: "Backend & Databases",
    blurb: "Services, APIs & data stores.",
    items: [
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Elasticsearch",
      "Neo4j",
    ],
  },
  {
    id: "tools",
    index: "07",
    title: "Tools & Platforms",
    blurb: "Everyday engineering tooling.",
    items: ["Docker", "Git", "GitHub", "Postman", "Linux", "Vercel"],
  },
];

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

export const PROJECTS: Project[] = [
  {
    id: "sop-analyzer",
    number: "01",
    title: "Industrial Incident Management & SOP Analyzer",
    subtitle: "Intelligent IT Service Management workflow",
    year: "Jan 2026 – Present",
    overview:
      "An intelligent IT Service Management workflow that analyzes historical SOPs and runbooks to recommend troubleshooting steps for new incidents.",
    problem:
      "Support teams re-solve the same incidents repeatedly because knowledge is buried across historical SOPs and runbooks. Finding the right troubleshooting path is slow and inconsistent.",
    approach:
      "Ingest and process historical SOPs and runbooks, understand the incoming incident, retrieve the most relevant procedures, and let an agent reason toward a recommended resolution — then generate RCA and SOP artifacts automatically.",
    caseStudy: {
      headline: "Turn each incident fix into reusable operational knowledge",
      narrative:
        "For a new ticket, the workflow parses historical SOPs and runbooks to recommend relevant troubleshooting steps. After a fix, it generates and catalogs an updated SOP and an RCA report so the resolution can help with future incidents.",
    },
    architecture: [
      "Incident Input",
      "Data Processing",
      "Document Retrieval",
      "Agent Reasoning",
      "Troubleshooting Recommendation",
      "RCA / SOP Generation",
    ],
    features: [
      "Engineered an IT Service Management (ITSM) workflow parsing historical SOPs and runbooks to recommend troubleshooting steps on new tickets",
      "Automated a pipeline that generates and catalogs new SOPs and Root Cause Analysis (RCA) reports after each fix",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Elasticsearch", "LangChain", "LangGraph"],
    metrics: [],
    github: null,
    live: null,
    accent: "graphite",
  },
  {
    id: "daivik",
    number: "02",
    title: "Daivik",
    subtitle: "AI-Powered Legal Guidance Assistant",
    year: "2026",
    overview:
      "A conversational legal information assistant that guides users through a situation, retrieves relevant legal information, and produces a structured analysis with focused follow-up help.",
    problem:
      "People facing family-law situations may not know which information applies or what to do next. Generic chatbot answers can be unfocused and may not be grounded in legal sources.",
    approach:
      "Use a guided intake with adaptive questions, retrieve relevant legal text for grounding, return a structured case analysis, and offer targeted follow-up actions.",
    caseStudy: {
      headline: "Guide a legal intake before retrieving an answer",
      narrative:
        "Daivik uses adaptive follow-up questions to collect only the case details that apply, then retrieves relevant legal information and returns a structured case analysis. Focused follow-up actions let a user explore next steps without regenerating the whole analysis.",
    },
    architecture: [
      "Guided Intake",
      "Adaptive Questions",
      "Legal Information Retrieval",
      "Structured Analysis",
      "Focused Follow-Up",
    ],
    features: [
      "Adaptive guided intake with questions that skip irrelevant details",
      "Retrieval-grounded legal information",
      "Structured case analysis",
      "Focused follow-up answers and quick actions",
      "RAG evaluation scripts and chatbot tests",
    ],
    stack: ["Python", "RAG", "LLM API", "Vercel", "Render"],
    metrics: [
      { label: "Documents indexed", value: "10,000+" },
      { label: "Retrieval latency", value: "Sub-200ms" },
    ],
    github: "https://github.com/SohamRangdal88/Daivik",
    live: "https://daivik-pink.vercel.app/",
    accent: "clay",
  },
  {
    id: "nutriai",
    number: "03",
    title: "NutriAI",
    subtitle: "AI-Powered 7-Day Nutrition Protocols",
    year: "2025",
    overview:
      "An AI-powered nutrition application that generates personalized seven-day meal protocols based on a user's metabolic profile.",
    problem:
      "Generic meal plans do not account for individual metabolic profiles, goals and dietary preferences.",
    approach:
      "Generate a personalized seven-day meal protocol from the user's nutrition profile, with a separate demo flow for exploring the application.",
    caseStudy: {
      headline: "Turn an individual nutrition profile into a weekly protocol",
      narrative:
        "NutriAI presents protocol generation as the primary action and offers a separate demo path. Its focus is translating an individual metabolic profile into a structured seven-day meal protocol rather than showing the same generic plan to everyone.",
    },
    architecture: [
      "User Preference Input",
      "Goal Parsing",
      "LLM Generation",
      "Plan Structuring",
      "Personalized Output",
    ],
    features: [
      "Personalized seven-day meal protocol generation",
      "Recommendations based on an individual metabolic profile",
      "Dedicated protocol-generation and demo flows",
    ],
    stack: [],
    metrics: [],
    github: null,
    live: "https://nutriai-psi.vercel.app/",
    accent: "ochre",
  },
  {
    id: "shilp-ai",
    number: "04",
    title: "Shilp AI",
    subtitle: "AI-Powered Yarn Consumption & Weave Pattern Analyzer",
    year: "2025",
    overview:
      "An AI-powered tool for textile production that analyzes weave pattern images and calculates yarn consumption, returning a detailed production breakdown.",
    problem:
      "Estimating yarn consumption for woven fabric is manual, slow and error-prone, which leads to material waste and unpredictable production costs.",
    approach:
      "Upload a weave pattern image, detect the pattern with machine learning, configure yarn specifications, and generate a detailed consumption and waste report.",
    caseStudy: {
      headline: "Translate a weave image into a production estimate",
      narrative:
        "A textile user uploads a pattern, configures weave and yarn properties, and receives a yarn-consumption breakdown. Keeping the specifications configurable makes the estimate reflect the material choices instead of relying on a single fixed assumption.",
    },
    architecture: [
      "Pattern Image Upload",
      "AI Pattern Detection",
      "Yarn Specification Input",
      "Consumption Calculation",
      "Detailed Report",
    ],
    features: [
      "AI-powered weave pattern detection from an uploaded image",
      "Yarn consumption calculation with configurable specifications (ply, count, unit)",
      "Weave type and custom factor configuration",
      "Detailed breakdown of consumption and waste",
      "Instant, in-browser results",
    ],
    stack: [],
    metrics: [],
    github: null,
    live: "https://shilp-ai.vercel.app/",
    accent: "plum",
  },
  {
    id: "faculty-360",
    number: "05",
    title: "Faculty 360",
    subtitle: "Full-stack faculty profile management",
    year: "2026",
    overview:
      "A faculty profile management application for a college or department, with a profile builder and separate views for members and administrators.",
    problem:
      "Faculty information is spread across sections and records, making it harder for members to maintain and for administration to review.",
    approach:
      "Build a single structured profile that faculty can maintain over time, with validation, draft autosave, review workflows, administrative dashboards, and export options.",
    caseStudy: {
      headline: "Maintain one profile from draft through review",
      narrative:
        "The profile builder organizes faculty information into twelve sections. Draft changes autosave locally and to the API, section validation catches incomplete or inconsistent entries, and the same records feed administrative review and printable or downloadable exports.",
    },
    architecture: [
      "Faculty Profile",
      "12 Structured Sections",
      "Autosave & Validation",
      "Submission Workflow",
      "Admin Dashboard",
      "Profile Exports",
    ],
    features: [
      "Faculty profile builder with twelve sections",
      "Draft autosave with a local fallback when the API is unavailable",
      "Section-level validation and completion tracking",
      "Administrative review with approve and return states",
      "JSON, CSV, HTML and print-ready profile exports",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    metrics: [],
    github: "https://github.com/SohamRangdal88/360",
    live: null,
    accent: "slate",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "brihad",
    role: "AI Engineer Intern",
    company: "Brihad Veterinary Academy Pvt. Ltd.",
    companyUrl: "https://brihadveterinaryacademy.com/",
    employmentType: "internship",
    location: "Remote",
    period: "June 2026 – September 2026",
    summary:
      "Built Python backend services and LLM-powered automation with vector-based semantic search.",
    contributions: [
      "Developed Python backend services and REST APIs using Flask and FastAPI for internal automation workflows.",
      "Integrated LLM APIs into AI automation and conversational applications.",
      "Implemented vector database-based semantic search, improving information retrieval efficiency by approximately 35%.",
      "Optimized prompts and conversational memory.",
      "Tested and debugged API integrations.",
      "Supported staging deployments.",
    ],
    tech: [
      "Python",
      "Flask",
      "FastAPI",
      "LLM APIs",
      "Vector Databases",
      "Semantic Search",
      "Prompt Engineering",
      "REST APIs",
    ],
  },
  {
    id: "simplitechkey",
    role: "Python Developer Intern",
    company: "Simplitechkey LLP",
    companyUrl: "http://www.simplitechkey.in",
    employmentType: "internship",
    location: "Remote",
    period: "February 2026 – May 2026",
    summary:
      "Architected a RAG assistant for internal documentation and hardened the API surface.",
    contributions: [
      "Architected a RAG assistant for internal documentation.",
      "Indexed 5,000+ pages using LangChain and vector embeddings.",
      "Reduced manual lookups by 40%.",
      "Improved API response times by 20%.",
      "Created 30+ API test cases.",
      "Refined prompt templates and documented the retrieval pipeline.",
    ],
    tech: [
      "Python",
      "LangChain",
      "FastAPI",
      "Vector Embeddings",
      "REST APIs",
      "Prompt Engineering",
      "Git",
    ],
  },
  {
    id: "freelance",
    role: "Freelance AI Developer",
    company: "Self-Employed",
    companyUrl: null,
    employmentType: "freelance",
    location: "Remote",
    period: "June 2025 – November 2025",
    summary:
      "Delivered AI automation solutions to small-business clients across multiple industries.",
    contributions: [
      "Delivered AI automation solutions to 5+ small-business clients across 3 industries.",
      "Automated repetitive business workflows using custom Python backend services.",
      "Saved clients 10+ hours per week.",
      "Managed requirements, implementation and delivery independently.",
      "Maintained 100% on-time delivery.",
    ],
    tech: ["Python", "REST APIs", "LLM Integration", "Automation Scripting"],
  },
];

/* ------------------------------------------------------------------ */
/*  EDUCATION                                                          */
/* ------------------------------------------------------------------ */

export const EDUCATION: EducationEntry[] = [
  {
    id: "ssc",
    institution: "S.R. Chandak English High School",
    qualification: "SSC — Secondary",
    period: "2021",
    score: "86%",
    scoreLabel: "Percentage",
  },
  {
    id: "hsc",
    institution: "S. E. S. Junior College, Solapur",
    qualification: "HSC — Higher Secondary",
    period: "2021 – 2023",
    score: "64%",
    scoreLabel: "Percentage",
  },
  {
    id: "wit",
    institution: "Walchand Institute of Technology, Solapur",
    qualification: "B.Tech — Information Technology",
    period: "June 2023 – May 2027",
    score: "9.2",
    scoreLabel: "CGPA / 10",
    details: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "Software Engineering",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ACHIEVEMENTS                                                       */
/* ------------------------------------------------------------------ */

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "mercuria",
    title: "Mercuria 2024",
    year: "2024",
    placement: "Runner-Up",
    description:
      "Placed runner-up among 100+ competing teams, leading technical design for a four-member team.",
    context: "100+ teams · 4-member team · led technical design",
  },
];

/* ------------------------------------------------------------------ */
/*  ENGINEERING LAB DEMOS                                              */
/* ------------------------------------------------------------------ */

export const LAB_DEMOS: LabDemo[] = [
  {
    id: "systems",
    index: "01",
    label: "System Design",
    title: "Software System Design Explorer",
    caption: "Trace responsibilities across UI, API, services, data and delivery boundaries.",
  },
  {
    id: "rag",
    index: "02",
    label: "RAG Pipeline",
    title: "RAG Pipeline Visualizer",
    caption: "Step through each stage of a retrieval-augmented generation pipeline.",
  },
  {
    id: "embedding",
    index: "03",
    label: "Embeddings",
    title: "Semantic Embedding Explorer",
    caption: "Explore illustrative concept clusters and similarity relationships.",
  },
  {
    id: "agent",
    index: "04",
    label: "Agent Workflow",
    title: "AI Agent Workflow",
    caption: "Watch an illustrative agent plan, select tools, reason and respond.",
  },
  {
    id: "api",
    index: "05",
    label: "API Explorer",
    title: "API Explorer",
    caption: "Inspect example FastAPI-style endpoints with request and response bodies.",
  },
];

export const CONTACT = {
  headline: ["HAVE AN INTERESTING", "PROBLEM?", "LET'S ENGINEER", "A SOLUTION."],
  closing: `soham@portfolio:~$ echo "Let's build something intelligent."`,
  closingTag: "[SESSION COMPLETED]",
};
