"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Target, 
  Users, 
  Map, 
  Gamepad2, 
  Eye, 
  Clock, 
  Shield,
  Zap,
  TrendingUp,
  Lightbulb,
  Crown
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface TipsAdviceProps {
  recap?: {
    improvements?: { issue: string; drill: string }[]
    recommended_roles?: string[]
    recommended_champions?: string[]
    actionable_advice?: string[]
    confidence?: string
    style?: string
    trends?: string[]
  }
}

export function TipsAdvice({ recap }: TipsAdviceProps) {
  // Priorizar consejos del recap si están disponibles
  const dynamicTips = recap?.actionable_advice ? recap.actionable_advice.map((advice, index) => {
    const colors = ["primary", "accent", "chart-4", "secondary", "chart-3", "chart-5"]
    return {
      icon: [Target, Eye, Shield, Users, Map, Clock][index % 6],
      title: `AI Recommendation ${index + 1}`,
      tip: advice,
      description: "Personalized advice from your gameplay analysis",
      category: "AI Insights",
      color: colors[index % 6]
    }
  }) : []

  const generalTips = [
    {
      icon: Target,
      title: "Farming Excellence",
      tip: "Practica last-hitting 10 minutos diarios en training tool",
      description: "Un buen CS es la base de todo carry",
      category: "Fundamentals",
      color: "primary"
    },
    {
      icon: Eye,
      title: "Vision Control",
      tip: "Compra control wards en cada back, coloca wards proactivamente",
      description: "Vision wins games - controla objetivos importantes",
      category: "Map Awareness",
      color: "accent"
    },
    {
      icon: Shield,
      title: "Positioning",
      tip: "Mantén distancia segura, usa terrain y teammates como shields",
      description: "Better positioning = less deaths = more impact",
      category: "Survival",
      color: "chart-4"
    },
    {
      icon: Users,
      title: "Team Fighting",
      tip: "Focus el mismo target que tu equipo, protege tus carries",
      description: "Coordination > individual plays in team fights",
      category: "Teamwork",
      color: "secondary"
    },
    {
      icon: Map,
      title: "Objective Priority",
      tip: "Dragons > Herald > Towers > Jungle camps",
      description: "Objectives win games, not just kills",
      category: "Strategy",
      color: "chart-3"
    },
    {
      icon: Clock,
      title: "Game State Awareness",
      tip: "Early game = farm, Mid game = objectives, Late game = positioning",
      description: "Adapt your playstyle to the game phase",
      category: "Game Knowledge",
      color: "chart-5"
    }
  ]

  const roleSpecificTips = {
    "ADC": [
      "Stay behind your team in fights",
      "Focus on consistent DPS, not flashy plays",
      "Position to hit the closest enemy safely"
    ],
    "Support": [
      "Roam to help other lanes when possible",
      "Control vision around objectives",
      "Protect your carry, don't chase kills"
    ],
    "Mid": [
      "Push and roam to help side lanes",
      "Control river vision for team",
      "Balance farming with team impact"
    ],
    "Top": [
      "Learn when to TP for team fights",
      "Manage the wave to control pressure",
      "Split push when team can't fight"
    ],
    "Jungle": [
      "Track enemy jungler position",
      "Prioritize objectives over ganks",
      "Control river scuttles for vision"
    ]
  }

  return (
    <section className="py-24 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Pro Tips & Advice</h2>
        <p className="text-xl text-muted-foreground">
          Level up your gameplay with these expert strategies
        </p>
      </motion.div>

      {/* General Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Mostrar primero consejos dinámicos del recap, luego generales */}
        {[...dynamicTips, ...generalTips].slice(0, 6).map((tip, index) => {
          const Icon = tip.icon
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <InfoTooltip content={tip.description}>
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${tip.color}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${tip.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{tip.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${tip.color}/10 text-${tip.color}`}>
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tip.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </InfoTooltip>
            </motion.div>
          )
        })}
      </div>

      {/* Role-Specific Tips */}
      {recap?.recommended_roles && recap.recommended_roles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-card/50 border border-border/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Tips for Your Roles</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recap.recommended_roles.map((role, index) => {
              const tips = roleSpecificTips[role as keyof typeof roleSpecificTips] || []
              return (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="p-6 rounded-lg bg-background/50 border border-border/30"
                >
                  <h4 className="text-lg font-bold text-primary mb-4">{role} Tips</h4>
                  <ul className="space-y-2">
                    {tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Improvement Focus */}
      {recap?.improvements && recap.improvements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-chart-4/10 to-primary/10 border border-chart-4/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-chart-4" />
            <h3 className="text-2xl font-bold">Your Priority Improvements</h3>
          </div>
          
          <div className="grid gap-4">
            {recap.improvements.slice(0, 3).map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-background/30 border border-border/20"
              >
                <div className="w-8 h-8 rounded-full bg-chart-4/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-chart-4">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 capitalize">
                    {improvement.issue}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <Lightbulb className="w-4 h-4 inline mr-1 text-accent" />
                    <strong>Training Drill:</strong> {improvement.drill}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommended Champions */}
      {recap?.recommended_champions && recap.recommended_champions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 p-8 rounded-2xl bg-card/50 border border-border/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-secondary" />
              Recommended Champions
            </h3>
            <p className="text-muted-foreground">
              Based on your {recap.style ? `${recap.style} ` : ''}play style and performance
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {recap.recommended_champions.map((champion, index) => (
              <motion.div
                key={champion}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 transition-all cursor-pointer"
              >
                <span className="font-medium">{champion}</span>
              </motion.div>
            ))}
          </div>
          
          {recap.trends && recap.trends.length > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-muted/30">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Why these champions work for you:
              </h4>
              <p className="text-sm text-muted-foreground">{recap.trends[0]}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Motivation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20"
      >
        <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Remember</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Improvement comes from consistent practice and analyzing your gameplay. 
          Focus on one area at a time, and you'll see results in your next matches!
        </p>
        {recap?.confidence && (
          <div className="mt-4">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              AI Confidence: {recap.confidence.charAt(0).toUpperCase() + recap.confidence.slice(1)}
            </span>
          </div>
        )}
      </motion.div>
    </section>
  )
}