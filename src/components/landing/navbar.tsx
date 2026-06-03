"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onReportClick: () => void;
}

export default function Navbar({ onReportClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-gray-700">
          <Link href="/coming-soon" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/coming-soon" className="hover:text-primary transition-colors">
            Community Impact
          </Link>
          <Link href="/coming-soon" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/coming-soon" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/coming-soon">
            <Button variant="outline" className="hidden sm:inline-flex h-11 px-6 font-semibold border-gray-200 text-gray-700 hover:bg-gray-50">
              Sign In
            </Button>
          </Link>
          <Button onClick={onReportClick} className="h-11 px-6 font-semibold shadow-none">
            Report an Issue
          </Button>

          {/* Toggle Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col gap-6 transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Image
                src="/civicfix_logo_icon.png"
                alt="CivicFix Logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-extrabold text-xl tracking-tight text-gray-900">
                CivicFix
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 text-base font-semibold text-gray-800">
            <Link
              href="/coming-soon"
              className="py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/coming-soon"
              className="py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Community Impact
            </Link>
            <Link
              href="/coming-soon"
              className="py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/coming-soon"
              className="py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Actions in drawer */}
          <div className="mt-auto flex flex-col gap-3">
            <Link href="/coming-soon" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" className="w-full h-11 font-semibold border-gray-200 text-gray-700 hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
            <Button
              onClick={() => {
                setIsOpen(false);
                onReportClick();
              }}
              className="w-full h-11 font-semibold shadow-none"
            >
              Report an Issue
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
