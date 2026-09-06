"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { reportIssueSchema, ReportIssueFormValues } from "@/lib/validations/report";
import { StepPhoto } from "./components/step-photo";
import { StepLocation } from "./components/step-location";
import { StepDetails } from "./components/step-details";
import { StepReview } from "./components/step-review";
import { StepSuccess } from "./components/step-success";

type Step = 1 | 2 | 3 | 4 | 5;

export default function ReportPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<ReportIssueFormValues>({
    resolver: zodResolver(reportIssueSchema),
    defaultValues: {
      photoUrl: "",
      locationStr: "",
      category: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ReportIssueFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 2000));
    console.log("Submitted Form Data:", data);
    setIsSubmitting(false);
    setStep(5); // Success step
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="fixed inset-0 bg-white z-100 flex flex-col lg:static lg:z-auto lg:h-[calc(100vh-80px)]">
        
        {/* Top Navigation Bar */}
        {step !== 5 && (
          <div className="h-16 flex items-center justify-center px-4 border-b border-slate-100 bg-white shrink-0 relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 lg:hidden"
              onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : router.back()}
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </Button>
            <div className="font-bold text-slate-900 text-sm">
              Report an Issue
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {step !== 5 && (
          <div className="w-full shrink-0 bg-white border-b border-slate-100 px-6 py-4">
            <div className="max-w-xs mx-auto">
              <div className="flex items-center justify-between relative mb-2">
                {/* Connecting Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
                
                {/* Nodes */}
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="relative z-10 flex flex-col items-center gap-1.5 bg-white px-1">
                    <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      step >= s ? "bg-primary" : "bg-slate-200"
                    }`} />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className={step >= 1 ? "text-primary" : ""}>Photo</span>
                <span className={step >= 2 ? "text-primary text-center" : "text-center"}>Location</span>
                <span className={step >= 3 ? "text-primary text-center" : "text-center"}>Details</span>
                <span className={step >= 4 ? "text-primary text-right" : "text-right"}>Review</span>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto max-w-xl mx-auto w-full">
          {step === 1 && <StepPhoto onNext={() => setStep(2)} />}
          {step === 2 && <StepLocation onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepDetails onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <StepReview 
            onBackToLocation={() => setStep(2)} 
            onBackToDetails={() => setStep(3)} 
            onBack={() => setStep(3)}
            isSubmitting={isSubmitting} 
          />}
          {step === 5 && <StepSuccess />}
        </div>
        
      </form>
    </FormProvider>
  );
}
