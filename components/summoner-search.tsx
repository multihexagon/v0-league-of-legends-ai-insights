"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SummonerSearch() {
  const [summonerName, setSummonerName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!summonerName.trim()) return

    setIsLoading(true)
    // TODO: Integrate with League API to fetch summoner data
    setTimeout(() => {
      setIsLoading(false)
      console.log("[v0] Searching for summoner:", summonerName)
    }, 1500)
  }

  return (
    <section className="py-20 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text">Tu Año en League of Legends</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Descubre tus estadísticas, logros y momentos épicos
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="relative p-8 rounded-3xl glass-card neon-glow">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Nombre de Invocador#TAG"
                  value={summonerName}
                  onChange={(e) => setSummonerName(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/50 border-primary/30 focus:border-primary"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !summonerName.trim()}
                className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 neon-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">Ejemplo: Hide on bush#KR1, Faker#KR1</p>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
