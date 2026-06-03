import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Injecting keyframe animation for the searching eye */}
      <style>{`
        @keyframes searchLook {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-10px, -6px); }
          40% { transform: translate(10px, 6px); }
          60% { transform: translate(-6px, 8px); }
          80% { transform: translate(8px, -6px); }
        }
        .animate-search-look {
          animation: searchLook 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background glow decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-16 hover:opacity-90 transition-opacity">
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

        {/* Creative 4[Eye/Search]4 Graphic */}
        <div className="flex items-center justify-center font-black text-8xl md:text-[10rem] text-gray-900 select-none mb-10 leading-none">
          <span>4</span>
          
          {/* The magnifying search eye "0" */}
          <div className="relative mx-3.5 size-20 md:size-28 rounded-full border-[10px] border-gray-900 bg-white flex items-center justify-center shrink-0">
            {/* The pupil (Eye) */}
            <div className="size-6 md:size-8 bg-gray-900 rounded-full absolute animate-search-look" />
            
            {/* The magnifying glass handle (Search) */}
            <div className="absolute bottom-[-14px] right-[-14px] w-4 h-10 bg-gray-900 rounded-full origin-top-left -rotate-45" />
          </div>
          
          <span>4</span>
        </div>

        {/* Label */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">
          404 - Page Not Found
        </span>

        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
          Lost in the Neighborhood?
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          The street or page you requested doesn&apos;t exist or might have been relocated. Let&apos;s get you back onto mapped territory.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-none transition-transform hover:-translate-y-0.5 duration-200">
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/coming-soon" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold border border-gray-250 text-gray-700 hover:bg-gray-50 transition-transform hover:-translate-y-0.5 duration-200">
              <Search className="size-4 mr-2" />
              Explore Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
