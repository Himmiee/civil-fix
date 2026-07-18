"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  Loader2,
  CalendarDays
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PipelineFeature {
  id: string;
  step: string;
  title: string;
  desc: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const FEATURES: PipelineFeature[] = [
  {
    id: "map",
    step: "01",
    title: "Interactive Civic Map",
    desc: "Visualize active reports geographically, filter by category, and track resolve states in real time.",
    bgColor: "bg-blue-50/60",
    borderColor: "border-blue-100",
    textColor: "text-blue-600",
  },
  {
    id: "rewards",
    step: "02",
    title: "Gamified Civic Rewards",
    desc: "Earn impact points and unlock exclusive responder badges for reporting local issues.",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-100",
    textColor: "text-indigo-600",
  },
  {
    id: "analytics",
    step: "03",
    title: "Community Dashboard",
    desc: "Access aggregated data on municipal response times and environmental footprint improvements.",
    bgColor: "bg-emerald-50/60",
    borderColor: "border-emerald-100",
    textColor: "text-emerald-600",
  },
];

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col justify-center items-center py-12 md:py-20">
      {/* Soft background decor for color depth */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-50/70 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      {/* Premium Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-70"></div>

      <div className="max-w-[560px] mx-auto w-full px-6 flex flex-col items-center text-center relative z-10">
        
        {/* Top Label */}
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-4 animate-fade-in block">
          Project Status: Development
        </span>

        {/* Heading with styled color accent */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          We&apos;re Building <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Something Great</span>
        </h1>
        
        <p className="text-gray-550 text-base md:text-lg mb-10 leading-relaxed">
          CivicFix is under construction. We are building the tools to connect residents directly with city services to repair public spaces.
        </p>

        {/* Clean Flat Subscription Box */}
        <div className="bg-gray-50/90 border border-gray-200 rounded-2xl p-6 md:p-8 w-full mb-8 text-left backdrop-blur-xs focus-within:border-gray-300 transition-colors duration-300">
          <h3 className="font-bold text-gray-900 text-lg mb-2 text-center sm:text-left">Want to know when we launch?</h3>
          <p className="text-gray-550 text-sm mb-6 text-center sm:text-left">
            Drop your email address below, and we will send you updates on our progress and launch date.
          </p>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-emerald-600 font-semibold gap-2 animate-fade-in-up">
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3 w-full justify-center">
                <CheckCircle2 className="size-5 stroke-[2.5] text-emerald-600" />
                <p className="text-sm">Success! You are on the VIP notification list.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 disabled:opacity-75 transition-all placeholder:text-gray-455 text-gray-900"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center shrink-0 border-none cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Notify Me"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Dialog>
            <DialogTrigger
              render={
                <button className="group h-11 px-5 rounded-xl font-bold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2 transition-all duration-300 cursor-pointer text-sm hover:scale-[1.02] active:scale-[0.98]">
                  <CalendarDays className="size-4 text-gray-500 group-hover:text-gray-800 transition-colors" />
                  View Platform Roadmap
                </button>
              }
            />
            <DialogContent className="max-w-md">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-extrabold text-gray-900">Platform Roadmap</DialogTitle>
                <DialogDescription className="text-gray-550 text-xs">
                  Here is a preview of the modules currently in our pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-2">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.id}
                    className={`flex gap-4 p-4 ${feature.bgColor} border ${feature.borderColor} rounded-xl`}
                  >
                    <div className={`size-10 rounded-lg bg-white border ${feature.borderColor} flex items-center justify-center shrink-0 font-extrabold text-sm ${feature.textColor}`}>
                      {feature.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-bold text-[14px] mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-[12.5px] leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/">
            <Button className="h-11 px-5 rounded-xl font-bold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
