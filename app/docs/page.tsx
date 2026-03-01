"use client";

import { useState } from "react";
import { ChevronRight, Github, Terminal, Zap, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- DOCS DATA STRUCTURE ---
const docsNavigation = [
  { id: "getting-started", title: "Getting Started", icon: Zap },
  { id: "github-integration", title: "GitHub Integration", icon: Github },
  { id: "webcontainers", title: "The Editor Environment", icon: Terminal },
  { id: "faq", title: "Troubleshooting & FAQ", icon: HelpCircle },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  // Helper function to smooth scroll to sections
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset by 100px to account for your floating navbar!
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-zinc-900 dark:text-zinc-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Desktop) --- */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="font-semibold text-lg mb-4 px-3">Documentation</h3>
            <nav className="flex flex-col gap-1">
              {docsNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                      ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <main className="flex-1 min-w-0">
          <div className="prose prose-zinc dark:prose-invert max-w-4xl prose-headings:scroll-mt-28">
            
            <div className="mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight mb-4">OshCode Documentation</h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Learn how to build, import, and run full-stack applications entirely inside your browser using OshCode.
              </p>
            </div>

            {/* Section 1: Getting Started */}
            <section id="getting-started" className="mb-16">
              <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-emerald-500" /> Getting Started
              </h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                OshCode is a next-generation browser-based IDE. Instead of sending code to a remote server to be executed, OshCode boots a literal Node.js environment directly inside your browser tab.
              </p>
              <h3 className="text-xl font-semibold mb-3 mt-8">Creating a Playground</h3>
              <ol className="list-decimal pl-6 space-y-2 text-zinc-600 dark:text-zinc-300">
                <li>Navigate to your Dashboard.</li>
                <li>Click on one of the starter templates (React, Vue, Express, Hono).</li>
                <li>Wait a few seconds for the WebContainer to boot and install dependencies.</li>
                <li>Start coding! The preview window will update automatically.</li>
              </ol>
            </section>

            {/* Section 2: GitHub Integration */}
            <section id="github-integration" className="mb-16">
              <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 flex items-center gap-2">
                <Github className="h-6 w-6 text-emerald-500" /> GitHub Integration
              </h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                You can import existing projects directly from GitHub into OshCode.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 my-6">
                <h4 className="font-semibold mb-2">Import Limitations</h4>
                <ul className="list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li><strong>Environment Variables:</strong> `.env` files are not imported from GitHub for security reasons. You must recreate them in the editor.</li>
                  <li><strong>Binary Files:</strong> Large images, videos, or compiled binaries are currently filtered out to preserve browser memory.</li>
                </ul>
              </div>
            </section>

            {/* Section 3: WebContainers */}
            <section id="webcontainers" className="mb-16">
              <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 flex items-center gap-2">
                <Terminal className="h-6 w-6 text-emerald-500" /> The Editor Environment
              </h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                Because OshCode runs Node.js in the browser, there are a few important differences from a standard local environment.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">Code with AI </h3>
              <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                User can use AI-powered code completion and suggestions in the editor, enhancing productivity and reducing errors.To enable this feature, simply click on the "AI Assist" button in the editor toolbar. This will activate the AI assistant, which can provide code suggestions, generate boilerplate code, and even help debug issues in real-time as you code.For inline-suggestion users, the AI assistant will analyze your code context and offer relevant suggestions directly within the editor. You can accept, reject, or modify these suggestions(just with using tab keyword) as needed to fit your coding style and requirements.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-8">Vite & Networking</h3>
              <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                By default, dev servers like Vite only broadcast to `localhost`. Because your app is running inside an iframe, the preview window cannot see `localhost`.
              </p>
              <div className="bg-zinc-950 rounded-lg p-4 mb-6 shadow-inner">
                <p className="text-sm text-zinc-400 mb-2">Change your package.json dev script:</p>
                <code className="text-emerald-400 font-mono text-sm">
                  "dev": "vite --host"
                </code>
              </div>

              <h3 className="text-xl font-semibold mb-3">Unsupported Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-300">
                <li>Native C++ Addons (e.g., standard `bcrypt`. Use `bcryptjs` instead).</li>
                <li>Local databases (like installing MongoDB locally). Use cloud providers like MongoDB Atlas or Supabase.</li>
              </ul>
            </section>

            {/* Section 4: FAQ */}
            <section id="faq" className="mb-16">
              <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-emerald-500" /> Troubleshooting
              </h2>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-bold text-lg">Why is my React app stuck on "Installing Dependencies"?</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                    If your imported project includes a `package-lock.json` or `yarn.lock` generated on a Mac/Windows machine, the browser will fail to install native OS dependencies. Delete the lockfile and run `npm install` again.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Why are Next.js,React,Vue apps running slowly?</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                    They are  massive framework that requires intense compilation. Running this process purely in WebAssembly inside your browser's memory is currently at the bleeding edge of web technology. It is normal for initial loads to take longer.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Why I am getting the previously loaded project,when I open a new playground/template?</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                    This is a known issue with WebContainers where the file system can sometimes persist across sessions. To fix this, try hard refreshing the page (Cmd+Shift+R on Mac, Ctrl+F5 on Windows) to clear the in-memory file system and load the new template.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Why I am not able to fetch my Github Repo,when clicked on Open Github Repository?</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                    Due to CORS restrictions in the browser, OshCode cannot directly fetch private or public GitHub repositories. To work around this, sign in with the same email you used to create your GitHub account. This allows OshCode to authenticate and access your repositories securely.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}