"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserMenu from "./user-menu";

/**
 * Reusable Global Search Input for the header.
 */
function GlobalSearch() {
  return (
    <div className="hidden md:flex items-center bg-white px-4 py-1.5 rounded-lg border border-slate-200 w-full max-w-md">
      <Search className="h-4 w-4 text-slate-400 mr-2" />
      <Input 
        type="text" 
        placeholder="Search issues, locations, or tracking IDs..." 
        className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 placeholder:text-slate-400 h-8 text-sm font-medium"
      />
      <div className="flex items-center gap-1 ml-2">
        <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-400">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}

/**
 * The Static Top Header for the Dashboard.
 */
export default function Header() {
  // Toggle this to test Guest vs Auth states during development
  const [isAuth, setIsAuth] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6">
      
      {/* Left: Branding */}
      <div className="flex items-center w-55">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/civicfix_logo_icon.png"
            alt="CivicFix Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">CivicFix</span>
        </Link>
      </div>

      {/* Middle: Global Search */}
      <div className="flex-1 flex justify-center px-6">
        <GlobalSearch />
      </div>

      {/* Right: Auth / Guest State Actions */}
      <div className="flex items-center gap-3 w-55 justify-end">
        {isAuth ? (
          <>
            <Button variant="outline" size="icon" className="rounded-md h-10 w-10 bg-white border-slate-200 hover:bg-slate-50">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            
            <UserMenu 
              name="Haliyah Tijani" 
              level={4} 
              xp={1450} 
              onLogout={() => setIsAuth(false)} 
            />
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="h-10 rounded-md font-semibold text-slate-700 hover:bg-slate-50 hidden sm:flex border border-slate-200 transition-all" 
              onClick={() => setIsAuth(true)}
            >
              Track Report
            </Button>
            <Button 
              className="h-10 rounded-md font-semibold px-5 bg-primary hover:bg-primary/90 text-white" 
              onClick={() => setIsAuth(true)}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
