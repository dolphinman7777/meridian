"use client"

import { MeridianMap } from "@/components/meridian-map"
import { Navigation } from "@/components/navigation"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const scrollToTokenomics = () => {
    document.getElementById('tokenomics')?.scrollIntoView({ behavior: 'smooth' })
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
            <div className="text-center space-y-6 max-w-4xl px-8 py-12 bg-black/90 backdrop-blur-sm shadow-2xl pointer-events-auto">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white font-meridian">
                  meridian
                </h1>
                <p className="text-xl text-gray-200">
                  An open protocol for internet-native payments
                </p>
              </div>
              

            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <button 
              onClick={scrollToTokenomics}
              className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <span className="text-sm font-medium">Learn about tokenomics</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
              </div>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </main>
      </div>

      {/* Tokenomics Section */}
      <div id="tokenomics">
        <TokenomicsSection />
      </div>
    </div>
  )
}
