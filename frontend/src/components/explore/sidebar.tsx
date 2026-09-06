"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  PlusCircle, 
  Crosshair, 
  List, 
  Trophy, 
  TrendingUp, 
  HelpCircle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

/**
 * Reusable banner component to upsell guest users into creating an account.
 */
function GuestUpsellBanner({ isCollapsed }: { isCollapsed: boolean }) {
  if (isCollapsed) return null;

  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
      <h4 className="font-semibold text-sm text-slate-900">Make a bigger impact</h4>
      <p className="text-xs text-slate-500 font-medium leading-snug">
        Create a free account to save your reports, earn XP, and climb the leaderboard.
      </p>
      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md h-9 font-semibold text-xs mt-1">
        Create Free Account
      </Button>
      <Button variant="ghost" className="w-full h-8 text-xs font-semibold text-slate-600 hover:text-slate-900 -mt-1 flex items-center justify-center gap-1">
        Learn More <ChevronRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

const NAV_LINKS = [
  { name: "Explore", href: "/explore", icon: Home },
  { name: "Report an Issue", href: "/explore/report", icon: PlusCircle },
  { name: "Track Report", href: "/explore/track", icon: Crosshair },
  { name: "Live Feed", href: "/explore/feed", icon: List },
  { name: "Leaderboard", href: "/explore/leaderboard", icon: Trophy },
  { name: "Impact", href: "/explore/impact", icon: TrendingUp },
  { name: "Help & Support", href: "/explore/support", icon: HelpCircle },
];

/**
 * The Static Left Sidebar for the Explore Dashboard view.
 */
export default function Sidebar({ 
  isCollapsed = false,
  setIsCollapsed 
}: { 
  isCollapsed?: boolean;
  setIsCollapsed?: (val: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={`fixed top-20 left-0 bottom-0 bg-slate-50 border-r border-slate-200 overflow-y-auto z-40 hidden lg:flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-65'}`}>
      
      {/* Navigation Links */}
      <nav className="p-4 space-y-1 flex-1">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-lg font-semibold text-[15px] transition-colors ${
                isActive 
                  ? "bg-white text-primary border border-slate-200" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              title={isCollapsed ? link.name : undefined}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
              {!isCollapsed && link.name}
            </Link>
          );
        })}
      </nav>

      {/* Guest Upsell Banner */}
      <div className="p-4 pb-0">
        <GuestUpsellBanner isCollapsed={!!isCollapsed} />
      </div>

      {/* Footer Links & Collapse Toggle */}
      <div className="p-6 mt-auto">
        {!isCollapsed && (
          <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500 mb-6">
            <Link href="#" className="hover:text-slate-900">About CivicFix</Link>
            <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
            <p className="text-slate-400 mt-2">© 2024 CivicFix</p>
          </div>
        )}
        
        {setIsCollapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 ${isCollapsed ? 'px-0 justify-center' : 'justify-start px-2'}`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Collapse Sidebar
              </>
            )}
          </Button>
        )}
      </div>
    </aside>
  );
}
