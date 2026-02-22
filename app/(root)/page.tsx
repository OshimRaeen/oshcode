import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 py-24 flex flex-col gap-32 overflow-hidden transition-colors duration-300">

      
      
      {/* SECTION 1: THE PROBLEM (Text Left, Image Right) */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 shadow-sm dark:shadow-none">
            <Zap className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            The Old Way is Broken
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Stop wasting hours on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-500">localhost setup.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Configuring Webpack, installing dependencies, and wrestling with environment variables kills your momentum. By the time your local server is running, your creative spark is gone.
          </p>
          <ul className="space-y-3 pt-4">
            {["Dependency hell across different machines", "Wasted time configuring package.json", "Lost files and unsaved progress"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
          <Link 
                href="/dashboard" 
                className="px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center justify-center gap-2 shadow-md"
              >
                Start Coding for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
        </div>
        <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent">
                <Image 
                src="/first-problem.png" 
                alt="Developer frustrated with localhost setup"
                fill
                className="object-cover"
                />
            </div>
            
        </div>
      </section>

      {/* SECTION 2: THE SOLUTION / AI EDITOR (Image Left, Text Right) */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 shadow-sm dark:shadow-none">
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            AI-Powered Workflows
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Code at the speed of thought with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">OshCode AI.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Spin up a React, Next.js, or Express environment instantly in your browser. Stuck on a bug? Your integrated AI assistant is right there in the chat, ready to write, refactor, or explain code.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
              <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Instant Playgrounds</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Boot up in &lt; 2 seconds.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
              <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Smart AI Chat</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Context-aware debugging.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent">
                <Image 
                src="/ai.png" 
                alt="OshCode AI Editor Interface"
                fill
                className="object-cover" 
                />
            </div>
        </div>
      </section>

      {/* SECTION 3: OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
        <div className="z-20 flex flex-col items-center justify-start py-2">
      
         <div className="flex flex-col justify-center items-center my-5 w-full">
           <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
             <Image src="/sol.png" alt="Hero-Section" fill className="object-cover" />
           </div>
          
           <h1 className="z-20 text-4xl md:text-6xl mt-8 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-400 tracking-tight leading-[1.3]">
             Code with Intelligence <Sparkles className="inline  m-2 w-10 h-10 text-green-600 dark:text-green-400" />
           </h1>
         </div>
       
         <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-400 px-5 py-6 max-w-2xl">
           OshCode Editor is a powerful and intelligent code editor that enhances
           your coding experience with advanced features and seamless integration.
           It is designed to help you write, debug, and optimize your code
           efficiently.
         </p>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none text-center">
                <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Integrated terminal</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Output on the side</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none text-center">
                <h4 className="text-slate-900 dark:text-white font-semibold mb-1">AI Suggestions</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Help to build faster</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none text-center">
                <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Templates</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Industry-standard</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none text-center">
                <h4 className="text-slate-900 dark:text-white font-semibold mb-1">File Structure</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Easy to navigate</p>
              </div>
          </div>
       </div>
      </section>

      {/* SECTION 4: CONCLUSION & FINAL CTA (Centered Layout) */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 pb-24">
        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 shadow-lg">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl px-8 py-16 flex flex-col items-center transition-colors duration-300">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to transform how you code?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
              Join the developers who are building faster, smarter, and without the setup headaches. Your next great project starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/dashboard" 
                className="px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center justify-center gap-2 shadow-md"
              >
                Start Coding for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/templates" 
                className="px-8 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
              >
                Explore Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}





// import { Button } from "@/components/ui/button";

// import { cn } from "@/lib/utils";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// export default function Home() {
   
//   return (
//     <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      
//       <div className="flex flex-col justify-center items-center my-5">
//       <Image src={"/hero.svg"} alt="Hero-Section" height={500}  width={500}/>
      
//       <h1 className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-500 to-emerald-500 dark:from-emerald-400 dark:via-green-400 dark:to-tourquise-400 tracking-tight leading-[1.3] ">
//         Code with Intelligence
//       </h1>
//       </div>
     

//       <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
//         OshCode Editor is a powerful and intelligent code editor that enhances
//         your coding experience with advanced features and seamless integration.
//         It is designed to help you write, debug, and optimize your code
//         efficiently.
//       </p>
//       <Link href={"/dashboard"}>
//         <Button variant={"brand"} className="mb-4" size={"lg"}>
//           Get Started
//           <ArrowUpRight className="w-3.5 h-3.5" />
//         </Button>
//       </Link>
//     </div>
//   );
// }
