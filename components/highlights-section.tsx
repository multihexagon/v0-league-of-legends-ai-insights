"use client"

import { motion } from "framer-motion"
import { Trophy, TrendingUp, Zap, Target, Award, Flame, HelpCircle, Sparkles, Crown } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface HighlightsSectionProps {
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
  matches: Array<{
    champion: string
    champion_img: string
    champion_splash: string
    role: string
    kills: number
    deaths: number
    assists: number
    kda: number
    cs: number
    cs_per_min: number
    vision_score: number
    damage_dealt: number
    damage_taken: number
    dpm: number
    gpm: number
    gold_earned: number
    champ_level: number
    win: boolean
  }>
  summary: {
    games: number
    avg_kills: number
    avg_deaths: number
    avg_assists: number
    avg_kda: number
    avg_cs: number
    avg_cs_per_min: number
    avg_vision: number
    avg_dpm: number
    avg_gpm: number
    avg_damage_dealt: number
    avg_damage_taken: number
    avg_gold: number
    avg_champ_level: number
    win_rate: number
  }
}

export function HighlightsSection({ recap, matches, summary }: HighlightsSectionProps) {
  console.log("HighlightsSection props:", { recap: !!recap, matches: matches?.length, summary: !!summary })
  
  if (!recap || !summary) {
    console.log("HighlightsSection: Missing recap or summary")
    return null
  }

  // Si no hay matches, usar datos del summary para mostrar highlights básicos
  const hasMatches = matches && matches.length > 0

  // Función para detectar partidas remake/AFK (misma lógica que en recent-games)
  const isValidMatch = (match: any) => {
    return !(match.kills === 0 && 
             match.deaths === 0 && 
             match.assists === 0 && 
             match.damage_dealt === 0 && 
             match.gold_earned === 0)
  }

  // Filtrar partidas válidas (excluyendo remakes)
  const validMatches = hasMatches ? matches.filter(isValidMatch) : []

  // Calcular achievements reales basados en los datos (excluyendo remakes)
  const totalWins = hasMatches ? validMatches.filter(match => match.win).length : Math.round(summary.games * summary.win_rate)
  const bestKDA = hasMatches && validMatches.length > 0 ? Math.max(...validMatches.map(match => match.kda)) : summary.avg_kda
  const totalDamage = hasMatches ? validMatches.reduce((sum, match) => sum + match.damage_dealt, 0) : summary.avg_damage_dealt * summary.games
  const totalGold = hasMatches ? validMatches.reduce((sum, match) => sum + match.gold_earned, 0) : summary.avg_gold * summary.games
  const perfectGames = hasMatches ? validMatches.filter(match => match.deaths === 0).length : Math.round(summary.games * 0.1)
  const highKillGames = hasMatches ? validMatches.filter(match => match.kills >= 10).length : Math.round(summary.games * 0.3)

  // Generar highlights dinámicos usando las tendencias y fortalezas del recap
  const generateDynamicHighlights = () => {
    const dynamicHighlights = []
    
    // Highlight principal basado en la primera fortaleza
    if (recap.strengths && recap.strengths.length > 0) {
      dynamicHighlights.push({
        icon: Trophy,
        title: "Top Strength",
        subtitle: recap.strengths,
        description: "Your strongest point this season",
        stats: "AI Insight",
        gradient: "from-primary to-accent",
        date: "Identified"
      })
    }

    // Highlight de tendencias si están disponibles
    if (recap.trends && recap.trends.length > 0) {
      dynamicHighlights.push({
        icon: TrendingUp,
        title: "Performance Trend",
        subtitle: recap.trends[0],
        description: "Key pattern in your gameplay",
        stats: "Trending",
        gradient: "from-accent to-secondary",
        date: "Current"
      })
    }

    // Highlight del estilo de juego
    if (recap.style) {
      dynamicHighlights.push({
        icon: Flame,
        title: "Play Style",
        subtitle: `${recap.style.charAt(0).toUpperCase() + recap.style.slice(1)} Player`,
        description: "Your unique approach to the game",
        stats: "Personality",
        gradient: "from-secondary to-primary",
        date: "Analysis"
      })
    }

    return dynamicHighlights
  }

  const dynamicHighlights = generateDynamicHighlights()
  
  // Encontrar la mejor partida o usar datos del summary (excluyendo remakes)
  const bestMatch = validMatches.length > 0 ? 
    validMatches.reduce((best, current) => current.kda > best.kda ? current : best) :
    {
      champion: 'Your Best Champion',
      kills: Math.round(summary.avg_kills * 1.5),
      deaths: Math.round(summary.avg_deaths * 0.7),
      assists: Math.round(summary.avg_assists * 1.3),
      kda: bestKDA,
      damage_dealt: Math.round(summary.avg_damage_dealt * 1.2),
      win: true
    }
  
  // Calcular estadísticas del jugador (usando solo partidas válidas)
  const avgDamage = hasMatches && validMatches.length > 0 ? Math.round(totalDamage / validMatches.length) : Math.round(summary.avg_damage_dealt)
  
  // Combinar highlights dinámicos con datos estadísticos
  const highlights = [
    // Usar highlights dinámicos del recap si están disponibles
    ...dynamicHighlights,
    // Agregar highlights estadísticos si hay espacio
    ...(dynamicHighlights.length < 3 ? [
      {
        icon: Trophy,
        title: "Best Match",
        subtitle: `${bestMatch.champion || 'Favorite Champion'}`,
        description: `${bestMatch.kills || 0}/${bestMatch.deaths || 0}/${bestMatch.assists || 0} - KDA ${bestMatch.kda?.toFixed(1) || 'N/A'}`,
        stats: `${bestMatch.damage_dealt?.toLocaleString() || '0'} damage`,
        gradient: "from-secondary to-secondary/50",
        date: bestMatch.win ? "Victory" : "Defeat",
      },
      {
        icon: TrendingUp,
        title: "Next Match",
        subtitle: "Coach Tip", 
        description: recap.next_match_tip,
        stats: "AI Recommendation",
        gradient: "from-primary to-primary/50",
        date: "To improve",
      },
      {
        icon: Flame,
        title: "Overall Performance",
        subtitle: `${Math.round(summary.win_rate * 100)}% Win Rate`,
        description: `${avgDamage.toLocaleString()} average damage per match`,
        stats: `${summary.avg_kda.toFixed(1)} KDA`,
        gradient: "from-accent to-accent/50",
        date: `${summary.games} games`,
      }
    ] : [])
  ].slice(0, 3) // Limitar a máximo 3 highlights

  const achievements = [
    { icon: Trophy, label: "Victories", count: totalWins },
    { icon: Target, label: "Best KDA", count: bestKDA.toFixed(1) },
    { icon: Flame, label: "10+ Kill Games", count: highKillGames },
    { icon: Award, label: "Perfect Games", count: perfectGames },
    // Nuevos achievements basados en recap
    ...(recap.style ? [{ icon: Sparkles, label: "Play Style", count: recap.style.charAt(0).toUpperCase() + recap.style.slice(1) }] : []),
    ...(recap.recommended_roles && recap.recommended_roles.length > 0 ? [{ icon: Crown, label: "Best Role", count: recap.recommended_roles[0] }] : []),
    ...(recap.confidence ? [{ icon: TrendingUp, label: "AI Confidence", count: recap.confidence.charAt(0).toUpperCase() + recap.confidence.slice(1) }] : []),
  ].slice(0, 6) // Limitar a máximo 6 achievements

  return (
    <section className="py-32 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">{"Epic Moments"}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{"The highlights that define your year"}</p>
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
                <p className="text-base md:text-lg text-foreground/90 font-medium mb-4 leading-snug">{highlight.description}</p>

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
          // Tooltips específicos para cada achievement
          const tooltipContent = achievement.label === "Total Wins" ? 
            `Has ganado ${achievement.count} partidas. ¡Sigue así para mejorar tu winrate!` :
            achievement.label === "Best KDA" ?
            `Tu mejor KDA fue ${achievement.count}. KDA alto indica excelente rendimiento en esa partida` :
            achievement.label === "Perfect Games" ?
            `Partidas sin muertes: ${achievement.count}. Indica excelente posicionamiento y supervivencia` :
            achievement.label === "High Kill Games" ?
            `Partidas con 10+ eliminaciones: ${achievement.count}. Muestra tu potencial de carry` :
            `${achievement.label}: ${achievement.count}`
          
          return (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <InfoTooltip content={tooltipContent}>
                <div className="p-6 rounded-2xl glass-card text-center group cursor-pointer">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-125 transition-transform" />
                  <div className="text-3xl font-black text-foreground mb-1">{achievement.count}</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{achievement.label}</div>
                    <HelpCircle className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </InfoTooltip>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Sección de Actionable Advice */}
      {recap.actionable_advice && recap.actionable_advice.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up?</h3>
            <p className="text-lg text-muted-foreground">AI-powered advice you can apply immediately</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recap.actionable_advice.map((advice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl glass-card hover:border-accent/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">{advice}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
