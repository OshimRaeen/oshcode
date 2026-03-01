import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react"
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OshCode",
  description: "Code in the browser with OshCode - your AI-powered online IDE. Write, run, and share code effortlessly with real-time collaboration and AI assistance. Experience the future of coding today!",
  icons: {
    icon: { url: "/icon.png", type: "image/svg+xml", sizes: "any" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session=await auth()

  return (
    <SessionProvider session={session}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <div className="flex flex-col min-h-screen">
              <Toaster/>
              <div className="flex-1">{children}</div>
            </div>
            
          </ThemeProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
