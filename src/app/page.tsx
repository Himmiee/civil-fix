"use client";

import { useState } from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
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
      </main>
      <Footer />
      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} />
    </>
  );
}
