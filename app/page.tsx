import { MeridianMap } from "@/components/meridian-map"

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-50">
      <MeridianMap className="absolute inset-0 h-full w-full" />
      {/* Any other content for your page can be placed here, on top of the map */}
    </main>
  )
}
