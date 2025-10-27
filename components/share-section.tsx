"use client"

import { motion } from "framer-motion"
import { Share2, Download, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareSectionProps {
  recap: {
    strengths: string[]
    next_match_tip: string
    confidence: string
  }
}

export function ShareSection({ recap }: ShareSectionProps) {
  if (!recap) return null
  const shareCards = [
    {
      title: "Tu Año en la Grieta",
      description: `Confianza ${recap.confidence} • ${recap.strengths.length} fortalezas`,
      gradient: "from-primary to-accent",
      icon: Share2,
    },
    {
      title: "Fortalezas Principales",
      description: recap.strengths.slice(0, 2).join(" • "),
      gradient: "from-accent to-secondary",
      icon: Twitter,
    },
    {
      title: "Tip para Mejorar",
      description: recap.next_match_tip,
      gradient: "from-secondary to-primary",
      icon: Instagram,
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
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">{"Comparte Tu Historia"}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{"Presume tus logros y desafía a tus amigos"}</p>
      </motion.div>

      {/* Share cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {shareCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative p-8 rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`} />

              {/* Content */}
              <div className="relative z-10 text-center">
                <Icon className="w-12 h-12 text-foreground mx-auto mb-6 group-hover:scale-125 transition-transform" />
                <h3 className="text-2xl font-black text-foreground mb-3">{card.title}</h3>
                <p className="text-sm text-foreground/80 mb-6">{card.description}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-foreground text-background hover:bg-foreground/90 font-bold"
                >
                  {"Compartir"}
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-3xl mx-auto p-12 rounded-3xl glass-card text-center"
      >
        <h3 className="text-3xl font-black text-foreground mb-4">{"Descarga tu Recap Completo"}</h3>
        <p className="text-lg text-muted-foreground mb-8">
          {"Obtén un PDF personalizado con todas tus estadísticas y momentos destacados"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="neon-glow bg-primary hover:bg-primary/90">
            <Download className="w-5 h-5 mr-2" />
            {"Descargar PDF"}
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary bg-transparent">
            <Share2 className="w-5 h-5 mr-2" />
            {"Compartir en Redes"}
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            {"Powered by AWS Bedrock • Riot Games API • League Developer Challenge 2025"}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
