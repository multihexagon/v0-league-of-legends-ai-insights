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
      setError("Por favor usa el formato Nombre#TAG (ej: Hide on bush#KR1)")
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] 🔍 Consultando Lambda con:", name, tag)
      const data = await fetchData(name.trim(), tag.trim())

      console.log("[v0] ✅ Datos obtenidos:", data)
      setResult(data)
      onDataFetched(data) // Enviar datos al componente padre
    } catch (err: any) {
      console.error("❌ Error al buscar:", err)
      setError(err.message || "Hubo un error al buscar tus datos.")
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
          <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text">
            Rift Rewind
          </h1>
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
                  placeholder="NombreDeInvocador#TAG"
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
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Ejemplo: Hide on bush#KR1, Faker#KR1
            </p>

            {error && (
              <p className="text-red-400 mt-4 text-center">{error}</p>
            )}

          </div>
        </form>
      </motion.div>
    </section>
  )
}
