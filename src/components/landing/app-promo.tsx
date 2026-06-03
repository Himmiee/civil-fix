import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export default function AppPromo() {
  return (
    <section className="bg-white pt-20 lg:pt-28 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Mobile Promo Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-20 lg:mb-24">
          {/* Text Content */}
          <div className="w-full lg:w-[450px] shrink-0 text-center lg:text-left">
            <h3 className="text-primary font-bold text-[12px] tracking-widest mb-4 uppercase">Always With You</h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1]">
              CivicFix On The Go
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-[17px] max-w-lg mx-auto lg:mx-0">
              Report issues, track progress, and stay updated anytime, anywhere directly from your mobile browser. No downloads required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white h-12 w-full sm:w-auto px-8 rounded-lg font-semibold shadow-none text-[15px]">
                Add to Home Screen
              </Button>
              <Button variant="outline" className="h-12 w-full sm:w-auto px-8 rounded-lg font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none text-[15px]">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Phones Showcase */}
          <div className="flex-1 w-full relative h-[400px] sm:h-[500px] lg:h-[550px] flex justify-center items-center my-24 md:my-64 lg:my-0">
             <div className="relative w-full max-w-[800px] h-full flex items-center justify-center">
                {/* Left Phone */}
                <div className="absolute left-[2%] sm:left-[5%] md:left-[10%] w-[110px] sm:w-[200px] md:w-[240px] aspect-9/19 rounded-[1.5rem] sm:rounded-[2rem] border-[6px] sm:border-8 border-gray-900 overflow-hidden z-10 transform -rotate-6 translate-y-2 sm:translate-y-4 bg-gray-50 shadow-xl">
                  <Image src="/how_it_works_1.png" fill className="object-cover object-center" alt="App Screen 1" />
                </div>
                
                {/* Center Phone */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[130px] sm:w-[220px] md:w-[260px] aspect-9/19 rounded-[1.75rem] sm:rounded-[2.5rem] border-8 sm:border-10 border-gray-900 overflow-hidden shadow-2xl z-30 bg-gray-50">
                  <Image src="/how_it_works_2.png" fill className="object-cover object-center" alt="App Screen 2" />
                </div>
                
                {/* Right Phone */}
                <div className="absolute right-[2%] sm:right-[5%] md:right-[10%] w-[110px] sm:w-[200px] md:w-[240px] aspect-9/19 rounded-[1.5rem] sm:rounded-[2rem] border-[6px] sm:border-8 border-gray-900 overflow-hidden z-20 transform rotate-6 translate-y-6 sm:translate-y-8 bg-gray-50 shadow-xl">
                  <Image src="/how_it_works_3.png" fill className="object-cover object-center" alt="App Screen 3" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner (Connected to footer) */}
      <div className="w-full bg-[#f4f7fb] pt-12 pb-16 px-6 border-t border-blue-50/50 mt-12">
        <div className="max-w-[1200px] mx-auto bg-transparent flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            <div className="size-16 shrink-0 bg-blue-100/50 rounded-full flex items-center justify-center text-primary mt-1 md:mt-0">
               <Users className="size-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Help Build Better Communities.
              </h2>
              <p className="text-gray-600 text-[16px]">
                Your voice matters. Your report creates change.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <Button className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white h-12 px-8 rounded-lg font-bold shadow-none text-[15px] flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 duration-300">
              Start Reporting <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
