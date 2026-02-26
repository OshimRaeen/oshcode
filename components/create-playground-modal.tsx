"use client"; // Needs to be a client component for interactivity

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import your existing component here!
// Adjust the path to wherever your addnewButton file is located
import AddNewButton from "@/modules/dashboard/components/add-new";

export const CreatePlaygroundModal = () => {
  return (
    <Dialog>
      {/* 1. THE TRIGGER (The button the user clicks) */}
      <DialogTrigger asChild>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </DialogTrigger>

      {/* 2. THE POP-UP CONTENT */}
      <DialogContent className="sm:max-w-3xl bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Create a New Playground
          </DialogTitle>
        </DialogHeader>
        
        {/* Render your custom template chooser component here */}
        <div className="mt-4">
          <AddNewButton />
        </div>
        
      </DialogContent>
    </Dialog>
  );
};