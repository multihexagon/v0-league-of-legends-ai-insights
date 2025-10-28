"use client"

import { motion } from "framer-motion"
import { Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  summary: {
    games: number
    win_rate: number
    avg_kda: number
  }
  topChampion?: {
    name: string
    image: string
    splashImage?: string
    games: number
  }
  recap?: {
    strengths: string
    improvements: { issue: string; drill: string }[]
    next_match_tip: string
    confidence: string
    style?: string
    trends?: string[]
    recommended_roles?: string[]
  }
}

export function HeroSection({ summary, topChampion, recap }: HeroSectionProps) {
  // Función para hacer scroll suave hacia la siguiente sección
  const handleSeeRecap = () => {
    // Agregar un pequeño delay para la animación del botón
    setTimeout(() => {
      // Buscar la siguiente sección después del hero (StatsOverview probablemente)
      const nextSection = document.querySelector('section:nth-of-type(2)') as HTMLElement
      
      if (nextSection) {
        // Calcular el offset para que la sección aparezca un poco más abajo del top
        const offsetTop = nextSection.offsetTop - 80 // 80px de margen superior
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      } else {
        // Fallback: scroll hacia abajo por casi el viewport height
        window.scrollTo({
          top: window.innerHeight * 0.8, // 80% del viewport
          behavior: 'smooth'
        })
      }
    }, 100) // Pequeño delay para que se vea la animación del botón
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Champion splash background (very subtle) */}
      {topChampion?.splashImage && (
        <div className="absolute inset-0">
          <img
            src={topChampion.splashImage}
            alt={`${topChampion.name} background`}
            className="w-full h-full object-cover opacity-5"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto mt-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 neon-glow"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {recap?.style ? `${recap.style.charAt(0).toUpperCase() + recap.style.slice(1)} Player` : "2025"}
            {recap?.confidence && ` • ${recap.confidence.charAt(0).toUpperCase() + recap.confidence.slice(1)} Confidence`}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black mb-6 text-balance leading-none"
        >
          <span className="gradient-text">Your Rift</span>
          <br />
          <span className="text-foreground">Rewind</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
        >
          An epic story of victories, defeats, and evolution. Discover insights that will change your game.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 neon-glow group bg-primary hover:bg-primary/90 active:scale-95 transition-transform"
            onClick={handleSeeRecap}
          >
            <Play className="w-6 h-6 mr-2 group-hover:scale-110 group-active:rotate-90 transition-all duration-200" />
            {"See my recap"}
          </Button>
        </motion.div>

        {/* Top Champion highlight */}
        {topChampion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex items-center justify-center"
          >
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl glass-card neon-glow">
              <img
                src={topChampion.image}
                alt={topChampion.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-primary/50"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg"
                }}
              />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Your favorite champion</p>
                <p className="text-lg font-bold text-foreground">{topChampion.name}</p>
                <p className="text-xs text-primary">{topChampion.games} games</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommended roles */}
        {recap?.recommended_roles && recap.recommended_roles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-sm text-muted-foreground">Recommended Roles:</span>
            {recap.recommended_roles.map((role, index) => (
              <span
                key={role}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {role}
              </span>
            ))}
          </motion.div>
        )}

        {/* Stats preview with stagger animation */}
        {summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6"
          >
            {[
              { label: "Games", value: summary.games.toString(), color: "primary" },
              { label: "Win Rate", value: `${(summary.win_rate * 100).toFixed(0)}%`, color: "accent" },
              { label: "Average KDA", value: summary.avg_kda.toFixed(2), color: "secondary" },
            ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
              className="p-8 rounded-2xl glass-card hover:scale-105 transition-transform cursor-pointer"
            >
              <div className={`text-4xl md:text-5xl font-black text-${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
