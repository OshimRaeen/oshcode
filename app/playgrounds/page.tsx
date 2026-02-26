import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { PlaygroundCard } from "@/components/playground-card";
import { Code2 } from "lucide-react";

// ✅ Import your new modal wrapper
import { CreatePlaygroundModal } from "@/components/create-playground-modal";

export default async function Page() {
  const playgrounds = await getAllPlaygroundForUser();

  return (
    <div className="flex flex-col justify-start min-h-screen mx-auto max-w-7xl px-6 py-12">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Playgrounds</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and access all your coding environments.
          </p>
        </div>
        
        {/* ✅ Replace the old <Link> with your new Modal Component */}
        <CreatePlaygroundModal />
      </div>

      <div className="w-full">
        {playgrounds && playgrounds.length === 0 ? (
          
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/50">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Code2 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No playgrounds found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              You haven't created any coding environments yet. Start by selecting a template.
            </p>
            
            {/* ✅ Optional: You can also place the modal trigger here so they can click it in the empty state! */}
            <CreatePlaygroundModal />
          </div>

        ) : (
          
          /* Grid Layout for Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playgrounds?.map((playground) => (
              <PlaygroundCard key={playground.id} playground={playground} />
            ))}
          </div>

        )}
      </div>
    </div>
  );
}