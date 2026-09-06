"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Filter, Plus, Trophy } from "lucide-react";
import Image from "next/image";
import IssueCard from "@/components/explore/issue-card";
import MapView from "@/components/explore/map-view";
import type { MapIssue } from "@/components/explore/map-content";

// Mock Issues
const MOCK_ISSUES: MapIssue[] = [
  { id: "CFX-20481", title: "Deep Pothole on Herbert Macaulay Way", location: "Yaba, Lagos", lat: 6.5028, lng: 3.3736, category: "Pothole", status: "In Progress", severity: "High", upvotes: 24, imageUrl: "/pothole.png" },
  { id: "CFX-20480", title: "Streetlight not working", location: "Ikoyi, Lagos", lat: 6.4531, lng: 3.4391, category: "Lighting", status: "Reported", severity: "Mid", upvotes: 8 },
  { id: "CFX-20475", title: "Waste overflow at Banana Island", location: "Ikoyi, Lagos", lat: 6.4632, lng: 3.4658, category: "Waste", status: "Resolved", severity: "Low", upvotes: 56 },
  { id: "CFX-20490", title: "Blocked Drainage", location: "Surulere, Lagos", lat: 6.4947, lng: 3.3444, category: "Drainage", status: "Reported", severity: "High", upvotes: 42 },
];

const CATEGORIES = [
  { label: "All Issues", value: "all", dotColor: "" },
  { label: "Potholes", value: "Pothole", dotColor: "bg-red-500" },
  { label: "Streetlights", value: "Lighting", dotColor: "bg-amber-500" },
  { label: "Drainage", value: "Drainage", dotColor: "bg-blue-500" },
  { label: "Waste", value: "Waste", dotColor: "bg-emerald-500" },
];

function FilterPill({ label, icon, active = false, dotColor, onClick }: { label: string; icon?: React.ReactNode; active?: boolean; dotColor?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const filteredIssues = activeCategory === "all" 
    ? MOCK_ISSUES 
    : MOCK_ISSUES.filter(issue => issue.category === activeCategory);

  return (
    <div className="p-6 md:p-8 max-w-350 mx-auto min-h-screen relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
        
        {/* LEFT/CENTER COLUMN */}
        <div className="lg:col-span-2">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              What's happening in your community?
            </h1>
            <p className="text-slate-500 font-medium">
              Explore reported issues around you and help make your community better.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {CATEGORIES.map(cat => (
              <FilterPill 
                key={cat.value}
                label={cat.label} 
                dotColor={cat.dotColor}
                active={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
              />
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <FilterPill label="Filters" icon={<Filter className="w-4 h-4" />} />
          </div>
          
          {/* Map Container */}
          <div className="w-full h-125 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative mb-8 z-0">
            <MapView issues={filteredIssues} activeIssueId={activeIssueId} />
          </div>

          {/* Recent Issues Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Issues</h2>
              <Button variant="link" className="text-primary font-semibold">View all</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIssues.length === 0 ? (
                <div className="col-span-full py-8 text-center text-slate-500">No issues found for this category.</div>
              ) : (
                filteredIssues.map(issue => (
                  <div key={issue.id} onMouseEnter={() => setActiveIssueId(issue.id)} onMouseLeave={() => setActiveIssueId(null)}>
                    <IssueCard 
                      id={issue.id} 
                      title={issue.title} 
                      location={issue.location} 
                      category={issue.category} 
                      status={issue.status} 
                      severity={issue.severity} 
                      upvotes={issue.upvotes} 
                      imageUrl={issue.imageUrl}
                    />
                  </div>
                ))
              )}
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
            
            <div className="absolute -right-2.5 -bottom-2.5 opacity-20 transform rotate-[-15deg] pointer-events-none">
              <Trophy className="w-24 h-24 text-blue-600" />
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
        <Link href="/explore/report">
          <Button size="lg" className="h-14 rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-semibold text-base flex items-center gap-2 group transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
            <Plus className="h-5 w-5" />
            Report an Issue
          </Button>
        </Link>
      </div>
    </div>
  );
}
