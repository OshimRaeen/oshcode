import React from 'react'
interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    popularity: number;
    tags: string[];
    features: string[];
    category: "frontend" | "backend" | "fullstack";
}

const templates: Template[] = [
    {
        id: "react",
        name: "React",
        description:
            "A JavaScript library for building user interfaces with component-based architecture",
        icon: "/react.svg",
        color: "#61DAFB",
        popularity: 5,
        tags: ["UI", "Frontend", "JavaScript"],
        features: ["Component-Based", "Virtual DOM", "JSX Support"],
        category: "frontend",
    },
    {
        id: "nextjs",
        name: "Next.js",
        description:
            "The React framework for production with server-side rendering and static site generation",
        icon: "/nextjs-icon.svg",
        color: "#000000",
        popularity: 4,
        tags: ["React", "SSR", "Fullstack"],
        features: ["Server Components", "API Routes", "File-based Routing"],
        category: "fullstack",
    },
    {
        id: "express",
        name: "Express",
        description:
            "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
        icon: "/express.png",
        color: "#000000",
        popularity: 4,
        tags: ["Node.js", "API", "Backend"],
        features: ["Middleware", "Routing", "HTTP Utilities"],
        category: "backend",
    },
    {
        id: "vue",
        name: "Vue.js",
        description:
            "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
        icon: "/vue.svg",
        color: "#4FC08D",
        popularity: 4,
        tags: ["UI", "Frontend", "JavaScript"],
        features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
        category: "frontend",
    },
    {
        id: "hono",
        name: "Hono",
        description:
            "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
        icon: "/hono.svg",
        color: "#e36002",
        popularity: 3,
        tags: ["Node.js", "TypeScript", "Backend"],
        features: [
            "Dependency Injection",
            "TypeScript Support",
            "Modular Architecture",
        ],
        category: "backend",
    },
    {
        id: "angular",
        name: "Angular",
        description:
            "Angular is a web framework that empowers developers to build fast, reliable applications.",
        icon: "/angular-2.svg",
        color: "#DD0031",
        popularity: 3,
        tags: ["React", "Fullstack", "JavaScript"],
        features: [
            "Reactive Data Binding",
            "Component System",
            "Virtual DOM",
            "Dependency Injection",
            "TypeScript Support",
        ],
        category: "fullstack",
    },
];


function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#11BA3C]">Templates Available</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-4 cursor-pointer transition-colors duration-300 ease-in-out hover:border-[#11BA3C] shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(17,186,60,0.15)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={template.icon} alt={template.name} className="w-10 h-10" />
              <h2 className="text-xl font-semibold">{template.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page