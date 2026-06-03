"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sparkles,
  Map,
  Trophy,
  BarChart3,
  Mail,
  CheckCircle2,
  Loader2
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

interface PipelineFeature {
  id: string;
  title: string;
  desc: string;
  status: "In Development" | "Testing" | "Planning";
  statusColor: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const FEATURES: PipelineFeature[] = [
  {
    id: "map",
    title: "Interactive Civic Map",
    desc: "Visualize active reports geographically, filter by category, and track resolve states in real time.",
    status: "In Development",
    statusColor: "bg-blue-500",
    icon: Map,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "rewards",
    title: "Gamified Civic Rewards",
    desc: "Earn impact points and unlock exclusive responder badges for reporting local issues.",
    status: "Testing",
    statusColor: "bg-indigo-500",
    icon: Trophy,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    id: "analytics",
    title: "Community Dashboard",
    desc: "Access aggregated data on municipal response times and environmental footprint improvements.",
    status: "Planning",
    statusColor: "bg-gray-400",
    icon: BarChart3,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-500",
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
    // Mock network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
    }, 1000);
  };

  return (
    <>
      <Navbar onReportClick={() => {}} />

      <main className="flex-1 bg-white relative overflow-hidden flex flex-col justify-center min-h-[85vh]">
        {/* Soft background decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto w-full px-6 py-16 md:py-24 relative z-10 text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-6">
            <Sparkles className="size-3.5 text-blue-500" />
            <span>Coming Soon</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            We&apos;re Building Something Great
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mb-12 leading-relaxed">
            CivicFix is under construction. We are building the tools to connect residents directly with city services to repair public spaces. Here is a preview of the modules currently in our pipeline:
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16 text-left">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-2xl border border-gray-150 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <Icon className={`size-8 ${feature.iconColor} mb-6`} />

                    <h3 className="text-gray-900 font-bold text-[16px] mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-6">{feature.desc}</p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${feature.statusColor}`} />
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {feature.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription Box */}
          <div className="bg-gray-50/60 border border-gray-200/60 rounded-3xl p-8 max-w-xl w-full mb-10 text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Want to know when we launch?</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Drop your email address below, and we will send you updates on our progress and launch date.
            </p>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-2 text-emerald-600 font-semibold gap-2 animate-fade-in">
                <CheckCircle2 className="size-8 stroke-[2.5] text-emerald-500" />
                <p className="text-sm">Success! You are on the VIP notification list.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-75 transition-all placeholder:text-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-none transition-all duration-200 flex items-center justify-center shrink-0 min-w-[110px]"
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

          {/* Back button */}
          <Link href="/">
            <Button className="h-12 px-6 rounded-xl font-bold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2 transition-transform hover:-translate-y-0.5 duration-300">
              <ArrowLeft className="size-4.5" />
              Back to Home
            </Button>
          </Link>

        </div>
      </main>

      <Footer />
    </>
  );
}
