import { MeridianMap } from "@/components/meridian-map"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      <Navigation />
      
      <main className="h-full w-full">
        <MeridianMap className="absolute inset-0 h-full w-full" />
        
        {/* Welcome overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-6 max-w-4xl px-8 py-12 bg-black/90 backdrop-blur-sm rounded-3xl shadow-2xl pointer-events-auto">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white">
                <span className="text-gray-400">x</span>402
              </h1>
              <p className="text-xl text-gray-200">
                An open protocol for internet-native payments
              </p>
            </div>
            
            <div className="space-y-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
                📄 Read the whitepaper
              </button>
              
              <div className="flex items-center justify-center gap-8 text-gray-300">
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  📚 Read the docs
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  💻 Try it out
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  🌐 View Ecosystem
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
