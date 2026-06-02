"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onReportClick: () => void;
}

export default function Navbar({ onReportClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-700">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#impact" className="hover:text-primary transition-colors">
            Community Impact
          </Link>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:inline-flex h-11 px-6 font-semibold border-gray-200 text-gray-700 hover:bg-gray-50">
            Sign In
          </Button>
          <Button onClick={onReportClick} className="h-11 px-6 font-semibold shadow-none">
            Report an Issue
          </Button>
        </div>
      </div>
    </header>
  );
}
