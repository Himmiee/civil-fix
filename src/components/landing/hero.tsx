"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Flag, Search, Check, Clock, ShieldAlert, Zap, Droplets, Trash2, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onReportClick: () => void;
}

export default function Hero({ onReportClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Copy (Approx 45%) */}
          <div className="lg:col-span-5 lg:pr-4">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-primary mb-8">
              Stronger communities start with you
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] font-black tracking-tight text-gray-900 mb-6">
              See It. Report It.<br />
              <span className="text-primary">Improve Your<br className="sm:hidden" /> Community.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[17px] lg:text-lg text-gray-600 mb-10 leading-relaxed pr-4">
              Report potholes, broken streetlights, drainage issues,
              waste management concerns, and other infrastructure
              problems directly from your phone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Button onClick={onReportClick} className="w-full sm:w-auto h-12 px-8 shadow-none font-semibold text-[15px]">
                <Flag className="mr-2 size-[18px]" />
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-[15px]">
                <MapPin className="mr-2 size-[18px]" />
                Explore Community Map
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex -space-x-3">
                {[
                  "/avatars/1.png",
                  "/avatars/2.png",
                  "/avatars/3.png",
                  "/avatars/4.png"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Avatar ${i + 1}`}
                    className="size-10 rounded-full border-2 border-white object-cover bg-gray-200"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-600 leading-snug">
                Join 4,300+ citizens making a difference<br className="hidden sm:block" />
                in their communities
              </p>
            </div>
          </div>

          {/* Right Column — Lagos Map Image & UI Overlay (Approx 55%) */}
          <div className="lg:col-span-7 relative w-full aspect-square lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/5 border border-gray-100 bg-gray-50">
            {/* Background Map Image */}
            <Image
              src="/hero_map_clean.png"
              alt="Interactive community map of Lagos"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Floating UI: Sleek Issue Card */}
            <div className="hidden sm:block absolute bottom-6 left-6 right-6 sm:right-auto sm:left-8 sm:bottom-8 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-3 w-auto sm:w-[260px] z-10 transition-transform hover:-translate-y-1 duration-300">
              <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3">
                <Image
                  src="/pothole.png"
                  alt="Large pothole"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">
                  Road Issue
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
                  Large pothole on Herbert Macaulay Way
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                  <MapPin className="size-3.5" />
                  <span>Yaba, Lagos</span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span>2d ago</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                  <div className="inline-flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    In Progress
                  </div>
                  <div className="text-xs font-medium text-primary cursor-pointer hover:underline">
                    View Details
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
