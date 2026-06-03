import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function ComingSoon() {
  return (
    <>
      <Navbar onReportClick={() => {}} />
      <main className="flex-1 flex items-center justify-center min-h-[75vh] bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-md mx-auto text-center px-6 py-20 relative z-10">
          <div className="size-20 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100">
            <Clock className="size-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            Coming Soon
          </h1>
          <p className="text-gray-600 mb-10 text-[17px] leading-relaxed">
            We are working hard to bring this feature to life. Check back later for updates as we continue to build CivicFix.
          </p>
          <Link href="/">
            <Button className="h-14 px-8 rounded-xl font-bold shadow-none text-[16px] bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 mx-auto transition-transform hover:-translate-y-0.5 duration-300">
              <ArrowLeft className="size-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
