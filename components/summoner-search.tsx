"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchData } from "@/lib/fetchData"

interface SummonerSearchProps {
  onDataFetched: (data: any) => void
}

export function SummonerSearch({ onDataFetched }: SummonerSearchProps) {
  const [summonerName, setSummonerName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!summonerName.trim()) return

    // Separar "Nombre#TAG"
    const [name, tag] = summonerName.split("#")
    if (!name || !tag) {
      setError("Please use the format Name#TAG (ex: Hide on bush#KR1)")
      return
    }
    
    setIsLoading(true)
    try {
      console.log("[v0] 🔍 Searching for:", name, tag)
      const data = await fetchData(name.trim(), tag.trim())

      console.log("[v0] ✅ Data obtained:", data)
      setResult(data)
      onDataFetched(data) // Send data to parent component
    } catch (err: any) {
      console.error("❌ Search error:", err)
      
      // Handle different types of errors with user-friendly messages
      let userMessage = "There was an error searching for your data."
      
      if (err.message.includes("404") || err.message.includes("not found")) {
        userMessage = "Summoner not found. Please check the name and tag format (Name#TAG)."
      } else if (err.message.includes("400") || err.message.includes("Bad Request")) {
        userMessage = "Invalid request format. Please use Name#TAG format."
      } else if (err.message.includes("429") || err.message.includes("rate limit")) {
        userMessage = "Too many requests. Please wait a moment and try again."
      } else if (err.message.includes("500") || err.message.includes("Internal Server")) {
        userMessage = "Our servers are experiencing issues. Please try again in a few minutes."
      } else if (err.message.includes("503") || err.message.includes("Service Unavailable")) {
        userMessage = "Riot Games API is temporarily unavailable. Please try again later."
      } else if (err.message.includes("timeout") || err.message.includes("ETIMEDOUT")) {
        userMessage = "Request timed out. Please check your connection and try again."
      } else if (!navigator.onLine) {
        userMessage = "No internet connection. Please check your network and try again."
      }
      
      setError(userMessage)
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text leading-tight">
            League in Review
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover your stats, achievements, and epic moments
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="relative p-8 rounded-3xl glass-card neon-glow">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="SummonerName#TAG"
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
                                            Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                                            Analyze
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              For example: HideOnBush#KR1, Faker#KR1
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center"
              >
                <p className="text-red-400 font-medium">{error}</p>
                <p className="text-xs text-red-400/70 mt-1">
                  Please try again or contact support if the problem persists
                </p>
              </motion.div>
            )}

          </div>
        </form>
      </motion.div>
    </section>
  )
}
