"use client"

import { SummonerSearch } from "@/components/summoner-search"
import { HeroSection } from "@/components/hero-section"
import { StatsOverview } from "@/components/stats-overview"
import { ChampionShowcase } from "@/components/champion-showcase"
import { HighlightsSection } from "@/components/highlights-section"
import { RecentGames } from "@/components/recent-games"
import { VsComparison } from "@/components/vs-comparison"
import { ShareSection } from "@/components/share-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SummonerSearch />
      <HeroSection />
      <StatsOverview />
      <ChampionShowcase />
      <HighlightsSection />
      <RecentGames />
      <VsComparison />
      <ShareSection />
    </main>
  )
}
