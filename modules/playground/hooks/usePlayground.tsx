import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import type { TemplateFolder,TemplateFile} from "../lib/path-to-json";
import { getPlaygroundById, SaveUpdatedCode } from "../actions";

interface PlaygroundData {
  id: string;
  title?: string;
  template?: string;
  customFiles?: any; 
  templateFiles?: { content: any }[]; // Ensure this matches what getPlaygroundById returns
  [key: string]: any;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

//2. Update the helper function to output the EXACT types from path-to-json.ts
const buildFileTree = (flatFiles: { path: string; content: string }[]): (TemplateFolder | TemplateFile)[] => {
  const rootItems: (TemplateFolder | TemplateFile)[] = [];

  flatFiles.forEach((file) => {
    const parts = file.path.split("/");
    let currentLevel = rootItems;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      
      // Look for an existing folder/file at this level
      let existing = currentLevel.find((item) => {
        if ('folderName' in item) return item.folderName === part; // It's a folder
        // It's a file, reconstruct the full name to check
        const fullFileName = item.fileExtension ? `${item.filename}.${item.fileExtension}` : item.filename;
        return fullFileName === part;
      });

      if (!existing) {
        if (isFile) {
          // It's a file. We must match the TemplateFile interface perfectly.
          // Example part: "App.tsx" -> filename: "App", fileExtension: "tsx"
          const dotIndex = part.lastIndexOf('.');
          let filename = part;
          let fileExtension = "";
          
          if (dotIndex > 0) { // > 0 to handle hidden files like .gitignore properly
            filename = part.substring(0, dotIndex);
            fileExtension = part.substring(dotIndex + 1);
          } else if (dotIndex === 0) {
             filename = part; // e.g. .gitignore
             fileExtension = "";
          }

          const newFile: TemplateFile = {
            filename,
            fileExtension,
            content: file.content
          };
          currentLevel.push(newFile);
          
        } else {
          // It's a folder. We must match the TemplateFolder interface perfectly.
          const newFolder: TemplateFolder = {
            folderName: part,
            items: []
          };
          currentLevel.push(newFolder);
          existing = newFolder;
        }
      }

      // If we just processed or found a folder, move down a level
      if (existing && 'items' in existing) {
        currentLevel = existing.items;
      }
    });
  });

  return rootItems;
};

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(
    null
  );
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getPlaygroundById(id);

      //   @ts-ignore
      setPlaygroundData(data);
      const rawContent = data?.templateFiles?.[0]?.content;

      if (typeof rawContent === "string") {
        const parsedContent = JSON.parse(rawContent);
        setTemplateData(parsedContent);
        toast.success("playground loaded successfully");
        return;
      }

      // 2. NEW: Check if this is a GitHub import
      if (data?.template === "GITHUB") {
        if (data?.customFiles) {
          // 1. Tell TypeScript to treat this JSON as an array of 'any' objects first
          const filesArray = data.customFiles as any[];
         // 2. Safely check if it's a flat array (fixing the "possibly null" error)
          const isFlatArray = 
            Array.isArray(filesArray) && 
            filesArray.length > 0 && 
            filesArray[0] && 
            typeof filesArray[0].path === "string";
          
          // 3. Cast the data explicitly for the buildFileTree function OR the treeItems assignment
          const treeItems = isFlatArray 
            ? buildFileTree(filesArray as { path: string; content: string }[]) 
            : (filesArray as (TemplateFolder | TemplateFile)[]);

          setTemplateData({
            folderName: "Root",
            items: treeItems,
          });
          toast.success("GitHub repository loaded");
        } else {
          // If customFiles is missing or empty, load an empty editor instead of crashing
          setTemplateData({ folderName: "Root", items: [] });
          toast.warning("Repository imported, but no valid code files were found.");
        }
        
        return; // CRITICAL: Always exit early for GITHUB so it doesn't 404!
      }
      

      //   load template from api if not in saved content

      const res = await fetch(`/api/template/${id}`);

      if (!res.ok) throw new Error(`Failed to load template: ${res.status}`);

      const templateRes = await res.json();

      if (templateRes.templateJson && Array.isArray(templateRes.templateJson)) {
        setTemplateData({
          folderName: "Root",
          items: templateRes.templateJson,
        });
      } else {
        setTemplateData(
          templateRes.templateJson || {
            folderName: "Root",
            items: [],
          }
        );
      }
      toast.success("Template loaded successfully");
    } catch (error) {
      console.error("Error loading playground:", error);
      setError("Failed to load playground data");
      toast.error("Failed to load playground data");
    } finally {
      setIsLoading(false);
    }
  }, [id]);



  const saveTemplateData = useCallback(async(data:TemplateFolder)=>{
    try {
          await SaveUpdatedCode(id, data);
      setTemplateData(data);
      toast.success("Changes saved successfully");
    } catch (error) {
         console.error("Error saving template data:", error);
      toast.error("Failed to save changes");
      throw error;
    }
  },[id])


  useEffect(()=>{
    loadPlayground()
  },[loadPlayground])

    return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  };
};
