"use client"

import { useState } from "react"
import { SummonerSearch } from "@/components/summoner-search"
import { HeroSection } from "@/components/hero-section"
import { StatsOverview } from "@/components/stats-overview"
import { ChampionShowcase } from "@/components/champion-showcase"
import { HighlightsSection } from "@/components/highlights-section"
import { RecentGames } from "@/components/recent-games"
import { VsComparison } from "@/components/vs-comparison"
import { ShareSection } from "@/components/share-section"

export default function Home() {
  const [playerData, setPlayerData] = useState<any>(null)

  const handleDataFetched = (data: any) => {
    console.log("✅ Data recibida:", data)
    setPlayerData(data)
  }

  // Obtener el campeón más jugado
  const getTopChampion = (matches: any[]) => {
    if (!matches || matches.length === 0) return null
    
    const championCount = matches.reduce((acc, match) => {
      if (!acc[match.champion]) {
        acc[match.champion] = {
          name: match.champion,
          image: match.champion_img, // Usar icono pequeño en HeroSection
          splashImage: match.champion_splash, // Imagen splash para futuros usos
          games: 0
        }
      }
      acc[match.champion].games += 1
      return acc
    }, {} as Record<string, any>)

    return Object.values(championCount)
      .sort((a: any, b: any) => b.games - a.games)[0] as any
  }

  return (
    <main className="min-h-screen">
      {/* Siempre visible */}
      <SummonerSearch onDataFetched={handleDataFetched} />

      {/* Solo visible si hay datos */}
      {playerData && (
        <>
          <HeroSection 
            summary={playerData.summary} 
            topChampion={getTopChampion(playerData.matches)}
          />
          <StatsOverview summary={playerData.summary} />
          <ChampionShowcase matches={playerData.matches} />
          <HighlightsSection 
            recap={playerData.recap} 
            matches={playerData.matches}
            summary={playerData.summary}
          />
          <RecentGames matches={playerData.matches} />
          <VsComparison 
            summary={playerData.summary} 
            playerName={playerData.summary?.summoner_name || "Tú"}
            topChampion={getTopChampion(playerData.matches)}
          />
          <ShareSection recap={playerData.recap} />
        </>
      )}
    </main>
  )
}
