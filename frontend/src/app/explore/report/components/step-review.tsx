"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";
import { ReportIssueFormValues } from "@/lib/validations/report";

interface StepReviewProps {
  onBackToLocation: () => void;
  onBackToDetails: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepReview({ onBackToLocation, onBackToDetails, onBack, isSubmitting }: StepReviewProps) {
  const { getValues } = useFormContext<ReportIssueFormValues>();
  
  const { photoUrl, locationStr, category, otherCategory, description } = getValues();
  const categoryLabel = category === 'other' 
    ? otherCategory 
    : CATEGORIES.find(c => c.id === category)?.label;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 max-w-sm mx-auto w-full overflow-y-auto">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Everything look right?</h2>
          <p className="text-slate-500 text-sm">Take a quick look before we send it off.</p>
        </div>

        <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
          {/* Photo preview */}
          {photoUrl ? (
            <div className="w-full h-40 bg-slate-100 relative">
              <img src={photoUrl} alt="Report issue" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full h-20 bg-slate-50 flex items-center justify-center border-b border-slate-200">
              <span className="text-slate-400 text-sm font-medium">No photo provided</span>
            </div>
          )}
          
          {/* Details */}
          <div className="divide-y divide-slate-100">
            {/* Category */}
            <div className="flex items-center justify-between p-3.5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</p>
                <p className="font-semibold text-slate-900 text-sm">{categoryLabel}</p>
              </div>
              <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={onBackToDetails}>Edit</button>
            </div>
            
            {/* Location */}
            <div className="flex items-center justify-between p-3.5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                <p className="font-semibold text-slate-900 text-sm">{locationStr}</p>
              </div>
              <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={onBackToLocation}>Edit</button>
            </div>
            
            {/* Description */}
            <div className="p-3.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Description</p>
              <p className="text-slate-700 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="border-t border-slate-100 bg-white sticky bottom-0">
        <div className="p-6 max-w-sm mx-auto w-full flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="h-11 px-6 text-slate-700" 
            disabled={isSubmitting} 
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 h-11 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </div>
  );
}
