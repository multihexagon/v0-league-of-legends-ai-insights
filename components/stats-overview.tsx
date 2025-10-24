"use client"

import { motion } from "framer-motion"
import { Trophy, Target, Zap, Award, TrendingUp, Swords } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      icon: Trophy,
      title: "Racha de Victorias",
      value: "12",
      suffix: "partidas",
      description: "Tu mejor racha de la temporada",
      gradient: "from-secondary via-secondary/80 to-secondary/60",
    },
    {
      icon: Target,
      title: "CS por Minuto",
      value: "7.8",
      suffix: "",
      description: "+1.2 de mejora vs temporada pasada",
      gradient: "from-primary via-primary/80 to-primary/60",
    },
    {
      icon: Zap,
      title: "Pentakills",
      value: "3",
      suffix: "",
      description: "Momentos legendarios capturados",
      gradient: "from-accent via-accent/80 to-accent/60",
    },
    {
      icon: Award,
      title: "MVP Awards",
      value: "127",
      suffix: "veces",
      description: "Llevaste a tu equipo a la victoria",
      gradient: "from-secondary via-secondary/80 to-secondary/60",
    },
    {
      icon: TrendingUp,
      title: "Mejora de Rango",
      value: "+3",
      suffix: "divisiones",
      description: "Tu ascenso esta temporada",
      gradient: "from-primary via-primary/80 to-primary/60",
    },
    {
      icon: Swords,
      title: "KDA Promedio",
      value: "3.4",
      suffix: "",
      description: "Consistencia en combate",
      gradient: "from-accent via-accent/80 to-accent/60",
    },
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
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">{"Tu Temporada"}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{"Los números que cuentan tu historia"}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-8 rounded-3xl glass-card overflow-hidden group cursor-pointer"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Icon className="w-8 h-8 text-foreground/60" />
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-foreground">{stat.value}</span>
                    {stat.suffix && <span className="text-2xl font-bold text-muted-foreground">{stat.suffix}</span>}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">{stat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
