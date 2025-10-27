"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Swords, Trophy, Target, Zap, Search, Loader2, Coins, Eye, Shield, Crosshair, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PlayerSummary {
  games: number
  win_rate: number
  avg_kda: number
  avg_kills: number
  avg_deaths: number
  avg_assists: number
  avg_cs_per_min: number
  avg_dpm: number
  avg_gpm?: number
  avg_gold: number
  avg_damage_dealt: number
  avg_vision_score?: number
  rank?: string
  summoner_name?: string
}

interface OpponentData {
  name: string
  summary: PlayerSummary
  topChampion?: {
    name: string
    image: string
  }
}

interface VsComparisonProps {
  summary: PlayerSummary
  playerName?: string
  topChampion?: {
    name: string
    image: string
  }
}

export function VsComparison({ summary, playerName = "Tú", topChampion }: VsComparisonProps) {
  if (!summary) return null
  
  const [opponentName, setOpponentName] = useState("")
  const [opponentTag, setOpponentTag] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [opponentData, setOpponentData] = useState<OpponentData | null>(null)
  const [searchError, setSearchError] = useState("")

  const player1 = {
    name: playerName,
    rank: summary.rank || "Tu Rango",
    winRate: Math.round(summary.win_rate * 100),
    kda: summary.avg_kda.toFixed(1),
    games: summary.games,
    image: topChampion?.image || "/placeholder.svg",
  }

  const player2 = opponentData ? {
    name: opponentData.name,
    rank: opponentData.summary.rank || "Sin Rango",
    winRate: Math.round(opponentData.summary.win_rate * 100),
    kda: opponentData.summary.avg_kda.toFixed(1),
    games: opponentData.summary.games,
    image: opponentData.topChampion?.image || "/placeholder.svg",
  } : null

  // Organizar estadísticas por categorías
  const statCategories = player2 && opponentData ? [
    {
      category: "🏆 Rendimiento General",
      stats: [
        { 
          icon: Trophy, 
          label: "Win Rate", 
          p1: `${player1.winRate}%`, 
          p2: `${player2.winRate}%`, 
          winner: player1.winRate >= player2.winRate ? 1 : 2,
          isHigherBetter: true
        },
        { 
          icon: Target, 
          label: "KDA", 
          p1: player1.kda, 
          p2: player2.kda, 
          winner: parseFloat(player1.kda) >= parseFloat(player2.kda) ? 1 : 2,
          isHigherBetter: true
        },
        { 
          icon: Zap, 
          label: "Partidas", 
          p1: player1.games.toLocaleString(), 
          p2: player2.games.toLocaleString(), 
          winner: player1.games >= player2.games ? 1 : 2,
          isHigherBetter: true
        },
      ]
    },
    {
      category: "⚔️ Combate",
      stats: [
        { 
          icon: Crosshair, 
          label: "Kills/Partida", 
          p1: summary.avg_kills.toFixed(1), 
          p2: opponentData.summary.avg_kills.toFixed(1), 
          winner: summary.avg_kills >= opponentData.summary.avg_kills ? 1 : 2,
          isHigherBetter: true
        },
        { 
          icon: Shield, 
          label: "Deaths/Partida", 
          p1: summary.avg_deaths.toFixed(1), 
          p2: opponentData.summary.avg_deaths.toFixed(1), 
          winner: summary.avg_deaths <= opponentData.summary.avg_deaths ? 1 : 2,
          isHigherBetter: false
        },
        { 
          icon: Star, 
          label: "Assists/Partida", 
          p1: summary.avg_assists.toFixed(1), 
          p2: opponentData.summary.avg_assists.toFixed(1), 
          winner: summary.avg_assists >= opponentData.summary.avg_assists ? 1 : 2,
          isHigherBetter: true
        },
      ]
    },
    {
      category: "💰 Economía y Farm",
      stats: [
        { 
          icon: Target, 
          label: "CS/min", 
          p1: summary.avg_cs_per_min.toFixed(1), 
          p2: opponentData.summary.avg_cs_per_min.toFixed(1), 
          winner: summary.avg_cs_per_min >= opponentData.summary.avg_cs_per_min ? 1 : 2,
          isHigherBetter: true
        },
        { 
          icon: Coins, 
          label: "Oro Promedio", 
          p1: `${(summary.avg_gold / 1000).toFixed(1)}k`, 
          p2: `${(opponentData.summary.avg_gold / 1000).toFixed(1)}k`, 
          winner: summary.avg_gold >= opponentData.summary.avg_gold ? 1 : 2,
          isHigherBetter: true
        },
        { 
          icon: Zap, 
          label: "Daño/min", 
          p1: summary.avg_dpm.toFixed(0), 
          p2: opponentData.summary.avg_dpm.toFixed(0), 
          winner: summary.avg_dpm >= opponentData.summary.avg_dpm ? 1 : 2,
          isHigherBetter: true
        },
      ]
    },
    ...(summary.avg_vision_score && opponentData.summary.avg_vision_score ? [{
      category: "👁️ Visión y Utilidad",
      stats: [
        { 
          icon: Eye, 
          label: "Vision Score", 
          p1: summary.avg_vision_score.toFixed(1), 
          p2: opponentData.summary.avg_vision_score.toFixed(1), 
          winner: summary.avg_vision_score >= opponentData.summary.avg_vision_score ? 1 : 2,
          isHigherBetter: true
        },
      ]
    }] : [])
  ] : []

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!opponentName.trim() || !opponentTag.trim()) return

    setIsSearching(true)
    setSearchError("")
    
    try {
      const response = await fetch('/api/search-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summonerName: opponentName.trim(),
          tag: opponentTag.trim()
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar el jugador')
      }

      setOpponentData(data)
      setShowComparison(true)
    } catch (error) {
      console.error('Error searching for opponent:', error)
      setSearchError(error instanceof Error ? error.message : 'Error al buscar el jugador')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className="py-32 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">Modo VS</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">Compara tu progreso con tus amigos</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {!showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative p-6 rounded-3xl glass-card neon-glow">
                {searchError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {searchError}
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Nombre del invocador..."
                      value={opponentName}
                      onChange={(e) => setOpponentName(e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-primary/30 focus:border-primary"
                      disabled={isSearching}
                    />
                  </div>
                  <div className="relative w-32">
                    <Input
                      type="text"
                      placeholder="Tag"
                      value={opponentTag}
                      onChange={(e) => setOpponentTag(e.target.value)}
                      className="h-12 bg-background/50 border-primary/30 focus:border-primary text-center"
                      disabled={isSearching}
                      maxLength={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSearching || !opponentName.trim() || !opponentTag.trim()}
                    className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Swords className="w-4 h-4 mr-2" />
                        Comparar
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Ejemplo: NombreJugador + EUW1
                </p>
              </div>
            </form>
          </motion.div>
        )}

        {showComparison && player2 && (
          <>
            {/* VS Arena */}
            <div className="relative p-12 rounded-3xl glass-card overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl" />

              <div className="relative z-10">
                {/* Player cards */}
                <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
                  {/* Player 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden neon-glow">
                      <img
                        src={player1.image || "/placeholder.svg"}
                        alt={player1.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-2">{player1.name}</h3>
                    <div className="space-y-1">
                      <p className="text-lg text-primary font-bold">{player1.rank}</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        <span>{player1.winRate}% WR</span>
                        <span>•</span>
                        <span>{player1.games} partidas</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* VS Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center neon-glow">
                      <Swords className="w-16 h-16 text-foreground" />
                    </div>
                  </motion.div>

                  {/* Player 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden neon-glow-gold">
                      <img
                        src={player2.image || "/placeholder.svg"}
                        alt={player2.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-2">{player2.name}</h3>
                    <div className="space-y-1">
                      <p className="text-lg text-secondary font-bold">{player2.rank}</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        <span>{player2.winRate}% WR</span>
                        <span>•</span>
                        <span>{player2.games} partidas</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats comparison por categorías */}
                <div className="space-y-12">
                  {statCategories.map((category, categoryIndex) => (
                    <div key={category.category} className="space-y-6">
                      {/* Título de categoría */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.2 }}
                        className="text-center"
                      >
                        <h4 className="text-2xl font-bold text-foreground mb-2">{category.category}</h4>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                      </motion.div>
                      
                      {/* Stats de la categoría */}
                      <div className="grid gap-4">
                        {category.stats.map((stat, statIndex) => {
                          const Icon = stat.icon
                          const globalIndex = categoryIndex * 10 + statIndex
                          return (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.8 + globalIndex * 0.1 }}
                              className="grid grid-cols-3 gap-4 items-center p-6 rounded-2xl glass-card hover:shadow-lg transition-all duration-300"
                            >
                              <div
                                className={`text-right ${stat.winner === 1 ? "text-primary font-black" : "text-muted-foreground"}`}
                              >
                                <span className="text-2xl md:text-3xl">{stat.p1}</span>
                                {stat.winner === 1 && (
                                  <div className="text-xs text-primary/70 mt-1">GANADOR</div>
                                )}
                              </div>

                              <div className="text-center">
                                <Icon className="w-6 h-6 text-foreground/60 mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                                {!stat.isHigherBetter && (
                                  <p className="text-xs text-accent/60 mt-1">Menor es mejor</p>
                                )}
                              </div>

                              <div
                                className={`text-left ${stat.winner === 2 ? "text-secondary font-black" : "text-muted-foreground"}`}
                              >
                                <span className="text-2xl md:text-3xl">{stat.p2}</span>
                                {stat.winner === 2 && (
                                  <div className="text-xs text-secondary/70 mt-1">GANADOR</div>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de victorias */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20"
                >
                  {(() => {
                    const totalStats = statCategories.reduce((acc, category) => acc + category.stats.length, 0)
                    const player1Wins = statCategories.reduce((acc, category) => 
                      acc + category.stats.filter(stat => stat.winner === 1).length, 0
                    )
                    const player2Wins = totalStats - player1Wins
                    const overallWinner = player1Wins > player2Wins ? 1 : player1Wins < player2Wins ? 2 : 0
                    
                    return (
                      <div className="text-center space-y-4">
                        <h3 className="text-3xl font-black text-foreground">🏆 Resultado Final</h3>
                        <div className="flex justify-center items-center gap-8">
                          <div className={`text-center p-4 rounded-2xl ${overallWinner === 1 ? 'bg-primary/20 border-2 border-primary' : 'bg-muted/10'}`}>
                            <p className="text-lg font-bold text-foreground">{player1.name}</p>
                            <p className="text-2xl font-black text-primary">{player1Wins} victorias</p>
                            {overallWinner === 1 && <p className="text-sm text-primary font-bold mt-1">🎉 GANADOR GENERAL</p>}
                          </div>
                          <div className="text-6xl">VS</div>
                          <div className={`text-center p-4 rounded-2xl ${overallWinner === 2 ? 'bg-secondary/20 border-2 border-secondary' : 'bg-muted/10'}`}>
                            <p className="text-lg font-bold text-foreground">{player2.name}</p>
                            <p className="text-2xl font-black text-secondary">{player2Wins} victorias</p>
                            {overallWinner === 2 && <p className="text-sm text-secondary font-bold mt-1">🎉 GANADOR GENERAL</p>}
                          </div>
                        </div>
                        {overallWinner === 0 && (
                          <p className="text-xl font-bold text-accent">🤝 ¡Empate perfecto!</p>
                        )}
                      </div>
                    )
                  })()}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 2 }}
                  className="text-center mt-12"
                >
                  <Button
                    size="lg"
                    onClick={() => {
                      setShowComparison(false)
                      setOpponentName("")
                      setOpponentTag("")
                      setOpponentData(null)
                      setSearchError("")
                    }}
                    className="neon-glow bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Buscar Otro Invocador
                  </Button>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
