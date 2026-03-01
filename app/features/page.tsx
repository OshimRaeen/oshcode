"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Github, 
  Layers, 
  Star, 
  Copy, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  TerminalSquare, 
  Wand2, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const featureSections = [
  { id: "templates", title: "Starter Templates", icon: Layers },
  { id: "github", title: "GitHub Integration", icon: Github },
  { id: "workspace", title: "Workspace Management", icon: TerminalSquare },
  { id: "ai-engine", title: "AI-Powered IDE", icon: Sparkles },
];

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState("templates");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-zinc-900 dark:text-zinc-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="font-semibold text-lg mb-4 px-3 tracking-tight">Platform Features</h3>
            <nav className="flex flex-col gap-1">
              {featureSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                    ${
                      activeSection === item.id
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl">
            
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Everything you need to build.</h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                OshCode isn't just an editor; it's a complete operating system in your browser. Explore the tools designed to accelerate your workflow.
              </p>
            </div>

            {/* Section 1: Templates */}
            <section id="templates" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Layers className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Instant Templates</h2>
              </div>
              <p className="mb-8 text-zinc-600 dark:text-zinc-400 text-lg">
                Skip the boilerplate. Boot up a full-stack environment in milliseconds with our pre-configured WebContainer templates.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['React', 'Next.js', 'Vue', 'Express', 'Hono','Angular'].map((framework) => (
                  <div key={framework} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center justify-center font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm hover:border-emerald-500/50 transition-colors">
                    {framework}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: GitHub Integration */}
            <section id="github" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                  <Github className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">GitHub Integration</h2>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Github className="w-48 h-48" />
                </div>
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-xl font-bold mb-3">Bring your own code</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Connect your GitHub account and import any repository directly into OshCode. We instantly fetch your file tree, bypass heavy binaries, and load your source code into a blazing-fast browser container.
                  </p>
                  <ul className="space-y-2 font-medium text-sm">
                    <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Instant branch fetching</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Automatic tree building</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Smart dependency caching</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Workspace Management */}
            <section id="workspace" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                  <TerminalSquare className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Workspace Control</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <Star className="h-6 w-6 text-yellow-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Star Favorites</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Pin your most important playgrounds to the top of your dashboard for immediate access.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <Copy className="h-6 w-6 text-blue-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Duplicate & Fork</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Never mess up production. One-click duplicate any workspace to safely experiment with new ideas.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <Edit3 className="h-6 w-6 text-emerald-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Live Renaming</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Keep your dashboard organized by renaming projects and updating descriptions on the fly.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <Trash2 className="h-6 w-6 text-red-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Safe Deletion</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Clean up old code with confidence. Secure deletion ensures your database stays clutter-free.</p>
                </div>
              </div>
            </section>

            {/* Section 4: AI Engine */}
            <section id="ai-engine" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">AI-Powered IDE</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Inline AI Suggestions</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Our Monaco Editor features intelligent "Ghost Text" completions. As you type, the AI anticipates your logic and generates code snippets directly in your file. Just press <kbd className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs mx-1">Tab</kbd> to accept.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <div className="mt-1 p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Context-Aware AI Chat</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Stuck on a bug? Open the integrated AI Chat panel. The assistant reads your current file context and provides targeted explanations, refactoring advice, and terminal commands without you ever leaving the browser.
                    </p>
                  </div>
                </div>
              </div>
              <Link 
                href="/dashboard" 
                className="mt-8 px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center justify-center gap-2 shadow-md"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}