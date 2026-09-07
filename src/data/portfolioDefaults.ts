export interface TechStackItem {
  label: string;
  iconName: string;
}

export interface StatItem {
  label: string;
  iconName: string;
  note: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  items: string[];
}

export interface RoadmapStep {
  n: string;
  title: string;
  text: string;
}

export interface PortfolioData {
  hero: {
    greeting: string[];
    name: string;
    role: string;
    badgeText: string;
    avatarUrl?: string;
    avatarCutoutUrl?: string;
    avatarSecondaryUrl?: string;
    badgeColor?: string;
    badgePulse?: boolean;
    bio: string;
    tagline: string;
    stack: TechStackItem[];
  };
  about: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    stats: StatItem[];
  };
  skills: {
    kicker: string;
    heading: string;
    groups: SkillCategory[];
  };
  project: {
    kicker: string;
    heading: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
    accordionTitle: string;
    steps: RoadmapStep[];
  };
  activity: {
    kicker: string;
    heading: string;
    leetcodeUsername: string;
    githubUsername: string;
  };
  certification: {
    kicker: string;
    heading: string;
    certTitle: string;
    meta: string;
    topics: string[];
    mindsetKicker: string;
    quote: string;
    mantra: string;
  };
  contact: {
    kicker: string;
    heading: string;
    message: string;
    email: string;
    phone: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
      twitter: string;
      peerlist: string;
      leetcode?: string;
    };
  };
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    greeting: ["Hello,", "I'm", "Harsh."],
    name: "Harsh",
    role: ".NET Developer",
    badgeText: "Available to build",
    avatarUrl: "/harsh-3d-model.png",
    avatarCutoutUrl: "/harsh-3d-model.png",
    badgeColor: "emerald",
    badgePulse: true,
    bio: "Passionate .NET Developer building clean, high-performance web applications with C#, .NET, MySQL and Next.js.",
    tagline: "Building. Learning. Improving.",
    stack: [
      { label: "C#", iconName: "Braces" },
      { label: ".NET", iconName: "Layers" },
      { label: "MySQL", iconName: "Database" },
      { label: "Next.js", iconName: "Code2" },
      { label: "HTML", iconName: "FileCode2" },
      { label: "CSS", iconName: "Palette" },
      { label: "Git / GitHub", iconName: "GitBranch" },
    ],
  },
  about: {
    kicker: "01 — Profile",
    heading: "About me",
    paragraphs: [
      "I'm a passionate .NET Developer dedicated to building clean, high-performance and scalable web applications. My core expertise centers on C#, .NET, MySQL and modern frontend technologies like Next.js.",
      "I thrive on tackling real-world engineering challenges, designing reliable architectures, and crafting user interfaces that are both highly functional and engaging.",
      "I continuously explore emerging technologies, refine development workflows, and push my capabilities to deliver high-quality software solutions.",
    ],
    stats: [
      { label: ".NET Developer", iconName: "Code2", note: "C# · .NET · MySQL" },
      { label: "Full Stack Projects", iconName: "Rocket", note: "Frontend to database" },
      { label: "Continuous Learner", iconName: "TrendingUp", note: "Always improving" },
    ],
  },
  skills: {
    kicker: "02 — Toolkit",
    heading: "What I work with",
    groups: [
      { title: "Programming", iconName: "Braces", items: ["C#", "Object-Oriented Programming"] },
      { title: "Backend", iconName: "Layers", items: [".NET", "Web Application Development"] },
      { title: "Frontend", iconName: "MonitorSmartphone", items: ["Next.js", "HTML", "CSS"] },
      { title: "Database", iconName: "Database", items: ["MySQL", "Database Design"] },
      { title: "Soft Skills", iconName: "MessageSquare", items: ["Communication", "Leadership"] },
    ],
  },
  project: {
    kicker: "04 — Projects",
    heading: "Selected work",
    title: "FoodEat",
    subtitle: "Food Ordering Web Application",
    description:
      "FoodEat is a modern and responsive food ordering web application designed with an attractive animated interface and interactive food cards. The platform includes core e-commerce functionality such as shopping cart management and an end-to-end ordering flow.",
    tech: ["Next.js", ".NET", "MySQL"],
    liveUrl: "https://foodeatwebsite.vercel.app",
    githubUrl: "https://github.com/Harsharma96/ReadytoEatWebsite",
    accordionTitle: "FoodEat — from idea to web application",
    steps: [
      { n: "01", title: "Concept", text: "Modern food ordering experience." },
      { n: "02", title: "Frontend", text: "Built using Next.js with responsive and interactive UI." },
      { n: "03", title: "Backend", text: "Developed using .NET." },
      { n: "04", title: "Database", text: "MySQL used for data storage and management." },
      { n: "05", title: "UX", text: "Focused on responsiveness, performance and user engagement." },
    ],
  },
  activity: {
    kicker: "03 — Activity",
    heading: "Code Frequency & Problem Solving",
    leetcodeUsername: "Harsharma9675",
    githubUsername: "Harsharma96",
  },
  certification: {
    kicker: "05 — Credentials",
    heading: "Certification",
    certTitle: "Artificial Intelligence for Intermediate",
    meta: "IBM SkillsBuild / 3C · July 2026",
    topics: [
      "Machine Learning with Python",
      "Building Chatbots",
      "Linear Regression with PyTorch",
      "Reinforcement Learning",
      "Deep Learning Essentials",
      "Game-playing AI with TensorFlow",
    ],
    mindsetKicker: "05 — Developer mindset",
    quote: "Code is not just about making things work. It's about making them work better.",
    mantra: "Learn → Build → Improve → Repeat",
  },
  contact: {
    kicker: "06 — Contact",
    heading: "Let's build something.",
    message: "Have an idea, project or opportunity? Let's connect.",
    email: "hs9675873737@gmail.com",
    phone: "+91 9675873737",
    location: "Rampur, Uttar Pradesh, India",
    socials: {
      github: "https://github.com/Harsharma96",
      linkedin: "https://www.linkedin.com/in/harsh-sharma-65382a24a/",
      instagram: "https://www.instagram.com/haarsh_s._0001/?hl=en",
      twitter: "https://x.com/HarshDot_",
      peerlist: "https://peerlist.io/harsharma",
    },
  },
};
