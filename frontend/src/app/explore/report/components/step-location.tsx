"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MapPin, Navigation, Map as MapIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportIssueFormValues } from "@/lib/validations/report";
import MapView from "@/components/explore/map-view";

interface StepLocationProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepLocation({ onNext, onBack }: StepLocationProps) {
  const { watch, setValue } = useFormContext<ReportIssueFormValues>();
  const [isLocating, setIsLocating] = useState(false);
  
  const locationStr = watch("locationStr");

  const handleGetLocation = async () => {
    setIsLocating(true);
    await new Promise(res => setTimeout(res, 1000));
    setValue("locationStr", "Herbert Macaulay Way, Yaba");
    setIsLocating(false);
  };

  const handleClearLocation = () => {
    setValue("locationStr", "");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col p-6 max-w-sm mx-auto w-full justify-center">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Where did this happen?</h2>
          <p className="text-slate-500 text-sm">
            Provide an accurate location so authorities can find the issue.
          </p>
        </div>

        {/* Map Area */}
        <div className="w-full h-48 bg-slate-100 border border-slate-200 rounded-lg mb-6 relative overflow-hidden z-0">
          
          {/* Real Interactive Map Background */}
          <div className="absolute inset-0 z-0">
            <MapView issues={[]} />
          </div>
          
          {/* Center Pin (Static overlay) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
            <div className="bg-primary text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm mb-1">Drop Pin Here</div>
            <MapPin className="w-8 h-8 text-primary drop-shadow-md" />
            {/* Pin shadow */}
            <div className="w-2 h-1 bg-black/20 rounded-full mt-0.5"></div>
          </div>

          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">Interactive Map</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          {locationStr ? (
            <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="font-semibold text-slate-900 text-sm truncate">{locationStr}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 shrink-0" onClick={handleClearLocation}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button 
                type="button" 
                className="h-11 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 text-white w-full" 
                onClick={handleGetLocation} 
                disabled={isLocating}
              >
                {isLocating ? (
                  "Getting location..."
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Use Current Location
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="h-11 text-sm font-medium rounded-md text-slate-700 border-slate-200 w-full"
              >
                <MapIcon className="w-4 h-4 mr-2 text-slate-500" />
                Select on Map
              </Button>
            </>
          )}
        </div>
      </div>

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
            disabled={!locationStr} 
            onClick={onNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
