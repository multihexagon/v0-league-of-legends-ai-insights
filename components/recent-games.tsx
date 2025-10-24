"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Target,
  Eye,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"

export function RecentGames() {
  const recentStats = {
    totalGames: 20,
    wins: 13,
    losses: 7,
    winRate: 65,
    avgKDA: 3.2,
    avgDamage: 18500,
    avgVision: 42,
    currentStreak: { type: "win", count: 3 },
    trend: "up",
  }

  const tips = [
    {
      priority: "high",
      icon: AlertCircle,
      title: "Mejora tu Vision Score",
      description: "Tu vision score promedio es 42. Intenta colocar más wards en objetivos clave.",
      goal: "Objetivo: 50+ vision score",
    },
    {
      priority: "medium",
      icon: Target,
      title: "Mantén tu KDA",
      description: "Tu KDA de 3.2 es excelente. Sigue jugando de forma consistente.",
      goal: "Objetivo: Mantener 3.0+",
    },
    {
      priority: "low",
      icon: Zap,
      title: "Aumenta tu Daño",
      description: "Buen daño promedio. Considera builds más agresivas en matchups favorables.",
      goal: "Objetivo: 20,000+ daño",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 bg-red-500/10"
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/10"
      case "low":
        return "border-primary/50 bg-primary/10"
      default:
        return "border-primary/50 bg-primary/10"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-primary/20 text-primary"
      default:
        return "bg-primary/20 text-primary"
    }
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
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">Juegos Recientes</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Análisis de tus últimas {recentStats.totalGames} partidas
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="p-6 rounded-2xl glass-card neon-glow">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-primary" />
              {recentStats.trend === "up" ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : recentStats.trend === "down" ? (
                <TrendingDown className="w-6 h-6 text-red-400" />
              ) : (
                <Minus className="w-6 h-6 text-yellow-400" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">Win Rate</p>
            <p className="text-4xl font-black text-primary">{recentStats.winRate}%</p>
            <p className="text-xs text-muted-foreground mt-2">
              {recentStats.wins}W - {recentStats.losses}L
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <Target className="w-8 h-8 text-accent mb-4" />
            <p className="text-sm text-muted-foreground mb-2">KDA Promedio</p>
            <p className="text-4xl font-black text-foreground">{recentStats.avgKDA}</p>
            <p className="text-xs text-muted-foreground mt-2">Kill/Death/Assist</p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <Zap className="w-8 h-8 text-secondary mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Daño Promedio</p>
            <p className="text-4xl font-black text-foreground">{recentStats.avgDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">Por partida</p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <Eye className="w-8 h-8 text-accent mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Vision Score</p>
            <p className="text-4xl font-black text-foreground">{recentStats.avgVision}</p>
            <p className="text-xs text-muted-foreground mt-2">Promedio</p>
          </div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl glass-card neon-glow text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            {recentStats.currentStreak.type === "win" ? (
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            ) : (
              <Clock className="w-10 h-10 text-red-400" />
            )}
            <h3 className="text-3xl font-black">
              {recentStats.currentStreak.type === "win" ? "Racha de Victorias" : "Racha de Derrotas"}
            </h3>
          </div>
          <p className="text-6xl font-black gradient-text mb-2">{recentStats.currentStreak.count}</p>
          <p className="text-lg text-muted-foreground">
            {recentStats.currentStreak.type === "win"
              ? "¡Sigue así! Estás en una buena racha."
              : "No te rindas. Analiza tus errores y vuelve más fuerte."}
          </p>
        </motion.div>

        {/* AI Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-black mb-8 text-center">
            <span className="gradient-text">Consejos IA</span> para Mejorar
          </h3>

          <div className="space-y-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`p-6 rounded-2xl glass-card border-2 ${getPriorityColor(tip.priority)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background/50">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-foreground">{tip.title}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityBadge(tip.priority)}`}
                        >
                          {tip.priority === "high" ? "Alta" : tip.priority === "medium" ? "Media" : "Baja"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{tip.description}</p>
                      <p className="text-sm font-bold text-primary">{tip.goal}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
