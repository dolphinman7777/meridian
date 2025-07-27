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
            <h2 className="text-heading-1 mb-4">
              <span className="text-meridian-300 font-meridian">meridian</span> Tokenomics
            </h2>
            <p className="text-heading-4 text-gray-200 max-w-3xl mx-auto">
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
                  <h3 className="text-heading-3">Staking Model</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-body-base text-gray-300">Stake Amount</span>
                    <span className="text-meridian-300 font-semibold">$1,000 tokens</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-body-base text-gray-300">Protocol Fee</span>
                    <span className="text-meridian-100 font-semibold">1%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/10">
                    <span className="text-body-base text-gray-300">$10 Coverage</span>
                    <span className="text-meridian-200 font-semibold">Unlocked</span>
                  </div>
                </div>
                <p className="text-body-small text-gray-400 mt-4">
                  Stake $1,000 worth of tokens to unlock $10 in payment volume coverage with a 1% protocol fee.
                </p>
              </div>

              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendUp className="w-6 h-6 text-meridian-300" weight="duotone" />
                  <h3 className="text-heading-3">Yield Generation</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-body-base text-gray-300">
                    <span>Current APY: </span>
                    <span className="text-meridian-300 font-semibold">12.5%</span>
                  </div>
                  <div className="text-body-base text-gray-300">
                    <span>Monthly Yield: </span>
                    <span className="text-meridian-200 font-semibold">$10.42</span>
                  </div>
                  <div className="text-body-base text-gray-300">
                    <span>Protocol Revenue Share: </span>
                    <span className="text-meridian-100 font-semibold">70%</span>
                  </div>
                </div>
                <p className="text-body-small text-gray-400 mt-4">
                  Earn yield proportional to your stake from protocol usage fees across the network.
                </p>
              </div>
            </div>

            {/* Right Side - Usage Stats */}
            <div className="space-y-6">
              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <Lightning className="w-6 h-6 text-yellow-400" weight="duotone" />
                  <h3 className="text-heading-3">Network Activity</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/10">
                    <div className="text-heading-3 text-white font-bold">$2.3M</div>
                    <div className="text-caption text-gray-400">24h Volume</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10">
                    <div className="text-heading-3 text-white font-bold">15,420</div>
                    <div className="text-caption text-gray-400">Transactions</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10">
                    <div className="text-heading-3 text-white font-bold">98.7%</div>
                    <div className="text-caption text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10">
                    <div className="text-heading-3 text-white font-bold">$45K</div>
                    <div className="text-caption text-gray-400">Fees Generated</div>
                  </div>
                </div>
              </div>

              <div className="bg-card/10 p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-meridian-300" weight="duotone" />
                  <h3 className="text-heading-3">Staker Benefits</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-meridian-300 rounded-full"></div>
                    <span className="text-body-base text-gray-300">Priority transaction processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-meridian-300 rounded-full"></div>
                    <span className="text-body-base text-gray-300">Reduced protocol fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-meridian-300 rounded-full"></div>
                    <span className="text-body-base text-gray-300">Governance voting rights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-meridian-300 rounded-full"></div>
                    <span className="text-body-base text-gray-300">Early access to new features</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-body-base text-gray-400 mb-4">
              <ArrowDown className="w-4 h-4" />
              <span>Start earning with meridian</span>
            </div>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-meridian-400 hover:bg-meridian-500 text-white font-semibold rounded-lg transition-colors">
                Stake Tokens
              </button>
              <button className="px-8 py-3 border border-meridian-300 hover:border-meridian-200 text-meridian-300 hover:text-meridian-200 font-semibold rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 