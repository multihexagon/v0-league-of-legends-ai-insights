"use client"

import { HeroSection } from "@/components/hero-section"
import { StatsOverview } from "@/components/stats-overview"
import { ChampionShowcase } from "@/components/champion-showcase"
import { HighlightsSection } from "@/components/highlights-section"
import { VsComparison } from "@/components/vs-comparison"
import { ShareSection } from "@/components/share-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsOverview />
      <ChampionShowcase />
      <HighlightsSection />
      <VsComparison />
      <ShareSection />
    </main>
  )
}
