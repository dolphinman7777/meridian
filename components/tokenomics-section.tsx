"use client"

import * as React from "react"
import { 
  Coins, 
  TrendUp, 
  Lightning, 
  Users, 
  CurrencyDollar,
  ArrowDown 
} from "phosphor-react"
import { MeridianMap } from "@/components/meridian-map"

export function TokenomicsSection() {
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <MeridianMap className="absolute inset-0 h-full w-full" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-16">
        <div className="max-w-6xl mx-auto px-8 py-12 bg-black/90 backdrop-blur-sm shadow-2xl text-white">
          <div className="text-center mb-16">
                          <h2 className="text-4xl font-bold mb-4">
                <span className="text-blue-400 font-meridian">meridian</span> Tokenomics
              </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Stake tokens to access the facilitator and earn yield from protocol usage
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left Side - Staking Mechanism */}
            <div className="space-y-6">
              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <Coins className="w-6 h-6 text-white" weight="duotone" />
                  <h3 className="text-2xl font-semibold">Staking Model</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-gray-300">Stake Amount</span>
                    <span className="text-chart-2 font-semibold">$1,000 tokens</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-gray-300">Protocol Fee</span>
                    <span className="text-purple-300 font-semibold">1%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-gray-300">$10 Coverage</span>
                    <span className="text-purple-300 font-semibold">50k transactions</span>
                  </div>
                </div>
              </div>

              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendUp className="w-6 h-6 text-chart-2" weight="duotone" />
                  <h3 className="text-2xl font-semibold">Yield Mechanism</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Earn yield as emissions on your staked amount based on protocol usage. 
                  The more the protocol is used, the higher the rewards distributed to stakers.
                </p>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <Lightning className="w-6 h-6 text-purple-300" weight="duotone" />
                  <h3 className="text-xl font-semibold">Token Utility</h3>
                </div>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    Access to facilitator services
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    Transaction quota based on stake
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    Yield from protocol usage
                  </li>
                </ul>
              </div>

              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-chart-2" weight="duotone" />
                  <h3 className="text-xl font-semibold">Revenue Model</h3>
                </div>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    Small fees on transaction volume
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    Token trading fees as revenue
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    Flywheel effect with increased usage
                  </li>
                </ul>
              </div>

              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyDollar className="w-6 h-6 text-purple-300" weight="duotone" />
                  <h3 className="text-xl font-semibold">Consumer Pays</h3>
                </div>
                <p className="text-gray-200">
                  End consumers pay for transactions while stakers provide liquidity 
                  and earn yield, creating a sustainable economic model.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-card/10 p-8 border border-border/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Ready to Stake?</h3>
              <p className="text-gray-200 mb-6">
                Join the meridian ecosystem and start earning yield from internet-native payments
              </p>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold text-lg transition-colors shadow-lg">
                Start Staking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 