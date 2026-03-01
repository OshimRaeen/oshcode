"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚀 Manage all your links right here! Super easy to add/remove.
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Features", href: "/features", badge: "New" },
    { name: "Templates", href: "/templates" },
    { name: "Docs", href: "/docs" },
   
  ];

  return (
    <header
      className={`
        fixed left-1/2 -translate-x-1/2 z-50 
        transition-all duration-500 ease-in-out 
        flex items-center justify-between
        ${
          isScrolled
            ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 shadow-lg shadow-zinc-200/20 dark:shadow-black/40 backdrop-blur-lg px-4 py-2"
            : "top-0 w-full max-w-full rounded-none border border-transparent border-b-zinc-200/80 dark:border-b-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 shadow-none backdrop-blur-md px-6 py-3"
        }
      `}
    >
      {/* Left Section: Logo & Desktop Nav */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            height={80}
            width={80}
            className={`transition-all duration-500 group-hover:scale-105 ${
              isScrolled ? "scale-90" : "scale-100"
            }`}
          />
          <span className="hidden sm:block font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
            OshCode
          </span>
        </Link>

        {/* Elegant vertical divider - Hidden on mobile */}
        <div className="hidden md:block h-5 w-px bg-zinc-300 dark:bg-zinc-800" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-full transition-all"
            >
              {link.name}
              {/* Automatically renders a badge if you added one in the array above */}
              {link.badge && (
                <span className="flex items-center px-1.5 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section: Actions & Mobile Nav */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Mobile Navigation (Only shows top 2 links to prevent crowding) */}
        <nav className="flex md:hidden items-center gap-3 mr-2">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Features
          </Link>
        </nav>

        <ThemeToggle />

        {/* Elegant vertical divider before User Button */}
        <div className="hidden sm:block h-5 w-px bg-zinc-300 dark:bg-zinc-800 mx-1" />

        <UserButton />
      </div>
    </header>
  );
}