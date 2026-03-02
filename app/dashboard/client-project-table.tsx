"use client";

// IMPORTANT: Check this import to make sure it matches your actual ProjectTable location!
import ProjectTable from "@/modules/dashboard/components/project-table";

export default function ClientProjectTable({
  playgrounds,
  deleteAction,
  updateAction,
  duplicateAction
}: {
  playgrounds: any[];
  deleteAction: any;
  updateAction: any;
  duplicateAction: any;
}) {
  return (
    <ProjectTable
      projects={(playgrounds || []).map((p: any) => ({
        ...p,
        description: p.description || "",
        user: {
          ...p.user,
          name: p.user?.name || "Anonymous Developer",
          image: p.user?.image || "",
        },
        customFiles: p.customFiles || {},
      }))}
      onDeleteProject={deleteAction}
      onUpdateProject={async (id: string, data: any) => {
        // We do the exact same logic, but safely on the client side!
        const existingProject = playgrounds?.find((p: any) => p.id === id);
        if (existingProject) {
          await updateAction(id, {
            title: data.title,
            description: data.description,
            template: existingProject.template,
          });
        }
      }}
      onDuplicateProject={async (id: string) => {
        await duplicateAction(id); // Swallows the return value safely
      }}
    />
  );
}