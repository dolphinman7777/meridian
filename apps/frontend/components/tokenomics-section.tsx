"use client"

import * as React from "react"
import { 
  CurrencyDollar, 
  Lightning, 
  Users
} from "phosphor-react"

export function TokenomicsSection() {
  return (
    <div className="relative min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 mb-6">
            <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">meridian</span> Tokenomics
          </h2>
          <p className="text-heading-4 text-gray-600 max-w-3xl mx-auto">
            Stake tokens to access the facilitator and earn yield from protocol usage
          </p>
        </div>

        {/* Staking Model */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-6 bg-meridian-400 rounded-sm"></div>
              <h3 className="text-heading-2">Staking Model</h3>
            </div>
            <p className="text-body-large text-gray-600">
              Simple staking with transparent rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Stake Amount */}
            <div className="bg-meridian-100 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-meridian-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <CurrencyDollar className="w-6 h-6 text-meridian-600" />
              </div>
              <h4 className="text-heading-3 mb-4">Stake Amount</h4>
              <div className="text-4xl font-bold text-meridian-600 mb-2">$1,000</div>
              <p className="text-body-base text-gray-600">in tokens</p>
            </div>

            {/* Protocol Fee */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-600">$</span>
              </div>
              <h4 className="text-heading-3 mb-4">Protocol Fee</h4>
              <div className="text-4xl font-bold text-gray-800 mb-2">1%</div>
              <p className="text-body-base text-gray-600">on transactions</p>
            </div>

            {/* Coverage */}
            <div className="bg-meridian-100 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-meridian-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightning className="w-6 h-6 text-meridian-600" />
              </div>
              <h4 className="text-heading-3 mb-4">Coverage</h4>
              <div className="text-4xl font-bold text-meridian-600 mb-2">$10</div>
              <p className="text-body-base text-gray-600">unlocked</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-body-large text-gray-600">
              Stake $1,000 worth of tokens to unlock $10 in payment volume coverage with a 1% protocol fee.
            </p>
          </div>
        </div>

        {/* Powered by $meridian */}
        <div className="mb-20">
          <h3 className="text-5xl font-black mb-8">Powered by $meridian</h3>
          
          {/* Dashboard - narrower width, centered */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-0.5">
            {/* Top row - 1/3 grey + 2/3 blue */}
            <div className="grid grid-cols-3 gap-0.5">
              {/* Left grey box - exactly 1/3 width */}
              <div className="col-span-1 rounded-sm p-8" style={{ backgroundColor: '#f0f2f5' }}>
                <h4 className="text-body-base text-gray-600 font-medium mb-4">Active Stakers</h4>
                <div className="text-5xl font-black text-blue-600">1,247</div>
              </div>

              {/* Right blue box - exactly 2/3 width */}
              <div className="col-span-2 bg-blue-900 rounded-sm p-8 text-white text-center">
                <p className="text-body-base text-blue-200 font-medium mb-6">Total Value Locked</p>
                <div className="text-6xl font-black mb-8">$4.2M</div>
                <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  START STAKING
                </button>
              </div>
            </div>

            {/* Middle section - full width grey */}
            <div className="rounded-sm p-8 text-center" style={{ backgroundColor: '#f0f2f5' }}>
              <p className="text-body-base text-gray-600 font-medium mb-4">Daily Staking Rewards</p>
              <div className="text-6xl font-black text-blue-600">$1,420</div>
            </div>
            
            {/* Bottom section - 3 separate boxes */}
            <div className="grid grid-cols-3 gap-0.5">
              <div className="rounded-sm p-8 text-center" style={{ backgroundColor: '#f0f2f5' }}>
                <h4 className="text-body-base text-gray-600 font-medium mb-4">Total Supply</h4>
                <div className="text-4xl font-black text-blue-600">100M</div>
              </div>
              <div className="rounded-sm p-8 text-center" style={{ backgroundColor: '#f0f2f5' }}>
                <h4 className="text-body-base text-gray-600 font-medium mb-4">Circulating Supply</h4>
                <div className="text-4xl font-black text-blue-600">75M</div>
              </div>
              <div className="rounded-sm p-8 text-center" style={{ backgroundColor: '#f0f2f5' }}>
                <h4 className="text-body-base text-gray-600 font-medium mb-4">Staking APR</h4>
                <div className="text-4xl font-black text-blue-600">12.5%</div>
              </div>
                          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 