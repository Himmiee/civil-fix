"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-12 hover:opacity-90 transition-opacity">
          <Image
            src="/civicfix_logo_icon.png"
            alt="CivicFix Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-extrabold text-2xl tracking-tight text-gray-900">
            CivicFix
          </span>
        </Link>

        {/* Icon */}
        <AlertTriangle className="size-12 text-gray-450 mb-6" />

        {/* Label */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">
          500 - Application Error
        </span>

        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
          Something Went Wrong
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          An unexpected error occurred during execution. Don&apos;t worry, our municipal engineering team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            onClick={reset}
            className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-none transition-transform hover:-translate-y-0.5 duration-200"
          >
            <RefreshCw className="size-4 mr-2" />
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-transform hover:-translate-y-0.5 duration-200"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
