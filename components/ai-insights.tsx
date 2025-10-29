"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, Target, AlertTriangle, Lightbulb, BookOpen, HelpCircle, Sparkles, Crown, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"


interface AIInsightsProps {
  recap: {
    strengths: string
    improvements: { issue: string; drill: string }[]
    next_match_tip: string
    confidence: string
    style?: string
    trends?: string[]
    recommended_roles?: string[]
    recommended_champions?: string[]
    actionable_advice?: string[]
  }
}

// Tooltips informativos para cada tipo de insight
const insightTooltips = {
  strength: "Estas son tus fortalezas identificadas por IA. Aprovéchalas en futuras partidas",
  improvement: "Áreas de mejora detectadas. Los drills te ayudarán a practicar específicamente",
  strategy: "Consejos tácticos para tu próxima partida basados en tu estilo de juego",
  roles: "Roles recomendados basados en tu rendimiento y preferencias de juego",
  trends: "Patrones de rendimiento detectados en tus partidas recientes",
  champions: "Campeones recomendados que se adaptan a tu estilo de juego actual",
  actionable: "Consejos prácticos que puedes aplicar inmediatamente en tus próximas partidas",
  style: "Tu estilo de juego identificado por IA basado en patrones de comportamiento"
}

export function AIInsights({ recap }: AIInsightsProps) {
  if (!recap) return null

  // Generar insights dinámicos basados en el recap de Bedrock
  const insights = [
    // Fortaleza principal (ahora es un string)
    {
      icon: Brain,
      title: "Key Strengths",
      description: recap.strengths,
      highlight: "Strong Points",
      color: "primary",
      type: "strength" as const
    },
    
    // Style insight (si está disponible)
    ...(recap.style ? [{
      icon: Sparkles,
      title: "Play Style",
      description: `Your identified play style is ${recap.style}. This affects how you approach matches and team fights.`,
      highlight: recap.style.charAt(0).toUpperCase() + recap.style.slice(1),
      color: "secondary",
      type: "style" as const
    }] : []),
    
    // Áreas de mejora principales (solo la primera para hacer espacio)
    ...recap.improvements.slice(0, 1).map((improvement, index) => ({
      icon: AlertTriangle,
      title: "Priority Improvement",
      description: `Focus on ${improvement.issue}: ${improvement.drill}`,
      highlight: improvement.issue.charAt(0).toUpperCase() + improvement.issue.slice(1),
      color: "chart-4",
      type: "improvement" as const,
      drill: improvement.drill
    })),

    // Recommended Champions insight
    ...(recap.recommended_champions && recap.recommended_champions.length > 0 ? [{
      icon: Crown,
      title: "Recommended Champions",
      description: `Based on your play style and performance, try: ${recap.recommended_champions.slice(0, 3).join(', ')}`,
      highlight: "Perfect Match",
      color: "chart-5",
      type: "champions" as const
    }] : []),

    // Actionable Advice insight
    ...(recap.actionable_advice && recap.actionable_advice.length > 0 ? [{
      icon: Zap,
      title: "Quick Wins",
      description: recap.actionable_advice[0], // Mostrar el primer consejo
      highlight: "Immediate Impact",
      color: "accent",
      type: "actionable" as const
    }] : [])
  ].slice(0, 6) // Aumentar a 6 insights máximo

  // Agregar insight de próxima partida si hay espacio
  if (insights.length < 4 && recap.next_match_tip) {
    insights.push({
      icon: Lightbulb,
      title: "Next Match Strategy",
      description: recap.next_match_tip,
      highlight: `${recap.confidence.charAt(0).toUpperCase() + recap.confidence.slice(1)} Confidence`,
      color: "chart-5",
      type: "improvement" as const,
      drill: "Apply this strategy in your next game"
    })
  }

  // Agregar insight de roles recomendados si hay espacio y datos disponibles
  if (insights.length < 4 && recap.recommended_roles && recap.recommended_roles.length > 0) {
    insights.push({
      icon: BookOpen,
      title: "Recommended Roles",
      description: `You excel at: ${recap.recommended_roles.join(', ')}`,
      highlight: "Role Mastery",
      color: "accent",
      type: "strength" as const
    })
  }

  // Agregar insight de tendencias si hay espacio y datos disponibles
  if (insights.length < 4 && recap.trends && recap.trends.length > 0) {
    insights.push({
      icon: TrendingUp,
      title: "Performance Pattern",
      description: recap.trends[0],
      highlight: "Current Trend",
      color: "secondary",
      type: "strength" as const
    })
  }

  return (
    <section className="py-24 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Insights</h2>
        <p className="text-xl text-muted-foreground">
          Personalized analysis from your gameplay data
          {recap.style && (
            <span className="ml-2 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              {recap.style.charAt(0).toUpperCase() + recap.style.slice(1)} Player
            </span>
          )}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          const colorClass = `text-${insight.color}`
          const bgColorClass = `bg-${insight.color}/10`
          const borderColorClass = `border-${insight.color}/20`
          
          return (
            <motion.div
              key={`${insight.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all group h-full shadow-sm">
                <div className="flex items-start gap-4 h-full">
                  <div className={`w-12 h-12 rounded-lg ${bgColorClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                  </div>
                  <div className="flex-1 min-h-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{insight.title}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {insight.type === 'strength' && insightTooltips.strength}
                            {insight.type === 'improvement' && insightTooltips.improvement}
                            {insight.type === 'style' && insightTooltips.style}
                            {insight.type === 'champions' && insightTooltips.champions}
                            {insight.type === 'actionable' && insightTooltips.actionable}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {insight.description}
                    </p>
                    
                    {/* Drill/tip específico para mejoras */}
                    {insight.type === "improvement" && (
                      <div className="mb-4 p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
                        <p className="text-sm font-medium text-foreground">
                          💡 Training Drill: {(insight as any).drill || "Practice regularly to improve"}
                        </p>
                      </div>
                    )}
                    
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgColorClass} ${borderColorClass} border`}>
                      <span className={`text-sm font-medium ${colorClass}`}>
                        {insight.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Sección adicional con todas las tendencias si hay más de una */}
      {recap.trends && recap.trends.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            All Performance Trends
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {recap.trends.map((trend, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{trend}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sección de consejos accionables */}
      {recap.actionable_advice && recap.actionable_advice.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Actionable Advice
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{insightTooltips.actionable}</p>
              </TooltipContent>
            </Tooltip>
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {recap.actionable_advice.map((advice, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-accent/20">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent">{index + 1}</span>
                </div>
                <span className="text-sm text-foreground leading-relaxed">{advice}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sección de drills de mejora adicionales si hay más de 1 mejora */}
      {recap.improvements && recap.improvements.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-chart-4" />
            All Training Drills
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{insightTooltips.improvement}</p>
              </TooltipContent>
            </Tooltip>
          </h3>
          <div className="space-y-3">
            {recap.improvements.slice(1).map((improvement, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2 capitalize flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-chart-4" />
                  {improvement.issue}
                </h4>
                <p className="text-muted-foreground text-sm pl-6">
                  <strong>Training Drill:</strong> {improvement.drill}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}