"use client";

import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function StepSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto w-full">
        <div className="w-16 h-16 bg-green-100 border border-green-200 rounded-full flex items-center justify-center mb-6">
          <BadgeCheck className="w-8 h-8 text-green-700 drop-shadow-sm" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Report Submitted</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Your report has been forwarded to the relevant authorities. Thank you for helping your community.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 mb-8 w-full">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Report ID</p>
          <p className="font-mono text-lg font-bold text-slate-900">CFX-89302</p>
        </div>
        
        <Button 
          type="button" 
          className="w-full h-11 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 text-white" 
          onClick={() => router.push('/explore')}
        >
          Back to Feed
        </Button>
      </div>
    </div>
  );
}
