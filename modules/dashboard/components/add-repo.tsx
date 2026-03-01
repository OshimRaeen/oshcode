"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Loader2, Search } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Import your server action (adjust the path as needed)
import { useRouter } from "next/navigation"; // <-- Add this
import { getUserGithubRepos, importGithubRepoToPlayground, type GithubRepo } from "@/modules/github/actions"

const AddRepo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();
  // Fetch repos only when the dialog opens
  useEffect(() => {
    if (isOpen && repos.length === 0) {
      fetchRepos();
    }
  }, [isOpen]);

  const fetchRepos = async () => {
    setIsLoading(true);
    setError(null);
    
    const res = await getUserGithubRepos();
    if (res.success && res.repos) {
      setRepos(res.repos);
    } else {
      setError(res.error || "Failed to load repositories");
    }
    
    setIsLoading(false);
  };

 const handleImportRepo = async (repo: GithubRepo) => {
    setIsImporting(true);
    try {
      toast.loading(`Importing ${repo.name}...`, { id: "import-toast" });
      
      // Call our new server action!
      // We pass repo.full_name because it includes the owner (e.g., "facebook/react")
      const res = await importGithubRepoToPlayground(repo.full_name, "main");
      
      if (res.success && res.playgroundId) {
        toast.success(`Successfully imported ${repo.name}!`, { id: "import-toast" });
        setIsOpen(false);
        
        // Redirect the user directly into their new playground
        router.push(`/playground/${res.playgroundId}`);
      } else {
        toast.error(res.error || "Failed to import repository", { id: "import-toast" });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: "import-toast" });
    } finally {
      setIsImporting(false);
    }
  };

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* 1. We wrap your exact UI card in the DialogTrigger */}
      <DialogTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:bg-background hover:border-[#11BA3C] hover:scale-[1.02]
          shadow-[0_2px_10px_rgba(0,0,0,0.08)]
          hover:shadow-[0_10px_30px_rgba(17,186,60,0.15)]"
        >
          <div className="flex flex-row justify-center items-start gap-4">
            <Button
              variant={"outline"}
              className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#11BA3C] group-hover:text-[#11BA3C] transition-colors duration-300 pointer-events-none"
              size={"icon"}
            >
              <ArrowDown size={30} className="transition-transform duration-300 group-hover:translate-y-1" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-[#11BA3C]">Open Github Repository</h1>
              <p className="text-sm text-muted-foreground max-w-[220px]">Work with your repositories in our editor</p>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <Image
              src={"/github.svg"}
              alt="Open GitHub repository"
              width={150}
              height={150}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </DialogTrigger>

      {/* 2. The Modal that appears when you click the card */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Import Repository
          </DialogTitle>
          <DialogDescription>
            Select a GitHub repository to use as a starting point.
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-destructive mb-4">{error}</p>
            {error.includes("not connected") && (
              <Button variant="outline" onClick={() => toast.info("Go to Settings to connect GitHub")}>
                Connect GitHub Account
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[300px] rounded-md border p-2">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  No repositories found.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredRepos.map((repo) => (
                    <div 
                      key={repo.id} 
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate">{repo.name}</span>
                        {repo.language && (
                          <span className="text-xs text-muted-foreground">{repo.language}</span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleImportRepo(repo)}
                        disabled={isImporting}
                        className="bg-[#11BA3C] hover:bg-[#0e9931] text-white"
                      >
                        {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Import"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddRepo