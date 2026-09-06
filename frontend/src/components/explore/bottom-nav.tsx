"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, List, Trophy, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-50 flex items-center justify-around px-4 lg:hidden pb-safe">
      <Link href="/explore" className={`flex flex-col items-center gap-1 ${pathname === '/explore' ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}>
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium">Explore</span>
      </Link>
      <Link href="/explore/feed" className={`flex flex-col items-center gap-1 ${pathname === '/explore/feed' ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}>
        <List className="w-5 h-5" />
        <span className="text-[10px] font-medium">Feed</span>
      </Link>
      
      {/* Floating Center Action */}
      <Link href="/explore/report" className="relative -top-5 flex flex-col items-center group">
        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_0_4px_white] transition-transform group-hover:scale-105 group-active:scale-95">
          <Plus className="w-6 h-6" />
        </div>
      </Link>
      
      <Link href="/explore/leaderboard" className={`flex flex-col items-center gap-1 ${pathname === '/explore/leaderboard' ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}>
        <Trophy className="w-5 h-5" />
        <span className="text-[10px] font-medium">Rank</span>
      </Link>
      <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
}
