"use client"

import * as React from "react"
import { 
  Coins, 
  TrendingUp, 
  Zap, 
  Users, 
  DollarSign,
  ArrowRight
} from "lucide-react"

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

        {/* Staking Overview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/meridian-4.svg" alt="Meridian Logo" className="w-6 h-6 opacity-60" />
              <h3 className="text-heading-2">Staking Model</h3>
            </div>
            <p className="text-body-large text-gray-600">
              Simple staking with transparent rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-meridian-50 border border-meridian-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-4 mb-2">Stake Amount</h4>
              <p className="text-heading-3 text-meridian-600 font-bold mb-2">$1,000</p>
              <p className="text-body-small text-gray-600">in tokens</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-gray-600" />
              </div>
              <h4 className="text-heading-4 mb-2">Protocol Fee</h4>
              <p className="text-heading-3 text-gray-800 font-bold mb-2">1%</p>
              <p className="text-body-small text-gray-600">on transactions</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-heading-4 mb-2">Coverage</h4>
              <p className="text-heading-3 text-green-600 font-bold mb-2">$10</p>
              <p className="text-body-small text-gray-600">unlocked</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-body-base text-gray-600 max-w-2xl mx-auto">
              Stake $1,000 worth of tokens to unlock $10 in payment volume coverage with a 1% protocol fee.
            </p>
          </div>
        </div>

        {/* Yield & Network Stats */}
        <div className="mb-20 bg-gray-50 py-16 -mx-8 px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Yield Generation */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-meridian-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-meridian-600" />
                </div>
                <h3 className="text-heading-2">Yield Generation</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-body-base text-gray-600">Current APY</span>
                    <span className="text-heading-4 text-meridian-600 font-bold">12.5%</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-body-base text-gray-600">Monthly Yield</span>
                    <span className="text-heading-4 text-gray-800 font-bold">$10.42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body-base text-gray-600">Revenue Share</span>
                    <span className="text-heading-4 text-gray-800 font-bold">70%</span>
                  </div>
                </div>
                
                <p className="text-body-base text-gray-600">
                  Earn yield proportional to your stake from protocol usage fees across the network.
                </p>
              </div>
            </div>

            {/* Network Activity */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-heading-2">Network Activity</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-heading-3 text-gray-800 font-bold mb-1">$2.3M</p>
                  <p className="text-body-small text-gray-600">24h Volume</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-heading-3 text-gray-800 font-bold mb-1">15,420</p>
                  <p className="text-body-small text-gray-600">Transactions</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-heading-3 text-gray-800 font-bold mb-1">98.7%</p>
                  <p className="text-body-small text-gray-600">Success Rate</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-heading-3 text-gray-800 font-bold mb-1">$45K</p>
                  <p className="text-body-small text-gray-600">Fees Generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staker Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/meridian-4.svg" alt="Meridian Logo" className="w-6 h-6 opacity-60" />
              <h3 className="text-heading-2">Staker Benefits</h3>
            </div>
            <p className="text-body-large text-gray-600">
              More than just yield - unlock premium features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Priority Processing</h4>
              <p className="text-body-base text-gray-600">
                Fast-track your transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Reduced Fees</h4>
              <p className="text-body-base text-gray-600">
                Lower protocol costs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Governance Rights</h4>
              <p className="text-body-base text-gray-600">
                Vote on protocol changes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Early Access</h4>
              <p className="text-body-base text-gray-600">
                New features first
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-meridian-50 rounded-lg p-8 inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/meridian-4.svg" alt="Meridian Logo" className="w-8 h-8" />
              <h3 className="text-heading-3">Start earning with meridian</h3>
            </div>
            <p className="text-body-large text-gray-600 mb-6">
              Join the network and earn yield from day one
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-meridian-400 hover:bg-meridian-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                Stake Tokens
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border border-meridian-300 hover:border-meridian-200 text-meridian-600 hover:text-meridian-700 font-semibold rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 