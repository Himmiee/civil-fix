"use client";

import { MapPin, ThumbsUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type IssueStatus = "Reported" | "Under Review" | "In Progress" | "Resolved";
export type IssueSeverity = "Low" | "Mid" | "High";

export interface IssueCardProps {
  id: string;
  title: string;
  location: string;
  category: string;
  status: IssueStatus;
  severity: IssueSeverity;
  upvotes: number;
  imageUrl?: string;
}

/**
 * Renders the status indicator badge with appropriate colors and icons.
 */
function StatusIndicator({ status }: { status: IssueStatus }) {
  switch (status) {
    case "In Progress":
      return (
        <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </div>
      );
    case "Under Review":
      return (
        <div className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          <AlertCircle className="w-3 h-3 mr-1" />
          Under Review
        </div>
      );
    case "Resolved":
      return (
        <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Resolved
        </div>
      );
    default:
      return (
        <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          <AlertCircle className="w-3 h-3 mr-1" />
          Reported
        </div>
      );
  }
}

/**
 * Renders the severity badge with dynamic coloring.
 */
function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const isHigh = severity === "High";
  return (
    <Badge 
      variant="secondary" 
      className={`text-[10px] ${isHigh ? "bg-red-50 text-red-700 hover:bg-red-50" : "bg-amber-50 text-amber-700 hover:bg-amber-50"}`}
    >
      {severity} Severity
    </Badge>
  );
}

/**
 * Reusable component for displaying an issue report in feeds or lists.
 * Encapsulates all styling and layout for a standard report card.
 */
export default function IssueCard({ id, title, location, category, status, severity, upvotes, imageUrl }: IssueCardProps) {
  // Lower opacity for resolved issues to deprioritize them visually
  const isResolved = status === "Resolved";

  return (
    <div className={`rounded-2xl bg-white border border-slate-200 transition-all hover:border-slate-300 cursor-pointer overflow-hidden flex flex-col ${isResolved ? "opacity-75" : ""}`}>
      {/* Optional Image Cover */}
      {imageUrl && (
        <div className="relative w-full h-36 bg-slate-100 border-b border-slate-100">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            <StatusIndicator status={status} />
          </div>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        {/* Top row: ID and Status (if no image) */}
        {!imageUrl && (
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-slate-50 text-xs font-medium border-slate-200 text-slate-600">
              {id}
            </Badge>
            <StatusIndicator status={status} />
          </div>
        )}
        
        {/* Content row: Title and Location */}
        <h4 className="font-semibold text-slate-900 text-[15px] mb-1.5 leading-snug line-clamp-2">{title}</h4>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
          {location}
        </div>
        
        {/* Bottom row: Tags and Upvotes */}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100">
          <div className="flex gap-2">
            <SeverityBadge severity={severity} />
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 text-[10px]">
              {category}
            </Badge>
          </div>
          <div className="flex items-center text-slate-400 text-xs font-medium">
            <ThumbsUp className="w-3 h-3 mr-1" />
            {upvotes}
          </div>
        </div>
      </div>
    </div>
  );
}
