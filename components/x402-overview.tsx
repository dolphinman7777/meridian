"use client"

import * as React from "react"
import { 
  Code, 
  Zap, 
  Globe, 
  CreditCard,
  Users,
  Cpu,
  FileText,
  Cloud,
  ArrowRight
} from "lucide-react"

export function X402Overview() {
  return (
    <div className="relative min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 mb-6">
            Instant API Payments with <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>
          </h2>
                      <p className="text-heading-4 text-gray-600 max-w-4xl mx-auto">
              Built around the HTTP 402 status code, <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span> enables instant payments for API resources 
              without registration, emails, OAuth, or complex signatures.
            </p>
        </div>

        {/* How it Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-heading-2 mb-4">How <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span> Works</h3>
            <p className="text-body-large text-gray-600">
              One line of code to accept digital payments
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <div className="space-y-4">
              <div className="text-meridian-200 text-sm font-mono">
                // Add payment middleware to your existing server
              </div>
              <div className="text-white font-mono text-lg">
                paymentMiddleware("0xYourAddress", {"{"}"/api/data": "$0.01"{"}"});
              </div>
              <div className="text-meridian-200 text-sm font-mono">
                // That's it! Your API now requires payment
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="text-heading-5 mb-3 text-red-800">Without Payment</h4>
              <div className="font-mono text-sm space-y-1">
                <div className="text-red-600">HTTP/1.1 402 Payment Required</div>
                <div className="text-gray-600"><span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>-price: 0.01 USDC</div>
                <div className="text-gray-600"><span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>-address: 0xYourAddress</div>
              </div>
            </div>
            <div className="bg-green-50 border border-meridian-200 rounded-lg p-6">
              <h4 className="text-heading-5 mb-3 text-meridian-700">With Payment</h4>
              <div className="font-mono text-sm space-y-1">
                <div className="text-meridian-600">HTTP/1.1 200 OK</div>
                <div className="text-gray-600">Content-Type: application/json</div>
                <div className="text-gray-600">{"{"}"data": "Your API response"{"}"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h3 className="text-heading-2 text-center mb-12">Why Choose <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Instant Settlement</h4>
              <p className="text-body-base text-gray-600">
                Money in your wallet in seconds, not T+2. Accept payments at blockchain speed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">No Fees</h4>
              <p className="text-body-base text-gray-600">
                Zero fees for merchants and customers. Keep 100% of your revenue.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Frictionless</h4>
              <p className="text-body-base text-gray-600">
                No account creation, emails, or personal information required from customers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Blockchain Agnostic</h4>
              <p className="text-body-base text-gray-600">
                Works with any blockchain or token. Not tied to specific networks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Web Native</h4>
              <p className="text-body-base text-gray-600">
                Built on HTTP 402 status code. Works with any HTTP stack or framework.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-meridian-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-meridian-600" />
              </div>
              <h4 className="text-heading-5 mb-3">Open Standard</h4>
              <p className="text-body-base text-gray-600">
                Decentralized protocol anyone can implement. Not tied to centralized providers.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h3 className="text-heading-2 text-center mb-12">Who Uses <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>?</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-heading-4 mb-4">AI Agents</h4>
              <p className="text-body-base text-gray-600 mb-4">
                Autonomous agents can pay for API requests in real-time without human intervention or account setup.
              </p>
              <div className="text-body-small text-gray-500">
                • Real-time API access<br/>
                • No account management<br/>
                • Autonomous payments
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-heading-4 mb-4">Cloud Providers</h4>
              <p className="text-body-base text-gray-600 mb-4">
                Offer storage, compute, and API services with instant pay-per-use pricing without registration flows.
              </p>
              <div className="text-body-small text-gray-500">
                • Instant access<br/>
                • Pay-per-use model<br/>
                • No signup friction
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 bg-meridian-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-meridian-600" />
              </div>
              <h4 className="text-heading-4 mb-4">Content Creators</h4>
              <p className="text-body-base text-gray-600 mb-4">
                Monetize APIs, data feeds, or premium content with true micropayments instead of subscriptions.
              </p>
              <div className="text-body-small text-gray-500">
                • Micropayment support<br/>
                • No subscription lock-in<br/>
                • Instant monetization
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-meridian-50 rounded-lg p-8 inline-block">
            <h3 className="text-heading-3 mb-4">Ready to integrate <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">x402</span>?</h3>
            <p className="text-body-large text-gray-600 mb-6">
              Stake tokens to access <span className="bg-meridian-300 text-black px-2 py-0.5 rounded font-semibold">meridian</span>'s payment facilitator and start earning yield
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-meridian-400 hover:bg-meridian-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                View Documentation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border border-meridian-300 hover:border-meridian-200 text-meridian-600 hover:text-meridian-700 font-semibold rounded-lg transition-colors">
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 