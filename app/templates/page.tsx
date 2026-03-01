"use client";

import React, { useState } from "react";
import { CreatePlaygroundModal } from "@/components/create-playground-modal";
import { Search, Star, Layers } from "lucide-react";

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
    description: "A JavaScript library for building user interfaces with component-based architecture",
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
    description: "The React framework for production with server-side rendering and static site generation",
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
    description: "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
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
    description: "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
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
    description: "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
    icon: "/hono.svg",
    color: "#e36002",
    popularity: 3,
    tags: ["Node.js", "TypeScript", "Backend"],
    features: ["Dependency Injection", "TypeScript Support", "Modular Architecture"],
    category: "backend",
  },
  {
    id: "angular",
    name: "Angular",
    description: "Angular is a web framework that empowers developers to build fast, reliable applications.",
    icon: "/angular-2.svg",
    color: "#DD0031",
    popularity: 3,
    tags: ["React", "Fullstack", "JavaScript"],
    features: ["Reactive Data Binding", "Component System", "Virtual DOM", "TypeScript Support"],
    category: "fullstack",
  },
];

const categories = [
  { id: "all", label: "All Templates" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Fullstack" },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter templates by Search AND Category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-zinc-900 dark:text-zinc-50 pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Ambient Glow using your brand color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#11BA3C]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Hero Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Developer <span className="text-[#11BA3C]">Templates</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Jumpstart your next project. Choose a configured environment and start coding instantly in your browser.
            </p>
          </div>
          
          {/* Main Action Modal (From your original code) */}
          <div className="shrink-0 flex items-center gap-4">
            <CreatePlaygroundModal />
          </div>
        </div>

        {/* --- Controls: Search & Filters --- */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 hide-scrollbar gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                  ${
                    activeCategory === cat.id
                      ? "bg-[#11BA3C] text-white shadow-md shadow-[#11BA3C]/20"
                      : "bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#11BA3C]/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* --- Templates Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative flex flex-col bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(17,186,60,0.15)] hover:border-[#11BA3C]/50"
            >
              {/* Header: Icon, Name, and Popularity */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
                    <img src={template.icon} alt={template.name} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {template.name}
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {template.category}
                    </p>
                  </div>
                </div>

                {/* Popularity Stars */}
                <div className="flex items-center gap-0.5" title={`Popularity: ${template.popularity}/5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3.5 w-3.5 ${i < template.popularity ? "text-yellow-500 fill-yellow-500" : "text-zinc-300 dark:text-zinc-700"}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                {template.description}
              </p>

              {/* Tags & Features */}
              <div className="mt-auto space-y-4">
                
                {/* Features Checklist */}
                <ul className="space-y-1.5 mb-4">
                  {template.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="text-[#11BA3C]">✓</span> {feature}
                    </li>
                  ))}
                  {template.features.length > 2 && (
                    <li className="text-xs text-zinc-400 dark:text-zinc-600 italic">
                      + {template.features.length - 2} more features
                    </li>
                  )}
                </ul>

                {/* Tags Bottom Row */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-wide uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Search */}
        {filteredTemplates.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl mt-6">
            <div className="inline-flex p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
              <Search className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No templates found</h3>
            <p className="text-zinc-500">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-6 text-[#11BA3C] hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}