"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapIssue } from "./map-content";

// Dynamically import the map content component with SSR disabled
const MapContent = dynamic(() => import("./map-content"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  ),
});

interface MapViewProps {
  issues: MapIssue[];
  activeIssueId?: string | null;
}

export default function MapView({ issues, activeIssueId = null }: MapViewProps) {
  return (
    <div className="w-full h-full relative z-10">
      <MapContent issues={issues} activeIssueId={activeIssueId} />
    </div>
  );
}
