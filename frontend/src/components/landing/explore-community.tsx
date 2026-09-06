import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function ExploreCommunity() {
  const impacts = [
    {
      id: 1,
      category: "Road Issue",
      categoryColor: "bg-red-500",
      before: "/impact_pothole_broken.png",
      after: "/impact_pothole_fixed.png",
      title: "Big pothole on Maple Street",
      beforeDate: "Reported May 12",
      afterStatus: "Repaired",
      afterDate: "May 16",
    },
    {
      id: 2,
      category: "Streetlight",
      categoryColor: "bg-amber-500",
      before: "/impact_streetlight_broken.png",
      after: "/impact_streetlight_fixed.png",
      title: "Streetlight not working",
      beforeDate: "Reported May 8",
      afterStatus: "Repaired",
      afterDate: "May 11",
    },
    {
      id: 3,
      category: "Drainage",
      categoryColor: "bg-blue-500",
      before: "/impact_flood_broken.png",
      after: "/impact_flood_fixed.png",
      title: "Water pooling on 7th Avenue",
      beforeDate: "Reported May 10",
      afterStatus: "Cleared",
      afterDate: "May 14",
    },
  ];

  return (
    <section className="bg-gray-50/30 py-24 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:flex gap-16 xl:gap-20">
        
        {/* Left Sidebar Content */}
        <div className="lg:w-[350px] shrink-0 flex flex-col justify-between py-2">
          <div>
            <h3 className="text-primary font-bold text-[12px] tracking-widest mb-4 uppercase">Explore Your Community</h3>
            <h2 className="text-4xl lg:text-[2.75rem] font-bold text-gray-900 mb-6 leading-[1.15]">
              See What&apos;s Happening Around You
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-[16px]">
              Explore issues reported by your neighbors and stay informed about what&apos;s being fixed in your community.
            </p>
            <Button className="bg-primary hover:bg-blue-700 text-white h-12 px-8 rounded-lg font-semibold shadow-none text-[15px]">
              View Full Map
            </Button>
          </div>

          <div className="mt-20 lg:mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Real Issues. Real Impact.
            </h2>
            <p className="text-gray-500 text-[16px]">
              Every report makes a difference.
            </p>
          </div>
        </div>

        {/* Right Map and Cards Area */}
        <div className="flex-1 mt-16 lg:mt-0 overflow-hidden">
          
          {/* Map Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="bg-primary text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 cursor-pointer hover:opacity-90">
              <div className="size-2 rounded-full border-2 border-white bg-transparent"></div>
              All Issues
            </div>
            <div className="bg-white text-gray-700 px-5 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div className="size-2.5 rounded-full bg-red-500"></div>
              Road Issues
            </div>
            <div className="bg-white text-gray-700 px-5 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div className="size-2.5 rounded-full bg-amber-500"></div>
              Streetlight Problems
            </div>
            <div className="bg-white text-gray-700 px-5 py-2.5 rounded-xl text-[13px] font-semibold hidden sm:flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div className="size-2.5 rounded-full bg-blue-500"></div>
              Drainage Concerns
            </div>
            <div className="bg-white text-gray-700 px-5 py-2.5 rounded-xl text-[13px] font-semibold hidden md:flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div className="size-2.5 rounded-full bg-green-500"></div>
              Resolved
            </div>
          </div>

          {/* Large Map Area */}
          <div className="w-full h-[380px] bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200 mb-10">
            <Image 
              src="/hero_map_clean.png" 
              fill 
              className="object-cover opacity-90 mix-blend-multiply" 
              alt="Community Map" 
            />
            
            {/* Fake Pins */}
            <div className="absolute inset-0">
               <div className="absolute top-[30%] left-[20%] size-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">⚠️</div>
               <div className="absolute top-[60%] left-[40%] size-8 bg-amber-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">💡</div>
               <div className="absolute top-[40%] right-[30%] size-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">💧</div>
               <div className="absolute bottom-[30%] right-[20%] size-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">✓</div>
            </div>
          </div>

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {impacts.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-3xl border border-gray-200">
                <div className="flex items-center gap-2 relative mb-4">
                  {/* Before Image */}
                  <div className="flex-1 aspect-4/3 rounded-2xl overflow-hidden relative border border-gray-100 bg-gray-100">
                    <Image src={item.before} fill className="object-cover" alt="Before" />
                    <div className={`absolute bottom-2 left-2 px-2 py-1 text-[10px] font-bold text-white rounded-md ${item.categoryColor} uppercase tracking-wide`}>
                      {item.category}
                    </div>
                  </div>

                  {/* Divider Arrow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 bg-white rounded-full flex items-center justify-center z-10 border border-gray-200">
                    <ChevronRight className="size-3.5 text-gray-500" />
                  </div>

                  {/* After Image */}
                  <div className="flex-1 aspect-4/3 rounded-2xl overflow-hidden relative border border-gray-100 bg-gray-100">
                    <Image src={item.after} fill className="object-cover" alt="After" />
                    <div className="absolute bottom-2 right-2 px-2 py-1 text-[10px] font-bold text-white rounded-md bg-green-500 uppercase tracking-wide">
                      Resolved
                    </div>
                  </div>
                </div>

                {/* Card Text */}
                <div className="px-2 pb-2 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-[13px] leading-snug mb-1">{item.title}</h4>
                    <p className="text-[12px] text-gray-500">{item.beforeDate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <h4 className="font-bold text-gray-900 text-[13px] leading-snug mb-1">{item.afterStatus}</h4>
                    <p className="text-[12px] text-gray-500">{item.afterDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
