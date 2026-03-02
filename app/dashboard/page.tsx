import { deletePlaygroundById, duplicatePlaygroundById, editPlaygroundById, getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";

import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  // console.log("Playgrounds:", playgrounds);
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={(playgrounds || []).map(p => ({ 
              ...p, 
              // 1. Fix the description (you already did this)
              description: p.description || "", 
              
              // 2. Fix the user object (name and image might be null)
              user: {
                ...p.user,
                name: p.user.name || "Anonymous Developer", // Fallback if no name exists
                image: p.user.image || "",                  // Fallback if no profile pic exists
              },

              // 3. Fix the customFiles (fallback to an empty object if null)
              customFiles: p.customFiles || {}, 
            }))}
            onDeleteProject={deletePlaygroundById}
            // --- FIX 1: Inject the missing 'template' property ---
            onUpdateProject={async (id, data) => {
              // Find the original project in our array so we know what template it used
              const existingProject = playgrounds?.find((p) => p.id === id);
              
              if (existingProject) {
                await editPlaygroundById(id, {
                  title: data.title,
                  description: data.description,
                  // Pass the existing template back to the database to keep it happy
                  template: existingProject.template as any, 
                });
              }
            }}
            // --- FIX 2: Swallow the return value to satisfy 'void' ---
            onDuplicateProject={async (id) => {
              await duplicatePlaygroundById(id);
              // By not typing 'return await...', this function now correctly returns void
            }}
          />
        )} 
      </div>
    </div>
  );
};

export default Page;
