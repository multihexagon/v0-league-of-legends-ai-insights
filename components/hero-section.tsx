"use client"

import { motion } from "framer-motion"
import { Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 neon-glow"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">{"2024 League Recap"}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black mb-6 text-balance leading-none"
        >
          <span className="gradient-text">{"Tu Año"}</span>
          <br />
          <span className="text-foreground">{"en la Grieta"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
        >
          {"Una historia épica de victorias, derrotas y evolución. Descubre insights que cambiarán tu juego."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="text-lg px-10 py-6 neon-glow group bg-primary hover:bg-primary/90">
            <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
            {"Ver Mi Recap"}
          </Button>
        </motion.div>

        {/* Stats preview with stagger animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { label: "Partidas", value: "847", color: "primary" },
            { label: "Campeones", value: "23", color: "secondary" },
            { label: "Win Rate", value: "54%", color: "accent" },
            { label: "Rango Máximo", value: "Diamond II", color: "primary" },
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
      </div>
    </section>
  )
}
