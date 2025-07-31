"use client"

import { MeridianMap } from "@/components/meridian-map"
import { Navigation } from "@/components/navigation"
import { X402Overview } from "@/components/x402-overview"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const scrollToOverview = () => {
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
        <Navigation />
        
        <main className="h-full w-full">
          <MeridianMap className="absolute inset-0 h-full w-full" />
          
          {/* Welcome overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-6 max-w-4xl px-8 py-12 bg-black/95 backdrop-blur-sm shadow-2xl pointer-events-auto">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white font-meridian text-center">
                  <span className="inline-flex items-center gap-4">
                    <img src="/meridian-4.svg" alt="Meridian Logo" className="w-16 h-16" />
                    meridian
                  </span>
                </h1>
                <p className="text-heading-4 text-gray-200">
                  The staked-access protocol for <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span> payments
                </p>
              </div>
              

            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <button 
              onClick={scrollToOverview}
              className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
              </div>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </main>
      </div>

      {/* X402 Overview Section */}
      <div id="overview">
        <X402Overview />
      </div>

      {/* Tokenomics Section */}
      <div id="tokenomics">
        <TokenomicsSection />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/meridian-4.svg" alt="Meridian Logo" className="w-8 h-8" />
              <span className="text-heading-4 font-meridian font-semibold">meridian</span>
            </div>
            <p className="text-body-base text-gray-400">
              The staked-access protocol for <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span> payments
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
