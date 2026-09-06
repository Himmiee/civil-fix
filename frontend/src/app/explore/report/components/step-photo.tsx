"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportIssueFormValues } from "@/lib/validations/report";

interface StepPhotoProps {
  onNext: () => void;
}

export function StepPhoto({ onNext }: StepPhotoProps) {
  const { setValue } = useFormContext<ReportIssueFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoUrl = useFormContext<ReportIssueFormValues>().watch("photoUrl");

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setValue("photoUrl", url);
    }
  };

  const clearPhoto = () => {
    setValue("photoUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto w-full">
        {photoUrl ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-full aspect-4/5 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-6 relative">
              <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex w-full gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-11 text-sm font-medium rounded-md text-slate-700 border-slate-200" 
                onClick={clearPhoto}
              >
                Retake
              </Button>
              <Button 
                type="button" 
                className="flex-1 h-11 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 text-white" 
                onClick={onNext}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Show us what's wrong.</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Take a clear photo of the issue so we can verify and fix it faster.
            </p>
            
            <div className="w-full flex flex-col gap-3">
              <Button 
                type="button" 
                className="h-11 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 text-white w-full" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="h-11 text-sm font-medium rounded-md text-slate-700 border-slate-200 w-full" 
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2 text-slate-500" />
                Choose from Gallery
              </Button>
              <button type="button" className="mt-4 text-sm text-slate-500 font-medium flex items-center justify-center gap-1 hover:text-slate-700 transition-colors" onClick={onNext}>
                Skip for now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handlePhotoSelect} 
        />
      </div>
    </div>
  );
}
