export interface TechSnippet {
  id: string;
  name: string;
  tagline: string;
  filename: string;
  language: string;
  code: string;
  output: string;
  status: string;
}

export const techSnippets: Record<string, TechSnippet> = {
  "C#": {
    id: "csharp",
    name: "C#",
    tagline: "Powered by Caffeine & Stack Overflow ☕",
    filename: "harsh.cs",
    language: "csharp",
    code: `while (coffee.IsHot()) {
  try {
    harsh.WriteCode();
  } catch (Exception) {
    // StackOverflow saves the day! 🚀
    stackOverflow.CopyPaste();
  }
}`,
    output: "Powered by Caffeine & Stack Overflow ☕",
    status: "Exit Code 0 (Success)",
  },
  ".NET": {
    id: "dotnet",
    name: ".NET",
    tagline: "Making Bugs Feel Welcome 🐞",
    filename: "Program.cs",
    language: "csharp",
    code: `var bug = new Bug("Prod Issue");

if (bug.Exists) {
  // Works on my machine! ¯\\_(ツ)_/¯
  bug.MarkAsFeature();
}`,
    output: "Making Bugs Feel Welcome 🐞",
    status: "200 OK (Feature Released)",
  },
  MySQL: {
    id: "mysql",
    name: "MySQL",
    tagline: "I Know Where Your Data Lives 👀",
    filename: "secrets.sql",
    language: "sql",
    code: `SELECT * FROM users 
WHERE history LIKE '%center div%'
   OR excuse LIKE '%server down%';

-- Harsh knows. Harsh always knows. 💀`,
    output: "I Know Where Your Data Lives 👀",
    status: "1 Row Matched (0.002s)",
  },
  "Next.js": {
    id: "nextjs",
    name: "Next.js",
    tagline: "Because “Next” Sounds Professional 🚀",
    filename: "page.tsx",
    language: "typescript",
    code: `export default function Career() {
  const role = "Next.js Developer";
  // Sounds 10x more professional! 😎
  return role.deploy();
}`,
    output: "Because “Next” Sounds Professional 🚀",
    status: "Fast Refresh 42ms",
  },
  HTML: {
    id: "html",
    name: "HTML",
    tagline: "Just One More <div> 📦",
    filename: "index.html",
    language: "html",
    code: `<div class="final-fix">
  <div class="wrapper">
    <div class="last-div">
      <p>Last div, I swear! 😂</p>
    </div>
  </div>
</div>`,
    output: "Just One More <div> 📦",
    status: "DOM Rendered (1,024 Divs)",
  },
  CSS: {
    id: "css",
    name: "CSS",
    tagline: "Trust Me, It's Centered. 🎯",
    filename: "styles.css",
    language: "css",
    code: `.element {
  margin: 0 auto; /* failed */
  text-align: center; /* nope */
  position: absolute;
  /* Centered! 🎯 */
  transform: translate(-50%, -50%);
}`,
    output: "Trust Me, It's Centered. 🎯",
    status: "Perfect Coordinates (50%, 50%)",
  },
  "Git / GitHub": {
    id: "github",
    name: "GitHub",
    tagline: "Push First. Think Later. 💀",
    filename: "deploy.sh",
    language: "bash",
    code: `git commit -m "fixed bug (i hope)"
git push origin main --force

# 5 minutes later in production...
git checkout -b revert-everything 😭`,
    output: "Push First. Think Later. 💀",
    status: "Production Deployed 🚀",
  },
};
