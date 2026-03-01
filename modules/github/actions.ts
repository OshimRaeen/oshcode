"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/modules/auth/actions"
import { redirect } from "next/navigation";

// Define the shape of the GitHub repo data we care about
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  language: string | null;
}

export const getUserGithubRepos = async (): Promise<{ success: boolean; repos?: GithubRepo[]; error?: string }> => {
  const user = await currentUser();
  if (!user?.id) return { success: false, error: "Unauthorized" };

  try {
    // 1. Get the user's GitHub account from the database
    // (Auth.js Prisma Adapter stores OAuth connections in the Account table)
    const githubAccount = await db.account.findFirst({
      where: {
        userId: user.id,
        provider: "github",
      },
    });

    if (!githubAccount || !githubAccount.accessToken) {
      return { success: false, error: "GitHub account not connected." };
    }

    // 2. Fetch repositories from GitHub API
    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=30", {
      headers: {
        Authorization: `Bearer ${githubAccount.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GithubRepo[] = await response.json();
    return { success: true, repos };

  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return { success: false, error: "Failed to fetch repositories." };
  }
};


// Define the file structure for your playground
export interface ImportedFile {
  path: string;
  content: string;
}

export const importGithubRepoToPlayground = async (
  repoFullName: string, 
  defaultBranch: string = "main"
): Promise<{ success: boolean; playgroundId?: string; error?: string }> => {
  const user = await currentUser();
  if (!user?.id) return { success: false, error: "Unauthorized" };

  try {
    const githubAccount = await db.account.findFirst({
      where: { userId: user.id, provider: "github" },
    });

    const token = githubAccount?.accessToken;
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    // 1. Fetch the entire file tree recursively in one request
    const treeRes = await fetch(
      `https://api.github.com/repos/${repoFullName}/git/trees/${defaultBranch}?recursive=1`,
      { headers }
    );

    if (!treeRes.ok) {
      // Sometimes the default branch is 'master' instead of 'main'
      if (treeRes.status === 404 && defaultBranch === "main") {
        return importGithubRepoToPlayground(repoFullName, "master");
      }
      throw new Error("Failed to fetch repository tree");
    }

    const treeData = await treeRes.json();

    // 2. Filter out folders, binary files, and node_modules
    const filesToFetch = treeData.tree.filter((item: any) => {
      const isFile = item.type === "blob";
      const isIgnored = item.path.includes("node_modules/") || 
                        item.path.includes(".git/") ||
                        item.path.endsWith(".png") || 
                        item.path.endsWith(".jpg") || 
                        item.path.endsWith(".ico");
      return isFile && !isIgnored;
    });

    // 3. Fetch the actual raw content for all valid files (in parallel for speed)
    const filePromises = filesToFetch.map(async (file: any): Promise<ImportedFile> => {
      const contentRes = await fetch(
        `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/${file.path}`
      );
      const content = await contentRes.text();
      return { path: file.path, content };
    });

    const importedFiles = await Promise.all(filePromises);

    // 4. Save to your database!
    // NOTE: You will need to adjust this part to match your exact Prisma schema.
    // This assumes you have a way to save files to a playground.
    const newPlayground = await db.playground.create({
      data: {
        title: repoFullName.split("/")[1], // Gets just the repo name
        description: `Imported from ${repoFullName}`,
        template: "GITHUB", // Change this so the frontend knows it's custom!
        customFiles: importedFiles, // Save the actual GitHub files here!
        userId: user.id,
        // If you have a related table for files, create them here:
        // files: { create: importedFiles.map(f => ({ path: f.path, content: f.content })) }
      }
    });

    // We don't redirect inside the try/catch, we just return the ID
    return { success: true, playgroundId: newPlayground.id };

  } catch (error) {
    console.error("Error importing repo:", error);
    return { success: false, error: "Failed to import files." };
  }
};