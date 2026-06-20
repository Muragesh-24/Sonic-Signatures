"use client";
import { useState } from "react";
import AudioUploader from "@/components/AudioUploader";
import Navbar from "@/components/NavBar";
import StatsCards from "@/components/StatsCards";
import AnalysisSection from "@/components/AnalysisSection";
import BatchUploader from "@/components/BatchUploader";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
 <main className="min-h-screen bg-black text-white overflow-x-hidden">
  <Navbar />

  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
    <div className="text-center">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        Sonic Signatures - EE200 Final Project
      </h1>

      <p className="mt-4 text-zinc-400 text-base sm:text-lg">
        Shazam-Style Audio Fingerprinting
      </p>
    </div>

    <div className="mt-8 sm:mt-12">
      <AudioUploader setResult={setResult} />
    </div>
 {result && (
      <>
        <div className="mt-8 sm:mt-12">
          <StatsCards result={result} />
        </div>

        <div className="mt-8">
          <AnalysisSection result={result} />
        </div>
      </>
    )}
    <div className="mt-8">
      <BatchUploader />
    </div>

   
  </section>
</main>
  );
}