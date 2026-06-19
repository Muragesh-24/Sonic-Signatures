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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold">
            Sonic Signatures -EE200 Final Project
          </h1>

          <p className="mt-4 text-zinc-400 text-lg">
            Shazam-Style Audio Fingerprinting
          </p>
        </div>

        <div className="mt-12">
          <AudioUploader setResult={setResult} />
        </div>
        <div>
          <BatchUploader  />
        </div>

        {result && (
          <>
            <div className="mt-12">
              <StatsCards result={result} />
            </div>

            <AnalysisSection result={result} />
          </>
        )}
      </section>
    </main>
  );
}