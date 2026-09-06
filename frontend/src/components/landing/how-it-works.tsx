import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Take a Photo",
      description: "Capture the issue using your phone camera.",
      image: "/how_it_works_1.png",
    },
    {
      id: 2,
      title: "Submit a Report",
      description: "Add details, select the category and location, and submit.",
      image: "/how_it_works_2.png",
    },
    {
      id: 3,
      title: "Track Progress",
      description: "We'll review it and keep you updated on the progress.",
      image: "/how_it_works_3.png",
    },
  ];

  return (
    <section className="bg-gray-50/50 py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            How CivicFix Works
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-[2rem] border border-gray-100 pt-10 px-8 flex flex-col items-center text-center relative overflow-hidden h-[450px]">
              <div className="size-12 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xl mb-6">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed max-w-[260px] mx-auto mb-10">
                {step.description}
              </p>
              
              {/* Phone mockup peeking from the bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[240px] rounded-t-[2rem] overflow-hidden border border-gray-200 border-b-0 bg-gray-50">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
