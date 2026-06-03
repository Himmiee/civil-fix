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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-12">
        <Image
          src="/civicfix_logo_icon.png"
          alt="CivicFix Logo"
          width={32}
          height={32}
        />
        <span className="font-extrabold text-2xl tracking-tight text-gray-900">
          CivicFix
        </span>
      </Link>

      {/* Error illustration */}
      <div className="size-20 rounded-2xl bg-red-50 flex items-center justify-center mb-8">
        <AlertTriangle className="size-8 text-red-500" />
      </div>

      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
        Something Went Wrong
      </h2>

      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        We encountered an unexpected error. Please try again or head back to the
        homepage.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button size="lg" onClick={reset} className="shadow-md">
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button size="lg" variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
