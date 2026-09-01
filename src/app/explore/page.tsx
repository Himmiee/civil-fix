"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Map as MapIcon, Plus, FileText, CheckCircle2, Users, TrendingUp, Trophy } from "lucide-react";
import Image from "next/image";
import IssueCard from "@/components/explore/issue-card";

// Reusable pill component for filters
function FilterPill({ label, icon, active = false, dotColor }: { label: string; icon?: React.ReactNode; active?: boolean; dotColor?: string }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
      active ? "bg-primary text-white border-primary" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    }`}>
      {dotColor && (
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      )}
      {icon}
      {label}
    </button>
  );
}

export default function ExploreDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-350 mx-auto min-h-screen relative">
      
      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
        
        {/* LEFT/CENTER COLUMN (Map + Recent Issues) */}
        <div className="lg:col-span-2">
          
          {/* 1. Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              What's happening in your community?
            </h1>
            <p className="text-slate-500 font-medium">
              Explore reported issues around you and help make your community better.
            </p>
          </div>

          {/* 2. Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <FilterPill label="All Issues" active />
            <FilterPill label="Potholes" dotColor="bg-red-500" />
            <FilterPill label="Streetlights" dotColor="bg-amber-500" />
            <FilterPill label="Drainage" dotColor="bg-blue-500" />
            <FilterPill label="Waste" dotColor="bg-emerald-500" />
            
            <div className="h-6 w-px bg-slate-200 mx-2" />
            
            <FilterPill label="Filters" icon={<Filter className="w-4 h-4" />} />
          </div>
          
          {/* Map Container */}
          <div className="w-full h-125 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative mb-8 group">
            {/* Map Static Image (Reused from landing page) */}
            <Image
              src="/hero_map_clean.png"
              alt="Map"
              fill
              className="object-cover"
            />
            
            {/* Interactive Map Pin & Hover Popup */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer">
              {/* Map Pin */}
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-transform group-hover/pin:scale-110">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              {/* Hover Popup */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white p-3 rounded-xl border border-slate-200 w-64 opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100 transition-all origin-bottom duration-200 z-10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-sm">High Severity</span>
                  <span className="text-[10px] font-mono text-slate-500">CFX-20481</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">Deep Pothole on Herbert Macaulay Way</h4>
                <p className="text-xs text-slate-500 flex items-center mb-2">
                  <MapIcon className="w-3 h-3 mr-1" />
                  Yaba, Lagos
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-amber-600">In Progress</span>
                  <span className="text-primary font-semibold hover:underline">View Details</span>
                </div>
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 filter drop-shadow-[0_1px_0_#e2e8f0]" />
              </div>
            </div>
          </div>

          {/* Recent Issues Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Issues</h2>
              <Button variant="link" className="text-primary font-semibold">View all</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <IssueCard 
                id="CFX-20481" 
                title="Deep Pothole on Herbert Macaulay Way" 
                location="Yaba, Lagos" 
                category="Pothole" 
                status="In Progress" 
                severity="High" 
                upvotes={24} 
                imageUrl="/pothole.png"
              />
              <IssueCard 
                id="CFX-20480" 
                title="Streetlight not working" 
                location="Ikoyi, Lagos" 
                category="Lighting" 
                status="Reported" 
                severity="Mid" 
                upvotes={8} 
              />
              <IssueCard 
                id="CFX-20475" 
                title="Waste overflow at Banana Island" 
                location="Ikoyi, Lagos" 
                category="Waste" 
                status="Resolved" 
                severity="Low" 
                upvotes={56} 
              />
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (Widgets) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Community Impact Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-[15px]">Community Impact</h3>
              <Button variant="link" className="text-primary h-auto p-0 text-xs font-semibold">View all</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-2xl font-black text-slate-900 mb-1">1,248</div>
                <div className="text-xs font-medium text-slate-500">Issues Reported</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-2xl font-black text-slate-900 mb-1">624</div>
                <div className="text-xs font-medium text-slate-500">Issues Resolved</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-2xl font-black text-slate-900 mb-1">4,320</div>
                <div className="text-xs font-medium text-slate-500">Active Citizens</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-2xl font-black text-slate-900 mb-1">2.4 d</div>
                <div className="text-xs font-medium text-slate-500">Avg. Resolution Time</div>
              </div>
            </div>
          </div>

          {/* Top Contributors Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-[15px]">Top Contributors</h3>
              <Button variant="link" className="text-primary font-semibold h-auto p-0 text-xs">View all</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { rank: 1, name: "Adebayo T.", xp: "3,950 XP" },
                { rank: 2, name: "Maryam K.", xp: "2,750 XP" },
                { rank: 3, name: "Chinedu O.", xp: "2,300 XP" },
                { rank: 4, name: "Fatima A.", xp: "1,800 XP" },
                { rank: 5, name: "Ibrahim U.", xp: "1,650 XP" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {user.rank}
                    </div>
                    <Image src="https://github.com/shadcn.png" alt={user.name} width={32} height={32} className="rounded-full border border-slate-200" />
                    <span className="font-semibold text-sm text-slate-700">{user.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{user.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Widget */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 relative overflow-hidden flex flex-col items-start">
            <h3 className="font-bold text-blue-900 text-[15px] mb-1.5 z-10 leading-snug">Help your community<br/>and earn rewards</h3>
            <p className="text-[11px] text-blue-700/80 font-medium mb-4 z-10 max-w-35">
              Confirm reports, earn XP, and climb the leaderboard.
            </p>
            <Button variant="outline" className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold h-8 rounded-md text-xs px-4 z-10">
              View Leaderboard
            </Button>
            
            {/* Trophy Icon Decoration */}
            <div className="absolute -right-2.5 -bottom-2.5 opacity-20 transform rotate-[-15deg] pointer-events-none">
              <Trophy className="w-24 h-24 text-blue-600" />
            </div>
          </div>

        </div>

      </div>

      <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
        <Button size="lg" className="h-14 rounded-full px-6 shadow-lg bg-primary hover:bg-primary/90 text-white font-semibold text-base flex items-center gap-2 group transition-all hover:scale-105 active:scale-95">
          <Plus className="h-5 w-5" />
          Report an Issue
        </Button>
      </div>

    </div>
  );
}
