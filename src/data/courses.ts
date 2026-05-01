export type CourseReview = { name: string; initials: string; rating: number; comment: string; role: string };

export type CourseClass = { id: string; title: string; duration: string; videoId: string; type: "video" | "live" };

export type CourseTest = { id: string; title: string; questions: number; durationMin: number };

export type Course = {
  id: string;
  title: string;
  category: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  priceInr: number;          // recorded price (default)
  originalInr: number;
  livePriceInr: number;      // live cohort price
  liveOriginalInr: number;
  trending?: boolean;
  gradient: string;
  emoji: string;
  tagline: string;
  description: string;
  highlights: string[];
  syllabus: { title: string; lessons: string[] }[];
  instructor: { name: string; role: string; bio: string; initials: string };
  classes: CourseClass[];
  tests: CourseTest[];
  reviews: CourseReview[];
};

export const CATEGORIES = [
  "All",
  "Data Science",
  "Web Development",
  "Security",
  "Cloud",
  "Mobile",
  "Design",
] as const;

const DEFAULT_CLASSES: CourseClass[] = [
  { id: "c1", title: "Welcome & Course Roadmap", duration: "08:24", videoId: "dQw4w9WgXcQ", type: "video" },
  { id: "c2", title: "Setting Up Your Environment", duration: "14:10", videoId: "ScMzIvxBSi4", type: "video" },
  { id: "c3", title: "Core Concepts — Part 1", duration: "22:45", videoId: "aqz-KE-bpKQ", type: "video" },
  { id: "c4", title: "Live Q&A with Mentor", duration: "60:00", videoId: "5qap5aO4i9A", type: "live" },
  { id: "c5", title: "Hands-on Project Walkthrough", duration: "31:08", videoId: "kJQP7kiw5Fk", type: "video" },
  { id: "c6", title: "Capstone Kickoff", duration: "18:32", videoId: "9bZkp7q19f0", type: "live" },
];

const DEFAULT_TESTS: CourseTest[] = [
  { id: "t1", title: "Module 1 Quiz", questions: 10, durationMin: 15 },
  { id: "t2", title: "Mid-course Assessment", questions: 25, durationMin: 45 },
  { id: "t3", title: "Final Capstone Test", questions: 40, durationMin: 90 },
];

const REVIEWS_POOL: CourseReview[] = [
  { name: "Aditi Verma", initials: "AV", rating: 5, role: "SDE-1 @ Razorpay", comment: "Genuinely the best money I spent on upskilling. The mentors push you hard and the projects are interview-grade." },
  { name: "Rahul Khanna", initials: "RK", rating: 5, role: "Engineer @ Zoho", comment: "Got placed within 2 months of finishing. The mock interviews were a game-changer." },
  { name: "Sneha Iyer", initials: "SI", rating: 4, role: "Data Analyst @ Swiggy", comment: "Pacing is intense but the syllabus is exactly what hiring managers care about." },
  { name: "Arjun Patel", initials: "AP", rating: 5, role: "Junior Dev @ Freshworks", comment: "Live cohorts >> recorded courses. Mentor feedback on every project pushed my code quality way up." },
];

export const COURSES: Course[] = [
  {
    id: "ai-ml",
    title: "AI / ML Engineering",
    category: "Data Science",
    rating: 4.9,
    students: 12480,
    duration: "16 weeks",
    level: "Advanced",
    priceInr: 19999, originalInr: 34999,
    livePriceInr: 39999, liveOriginalInr: 59999,
    trending: true,
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    emoji: "🧠",
    tagline: "Build production-grade ML systems from scratch.",
    description:
      "Become an AI engineer who can design, train, deploy and scale modern ML systems. Cover everything from classical ML to LLM agents, RAG pipelines, fine-tuning, and MLOps — all through real-world projects.",
    highlights: [
      "Build & deploy 6 production ML projects",
      "Hands-on with PyTorch, LangChain, vector DBs",
      "Train your own LLM from scratch",
      "1:1 mentorship with senior ML engineers",
    ],
    syllabus: [
      { title: "Foundations of ML", lessons: ["Linear algebra refresher", "Probability & statistics", "Gradient descent intuition", "Bias-variance tradeoff"] },
      { title: "Deep Learning with PyTorch", lessons: ["Tensors & autograd", "CNNs for vision", "RNNs and Transformers", "Training loops at scale"] },
      { title: "LLMs & Generative AI", lessons: ["Transformer architecture", "Fine-tuning with LoRA", "RAG pipelines", "Agentic systems"] },
      { title: "MLOps & Deployment", lessons: ["Model versioning", "Serving with FastAPI", "Monitoring & drift", "Cloud GPU inference"] },
      { title: "Capstone Project", lessons: ["Scope your idea", "Build end-to-end", "Deploy & demo", "Portfolio polish"] },
    ],
    instructor: { name: "Dr. Aarav Mehta", role: "Ex-Google DeepMind, IIT Bombay", initials: "AM", bio: "10+ years building ML systems at Google DeepMind and Microsoft Research. Author of 30+ papers on deep learning." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
  {
    id: "fullstack",
    title: "Full Stack Mastery",
    category: "Web Development",
    rating: 4.8,
    students: 18920,
    duration: "20 weeks",
    level: "Intermediate",
    priceInr: 15999, originalInr: 27999,
    livePriceInr: 32999, liveOriginalInr: 49999,
    gradient: "from-blue-500 via-cyan-500 to-emerald-500",
    emoji: "⚡",
    tagline: "From zero to senior-grade full stack engineer.",
    description:
      "Master the modern web stack — React, Node, Postgres, TypeScript, and cloud deployment. Ship 4 portfolio-grade apps and learn the patterns top product companies actually use in production.",
    highlights: [
      "Ship 4 production-grade apps",
      "Master React, Node, Postgres, Redis",
      "System design for web at scale",
      "Mock interviews with FAANG engineers",
    ],
    syllabus: [
      { title: "Modern JavaScript & TypeScript", lessons: ["ES2024 features", "TypeScript deep dive", "Async patterns", "Testing fundamentals"] },
      { title: "React & Frontend Architecture", lessons: ["Hooks mastery", "State management", "Performance & profiling", "Design systems"] },
      { title: "Backend with Node & Postgres", lessons: ["REST & GraphQL APIs", "Database design", "Auth & security", "Caching with Redis"] },
      { title: "DevOps & Deployment", lessons: ["Docker basics", "CI/CD pipelines", "Cloud deployment", "Monitoring & logs"] },
      { title: "Capstone & Interview Prep", lessons: ["Build a SaaS app", "System design rounds", "Behavioral interviews", "Portfolio review"] },
    ],
    instructor: { name: "Priya Sharma", role: "Senior Engineer at Stripe", initials: "PS", bio: "Building payment infra at Stripe. Previously at Razorpay & Flipkart. Loves teaching first-principles engineering." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
  {
    id: "cyber",
    title: "Cybersecurity Pro",
    category: "Security",
    rating: 4.7,
    students: 8430,
    duration: "14 weeks",
    level: "Intermediate",
    priceInr: 17999, originalInr: 29999,
    livePriceInr: 34999, liveOriginalInr: 52999,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    emoji: "🛡️",
    tagline: "Think like an attacker, defend like a pro.",
    description:
      "A hands-on cybersecurity program covering offensive and defensive security. Build a hacker mindset through real CTFs, pen-testing labs, and incident response drills.",
    highlights: ["50+ hands-on hacking labs", "Prep for OSCP & CEH certifications", "Bug bounty walkthroughs", "Career mentorship by ethical hackers"],
    syllabus: [
      { title: "Security Foundations", lessons: ["Networking essentials", "Linux for hackers", "Crypto basics", "Threat modeling"] },
      { title: "Offensive Security", lessons: ["Recon & enumeration", "Web exploitation", "Privilege escalation", "Post-exploitation"] },
      { title: "Defensive Security", lessons: ["SIEM & log analysis", "Incident response", "Threat hunting", "Forensics basics"] },
      { title: "Cloud & App Security", lessons: ["AWS security", "Container security", "Secure SDLC", "DevSecOps"] },
      { title: "Capstone CTF", lessons: ["Team CTF challenges", "Report writing", "Bug bounty submission", "Resume polish"] },
    ],
    instructor: { name: "Rohan Iyer", role: "Lead Security Engineer, HackerOne", initials: "RI", bio: "Top 50 bug bounty hunter globally. Disclosed critical CVEs at Google, Apple, and Meta." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    category: "Cloud",
    rating: 4.8,
    students: 9650,
    duration: "12 weeks",
    level: "Intermediate",
    priceInr: 13999, originalInr: 22999,
    livePriceInr: 28999, liveOriginalInr: 42999,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    emoji: "☁️",
    tagline: "Master AWS, Kubernetes & modern infra.",
    description:
      "Become the engineer who keeps systems running at scale. Master AWS, Docker, Kubernetes, Terraform, and the SRE playbook used by hyperscale teams.",
    highlights: ["AWS Solutions Architect prep", "Production Kubernetes labs", "Infrastructure as Code with Terraform", "Real on-call simulations"],
    syllabus: [
      { title: "AWS Core Services", lessons: ["EC2, S3, VPC", "IAM & security", "RDS & DynamoDB", "Lambda & serverless"] },
      { title: "Containers & Orchestration", lessons: ["Docker deep dive", "Kubernetes basics", "Helm & operators", "Service mesh"] },
      { title: "IaC & Automation", lessons: ["Terraform modules", "GitHub Actions", "ArgoCD & GitOps", "Secret management"] },
      { title: "Observability & SRE", lessons: ["Metrics, logs, traces", "Prometheus & Grafana", "Incident response", "SLOs & error budgets"] },
      { title: "Capstone Deployment", lessons: ["Multi-region setup", "Cost optimization", "DR drills", "Production handover"] },
    ],
    instructor: { name: "Neha Kapoor", role: "Principal SRE, Atlassian", initials: "NK", bio: "Scaled infra to billions of requests at Atlassian and Cloudflare. AWS Hero & CNCF ambassador." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
  {
    id: "react-native",
    title: "React Native Bootcamp",
    category: "Mobile",
    rating: 4.7,
    students: 5240,
    duration: "10 weeks",
    level: "Beginner",
    priceInr: 9999, originalInr: 17999,
    livePriceInr: 21999, liveOriginalInr: 32999,
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    emoji: "📱",
    tagline: "Ship beautiful apps to iOS & Android.",
    description:
      "Build production cross-platform mobile apps with React Native, Expo, and modern native modules. Publish your own app to both app stores by week 10.",
    highlights: ["Publish 2 apps to App Store & Play Store", "Animations with Reanimated 3", "Native modules & deep linking", "Push notifications & analytics"],
    syllabus: [
      { title: "RN Fundamentals", lessons: ["Expo workflow", "Navigation patterns", "Forms & gestures", "Styling at scale"] },
      { title: "State & Data", lessons: ["React Query", "Offline-first apps", "Auth flows", "Secure storage"] },
      { title: "Native Polish", lessons: ["Reanimated 3", "Native modules", "Performance tuning", "Crash reporting"] },
      { title: "Ship It", lessons: ["App Store submission", "Play Store review", "OTA updates", "Marketing basics"] },
    ],
    instructor: { name: "Karan Verma", role: "Senior Mobile Eng, Swiggy", initials: "KV", bio: "Built apps used by 100M+ users at Swiggy and Zomato. Active OSS contributor to React Native." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
  {
    id: "design",
    title: "Product Design Studio",
    category: "Design",
    rating: 4.9,
    students: 6180,
    duration: "12 weeks",
    level: "Beginner",
    priceInr: 11999, originalInr: 19999,
    livePriceInr: 24999, liveOriginalInr: 36999,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    emoji: "🎨",
    tagline: "Design products people love to use.",
    description:
      "Go from blank canvas to portfolio-ready product designer. Master Figma, design systems, prototyping, and user research the way top product teams do it.",
    highlights: ["Build 3 case studies", "Master Figma & design systems", "User research & usability testing", "Portfolio review with Big Tech designers"],
    syllabus: [
      { title: "Design Foundations", lessons: ["Visual hierarchy", "Color & type", "Layout systems", "Accessibility"] },
      { title: "Figma Mastery", lessons: ["Auto-layout", "Components & variants", "Design tokens", "Prototyping"] },
      { title: "UX & Research", lessons: ["User interviews", "Journey mapping", "Usability testing", "Data-driven design"] },
      { title: "Portfolio", lessons: ["Case study structure", "Storytelling", "Presentation skills", "Job hunt strategy"] },
    ],
    instructor: { name: "Ananya Rao", role: "Staff Designer, Figma", initials: "AR", bio: "Shaping the future of design tools at Figma. Previously designed at Airbnb and Razorpay." },
    classes: DEFAULT_CLASSES, tests: DEFAULT_TESTS, reviews: REVIEWS_POOL,
  },
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);

export const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const JOB_OPENINGS = [
  { company: "Razorpay", role: "Frontend Engineer", location: "Bengaluru", type: "Full-time", salary: "₹18-30 LPA", logo: "💳" },
  { company: "Swiggy", role: "Mobile Engineer (RN)", location: "Bengaluru", type: "Full-time", salary: "₹16-26 LPA", logo: "🛵" },
  { company: "Zoho", role: "ML Engineer", location: "Chennai", type: "Full-time", salary: "₹14-22 LPA", logo: "🧠" },
  { company: "Freshworks", role: "Backend Engineer", location: "Hybrid", type: "Full-time", salary: "₹15-25 LPA", logo: "🌿" },
  { company: "CRED", role: "Product Designer", location: "Bengaluru", type: "Full-time", salary: "₹20-32 LPA", logo: "💎" },
  { company: "Postman", role: "DevOps Engineer", location: "Remote", type: "Full-time", salary: "₹18-28 LPA", logo: "📮" },
  { company: "Atlassian", role: "SRE", location: "Bengaluru", type: "Full-time", salary: "₹22-35 LPA", logo: "🅰️" },
  { company: "Stripe", role: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "₹28-45 LPA", logo: "💸" },
];
