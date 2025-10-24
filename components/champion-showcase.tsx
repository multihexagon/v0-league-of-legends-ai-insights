"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Crown, Flame, Star } from "lucide-react"

export function ChampionShowcase() {
  const champions = [
    {
      name: "Yasuo",
      role: "Mid Lane",
      games: 156,
      winRate: 58,
      kda: "3.2",
      mastery: 7,
      image: "/yasuo-league-of-legends-champion.jpg",
      badge: "Más Jugado",
      icon: Crown,
    },
    {
      name: "Lee Sin",
      role: "Jungle",
      games: 134,
      winRate: 52,
      kda: "2.8",
      mastery: 7,
      image: "/lee-sin-league-of-legends-champion.jpg",
      badge: "Carry",
      icon: Flame,
    },
    {
      name: "Thresh",
      role: "Support",
      games: 98,
      winRate: 61,
      kda: "4.1",
      mastery: 6,
      image: "/thresh-league-of-legends-champion.jpg",
      badge: "MVP",
      icon: Star,
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
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">{"Tus Campeones"}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{"Las leyendas que dominaste"}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {champions.map((champion, index) => {
          const BadgeIcon = champion.icon
          return (
            <motion.div
              key={champion.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-3xl glass-card group cursor-pointer"
            >
              {/* Champion image */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={champion.image || "/placeholder.svg"}
                  alt={champion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                {/* Badge */}
                <Badge className="absolute top-6 right-6 bg-gradient-to-r from-primary to-accent text-foreground font-bold px-4 py-2 neon-glow flex items-center gap-2">
                  <BadgeIcon className="w-4 h-4" />
                  {champion.badge}
                </Badge>

                {/* Champion name overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-4xl font-black mb-2 text-foreground">{champion.name}</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{champion.role}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-primary mb-1">{champion.games}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{"Partidas"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-secondary mb-1">{champion.winRate}%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{"Win Rate"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent mb-1">{champion.kda}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{"KDA"}</div>
                  </div>
                </div>

                {/* Mastery indicator */}
                <div className="flex items-center justify-between pt-6 border-t border-border/30">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">{"Maestría"}</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: champion.mastery }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent neon-glow"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
