import Link from "next/link";
import { ArrowRight, Code2, Terminal } from "lucide-react";

interface PlaygroundCardProps {
  playground: {
    id: string;
    title: string;
    description: string | null;
    template: string; // From your Prisma Enum (REACT, NEXTJS, etc.)
  };
}

export const PlaygroundCard = ({ playground }: PlaygroundCardProps) => {
  return (
    <Link href={`/playground/${playground.id}`} className="block h-full">
      <div className="group relative flex flex-col h-full p-6 bg-white dark:bg-[#1e293b]/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
        
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          
          {/* Template Badge */}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {playground.template}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex-1 relative z-10">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {playground.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {playground.description || "No description provided."}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-6 flex items-center text-sm font-medium text-slate-400 group-hover:text-emerald-500 transition-colors relative z-10">
          Open Playground
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};