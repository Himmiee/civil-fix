import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
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
          Civic<span className="text-primary">Fix</span>
        </span>
      </Link>

      {/* 404 Display */}
      <h1 className="text-[8rem] lg:text-[12rem] font-black tracking-tighter text-gray-100 leading-none select-none">
        404
      </h1>

      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 -mt-6 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button size="lg" className="shadow-md">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/#features">
          <Button size="lg" variant="outline">
            <Search className="mr-2 size-4" />
            Explore Features
          </Button>
        </Link>
      </div>
    </div>
  );
}
