"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import { ReportIssueFormValues } from "@/lib/validations/report";

interface StepDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({ onNext, onBack }: StepDetailsProps) {
  const { register, watch, setValue } = useFormContext<ReportIssueFormValues>();
  
  const category = watch("category");
  const otherCategory = watch("otherCategory");
  const description = watch("description");

  const isNextDisabled = !category || (category === 'other' && !otherCategory) || (description?.length || 0) < 5;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 max-w-sm mx-auto w-full overflow-y-auto">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us a little more.</h2>
          <p className="text-slate-500 text-sm">Pick a category and add any helpful details.</p>
        </div>

        {/* Category Selection */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">What kind of issue is this?</label>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map(cat => {
              const isSelected = category === cat.id;
              const Icon = cat.icon;
              return (
                <button 
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setValue("category", cat.id);
                    if (cat.id !== "other") setValue("otherCategory", "");
                  }}
                  className={`flex items-center gap-3 p-3 rounded-md border transition-all text-left ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isSelected ? cat.color : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
          
          {category === 'other' && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2">
              <Input 
                placeholder="Please specify..." 
                className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary"
                {...register("otherCategory")}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Additional details</label>
          <Textarea 
            placeholder="Landmarks, severity, or anything else helpful..." 
            className="h-28 resize-none text-sm rounded-md"
            {...register("description")}
          />
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="border-t border-slate-100 bg-white sticky bottom-0">
        <div className="p-6 max-w-sm mx-auto w-full flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="h-11 px-6 text-slate-700" 
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="button"
            className="flex-1 h-11 text-sm font-medium rounded-md bg-slate-900 hover:bg-slate-800 text-white" 
            disabled={isNextDisabled} 
            onClick={onNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
