"use client";

import { useState } from "react";
import Header from "@/components/explore/header";
import Sidebar from "@/components/explore/sidebar";
import BottomNav from "@/components/explore/bottom-nav";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <Header />
      
      <div className="flex flex-1 pt-20 relative">
        {/* Fixed Left Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-65"}`}>
          {/* We add padding inside the page components rather than here to allow full control per page */}
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
