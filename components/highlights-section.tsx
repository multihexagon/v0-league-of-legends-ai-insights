"use client"

import { motion } from "framer-motion"
import { Trophy, TrendingUp, Zap, Target, Award, Flame } from "lucide-react"

export function HighlightsSection() {
  const highlights = [
    {
      icon: Trophy,
      title: "Partida Más Épica",
      subtitle: "Yasuo vs 5",
      description: "Comeback desde 10k de oro abajo",
      stats: "23/4/12 KDA",
      gradient: "from-secondary to-secondary/50",
      date: "15 Ago 2024",
    },
    {
      icon: TrendingUp,
      title: "Mayor Mejora",
      subtitle: "Vision Score",
      description: "De 18 a 42 promedio por partida",
      stats: "+133% mejora",
      gradient: "from-primary to-primary/50",
      date: "Todo el año",
    },
    {
      icon: Flame,
      title: "Campeón Más Dominante",
      subtitle: "Thresh Support",
      description: "61% WR en 98 partidas",
      stats: "4.1 KDA",
      gradient: "from-accent to-accent/50",
      date: "Temporada 2024",
    },
  ]

  const achievements = [
    { icon: Zap, label: "First Blood", count: 89 },
    { icon: Target, label: "Perfect CS", count: 12 },
    { icon: Award, label: "Ace", count: 34 },
    { icon: Trophy, label: "Baron Steals", count: 7 },
  ]

  return (
    <section className="py-32 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">{"Momentos Épicos"}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{"Los highlights que definen tu año"}</p>
      </motion.div>

      {/* Main highlights */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon
          return (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative p-8 rounded-3xl glass-card overflow-hidden group cursor-pointer"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-foreground" />
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-foreground/10 text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                  {highlight.date}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">{highlight.title}</h3>
                <p className="text-lg font-bold text-primary mb-3">{highlight.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{highlight.description}</p>

                {/* Stats */}
                <div className="pt-4 border-t border-border/30">
                  <div className="text-3xl font-black gradient-text">{highlight.stats}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Achievement badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="p-6 rounded-2xl glass-card text-center group cursor-pointer"
            >
              <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-125 transition-transform" />
              <div className="text-3xl font-black text-foreground mb-1">{achievement.count}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{achievement.label}</div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
