"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
  LogOut,
  Monitor,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import path from "path"
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2, // Include the default icon
  // Add any other icons you might use dynamically
}

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, state } = useSidebar()
  
  const starredPlaygrounds = initialPlaygroundData.filter((p) => p.starred);
  const recentPlaygrounds = initialPlaygroundData;

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-1 border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
        </div>
       
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Home">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Star className="h-4 w-4 mr-2" />
            Starred
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add starred playground">
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>

              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 w-full">Create your playground</div>
              ) : (
                starredPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                      >
                        <Link href={`/playground/${playground.id}`}>
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          <span>{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="h-4 w-4 mr-2" />
            Recent
          </SidebarGroupLabel>
          <SidebarGroupAction title="Create new playground">
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? null : (
                recentPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                      >
                        <Link href={`/playground/${playground.id}`}>
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          <span>{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="View all">
                  <Link href="/playgrounds">
                    <span className="text-sm text-muted-foreground">View all playgrounds</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarFooter>
        <SidebarMenu>
          {/* 1. The Collapse Toggle Button */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={toggleSidebar} 
              tooltip={state === "expanded" ? "Collapse Sidebar" : "Expand Sidebar"}
              className="cursor-pointer"
            >
              {state === "expanded" ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
              {/* This text automatically hides when the sidebar collapses */}
              <span>Collapse Sidebar</span> 
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Settings" className="cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              
              {/* side="right" makes it pop out next to the sidebar. 
                  You can also try side="top" if you prefer it above the button! */}
              <PopoverContent side="top" sideOffset={8} className="w-64 p-3 rounded-xl shadow-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-semibold">Theme</span>
                    <div className="flex gap-1">
                      <Button 
                        variant={theme === "light" ? "default" : "ghost"} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={theme === "dark" ? "default" : "ghost"} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={theme === "system" ? "default" : "ghost"} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setTheme("system")}
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-px bg-border w-full" />

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
 