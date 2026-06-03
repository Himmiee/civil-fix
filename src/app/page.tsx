"use client";

import { useState } from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import ExploreCommunity from "@/components/landing/explore-community";
import AppPromo from "@/components/landing/app-promo";
import Footer from "@/components/landing/footer";
import ReportDialog from "@/components/landing/report-dialog";

export default function Home() {
  const [reportOpen, setReportOpen] = useState(false);

  const handleReportClick = () => setReportOpen(true);

  return (
    <>
      <Navbar onReportClick={handleReportClick} />
      <main className="flex-1">
        <Hero onReportClick={handleReportClick} />
        <HowItWorks />
        <ExploreCommunity />
        <AppPromo />
      </main>
      <Footer />
      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} />
    </>
  );
}
