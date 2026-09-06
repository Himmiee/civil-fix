"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  name: string;
  level: number;
  xp: number;
  onLogout: () => void;
}

/**
 * Reusable authenticated user dropdown menu.
 * Encapsulates the Avatar and Shadcn DropdownMenu boilerplate.
 */
export default function UserMenu({ name, level, xp, onLogout }: UserMenuProps) {
  // Extract initials for fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-11 w-11 flex items-center justify-center rounded-xl p-0 border border-slate-200 bg-white hover:bg-slate-50 overflow-hidden outline-none">
        <Avatar className="h-full w-full rounded-none">
          {/* TODO: Replace with real user image */}
          <AvatarImage src="https://github.com/shadcn.png" alt={`@${name}`} className="object-cover" />
          <AvatarFallback className="rounded-none font-semibold text-slate-600">{initials}</AvatarFallback>
        </Avatar>
        
        {/* Notification Indicator Dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white border-2 border-white">
          4
        </span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 rounded-xl border-slate-200" align="end">
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-slate-900">{name}</p>
            <p className="text-xs leading-none text-slate-500 mt-1.5 font-medium">
              Level {level} • {xp.toLocaleString()} XP
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-slate-100" />
        
        <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 my-1 font-medium text-slate-700">
          Citizen Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 my-1 font-medium text-slate-700">
          My Reports
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 my-1 font-medium text-slate-700">
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-100" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg mx-1 my-1 font-medium" 
          onClick={onLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
