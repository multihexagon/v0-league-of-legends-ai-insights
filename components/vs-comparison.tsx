"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Swords, Trophy, Target, Zap, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function VsComparison() {
  const [opponentName, setOpponentName] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const player1 = {
    name: "Tú",
    rank: "Diamond II",
    winRate: 54,
    kda: 3.4,
    games: 847,
    image: "/yasuo-league-of-legends-champion.jpg",
  }

  const player2 = {
    name: "Tu Amigo",
    rank: "Platinum I",
    winRate: 51,
    kda: 2.9,
    games: 623,
    image: "/lee-sin-league-of-legends-champion.jpg",
  }

  const stats = [
    { icon: Trophy, label: "Win Rate", p1: `${player1.winRate}%`, p2: `${player2.winRate}%`, winner: 1 },
    { icon: Target, label: "KDA", p1: player1.kda, p2: player2.kda, winner: 1 },
    { icon: Zap, label: "Partidas", p1: player1.games, p2: player2.games, winner: 1 },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!opponentName.trim()) return

    setIsSearching(true)
    // TODO: Integrate with League API to fetch opponent data
    setTimeout(() => {
      setIsSearching(false)
      setShowComparison(true)
      console.log("[v0] Searching for opponent:", opponentName)
    }, 1500)
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
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative p-6 rounded-3xl glass-card neon-glow">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Buscar invocador para comparar..."
                      value={opponentName}
                      onChange={(e) => setOpponentName(e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-primary/30 focus:border-primary"
                      disabled={isSearching}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSearching || !opponentName.trim()}
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
              </div>
            </form>
          </motion.div>
        )}

        {showComparison && (
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
                    <p className="text-lg text-primary font-bold">{player1.rank}</p>
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
                    <p className="text-lg text-secondary font-bold">{player2.rank}</p>
                  </motion.div>
                </div>

                {/* Stats comparison */}
                <div className="space-y-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="grid grid-cols-3 gap-4 items-center p-6 rounded-2xl glass-card"
                      >
                        <div
                          className={`text-right ${stat.winner === 1 ? "text-primary font-black" : "text-muted-foreground"}`}
                        >
                          <span className="text-3xl">{stat.p1}</span>
                        </div>

                        <div className="text-center">
                          <Icon className="w-6 h-6 text-foreground/60 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        </div>

                        <div
                          className={`text-left ${stat.winner === 2 ? "text-secondary font-black" : "text-muted-foreground"}`}
                        >
                          <span className="text-3xl">{stat.p2}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-center mt-12"
                >
                  <Button
                    size="lg"
                    onClick={() => {
                      setShowComparison(false)
                      setOpponentName("")
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
