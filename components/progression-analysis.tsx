"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import { TrendingUp, Target, Award, Map } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

interface Match {
  champion: string
  champion_img: string
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
  game_duration?: number
  game_mode?: string
  queue_type?: string
}

interface ProgressionAnalysisProps {
  matches: Match[]
  playerName: string
}

export function ProgressionAnalysis({ matches, playerName }: ProgressionAnalysisProps) {
  if (!matches || matches.length === 0) return null

  // Detectar tipo de partida basado en el rol
  const detectGameMode = (match: Match): string => {
    const riftRoles = ["top", "jungle", "mid", "bottom", "support"]
    const role = match.role?.toLowerCase()
    
    // Si el rol es uno de los 5 roles estándar de la grieta, es Summoner's Rift
    if (role && riftRoles.includes(role)) {
      return "Summoner's Rift"
    }
    
    // Todo lo demás son "Other Modes" (ARAM, Arena, URF, etc.)
    return "Other Modes"
  }

  // Preparar datos para análisis
  const recentMatches = matches.slice(0, 20) // Últimas 20 partidas
  const matchesWithMode = recentMatches.map(match => ({
    ...match,
    detectedMode: detectGameMode(match)
  }))

  // Progresión de KDA (últimas 15 partidas)
  const kdaProgression = recentMatches.slice(0, 15).reverse().map((match, index) => ({
    x: index + 1,
    y: match.kda,
    win: match.win
  }))

  // Progresión de CS/min (solo para Summoner's Rift)
  const riftMatchesForCS = recentMatches.filter(match => detectGameMode(match) === "Summoner's Rift")
  const csProgression = riftMatchesForCS.slice(0, 10).reverse().map((match, index) => ({
    x: index + 1,
    y: match.cs_per_min,
    mode: "Summoner's Rift"
  }))

  // Distribución de tipos de partida
  const gameModeDistribution = matchesWithMode.reduce((acc, match) => {
    const mode = match.detectedMode
    acc[mode] = (acc[mode] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Análisis por rol
  const roleAnalysis = matchesWithMode.reduce((acc, match) => {
    const role = match.role || "Fill"
    if (!acc[role]) {
      acc[role] = { games: 0, wins: 0, totalKDA: 0, totalCS: 0 }
    }
    acc[role].games += 1
    acc[role].wins += match.win ? 1 : 0
    acc[role].totalKDA += match.kda
    acc[role].totalCS += match.cs_per_min
    return acc
  }, {} as Record<string, any>)

  // Configuración de gráficas
  const kdaLineConfig = {
    data: {
      labels: kdaProgression.map(p => `Game ${p.x}`),
      datasets: [
        {
          label: 'KDA Progression',
          data: kdaProgression.map(p => p.y),
          borderColor: '#3b82f6',
          backgroundColor: kdaProgression.map(p => p.win ? '#10b981' : '#ef4444'),
          pointBackgroundColor: kdaProgression.map(p => p.win ? '#10b981' : '#ef4444'),
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          tension: 0.4,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          borderColor: '#374151',
          borderWidth: 1,
          callbacks: {
            label: (context: any) => {
              const point = kdaProgression[context.dataIndex]
              return `KDA: ${point.y.toFixed(2)} (${point.win ? 'Win' : 'Loss'})`
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#374151' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: '#374151' },
          ticks: { color: '#9ca3af' },
          beginAtZero: true
        }
      }
    }
  }

  const gameModeDonutConfig = {
    data: {
      labels: Object.keys(gameModeDistribution),
      datasets: [{
        data: Object.values(gameModeDistribution),
        backgroundColor: [
          '#3b82f6', // Summoner's Rift - Blue
          '#10b981', // Other Modes - Green
        ],
        borderWidth: 2,
        borderColor: '#1f2937',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: '#f9fafb',
            padding: 20,
            usePointStyle: true,
          }
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          callbacks: {
            label: (context: any) => {
              const total = Object.values(gameModeDistribution).reduce((a: any, b: any) => a + b, 0)
              const percentage = ((context.raw / total) * 100).toFixed(1)
              return `${context.label}: ${context.raw} games (${percentage}%)`
            }
          }
        }
      }
    }
  }

  const rolePerformanceConfig = {
    data: {
      labels: Object.keys(roleAnalysis),
      datasets: [
        {
          label: 'Win Rate %',
          data: Object.values(roleAnalysis).map((role: any) => 
            ((role.wins / role.games) * 100).toFixed(1)
          ),
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 1,
        },
        {
          label: 'Avg KDA',
          data: Object.values(roleAnalysis).map((role: any) => 
            (role.totalKDA / role.games).toFixed(2)
          ),
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#f9fafb' }
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
        }
      },
      scales: {
        x: {
          grid: { color: '#374151' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: '#374151' },
          ticks: { color: '#9ca3af' },
          beginAtZero: true
        }
      }
    }
  }

  // Estadísticas clave
  const avgKDA = recentMatches.reduce((sum, match) => sum + match.kda, 0) / recentMatches.length
  const winRate = (recentMatches.filter(match => match.win).length / recentMatches.length) * 100
  
  // CS promedio solo para Summoner's Rift (más relevante)
  const riftMatches = recentMatches.filter(match => detectGameMode(match) === "Summoner's Rift")
  const avgCS = riftMatches.length > 0 
    ? riftMatches.reduce((sum, match) => sum + match.cs_per_min, 0) / riftMatches.length
    : 0
  
  const mostPlayedMode = Object.entries(gameModeDistribution).sort((a, b) => b[1] - a[1])[0]

  return (
    <section className="py-16 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 gradient-text">Performance Analytics</h2>
        <p className="text-xl text-muted-foreground">Advanced insights into your gameplay progression</p>
      </motion.div>

      {/* Estadísticas Clave */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center p-6 glass-card rounded-2xl"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{avgKDA.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Avg KDA</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center p-6 glass-card rounded-2xl"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{winRate.toFixed(0)}%</div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center p-6 glass-card rounded-2xl"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {avgCS > 0 ? avgCS.toFixed(1) : 'N/A'}
          </div>
          <div className="text-sm text-muted-foreground">Rift CS/min</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center p-6 glass-card rounded-2xl"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Map className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{mostPlayedMode[0]}</div>
          <div className="text-sm text-muted-foreground">Main Mode</div>
        </motion.div>
      </div>

      {/* Gráficas */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* KDA Progression */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">KDA Progression</h3>
          <div className="h-64">
            <Line {...kdaLineConfig} />
          </div>
        </motion.div>

        {/* Game Mode Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">Game Mode Split</h3>
          <div className="h-64">
            <Doughnut {...gameModeDonutConfig} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              🏟️ Rift: {gameModeDistribution["Summoner's Rift"] || 0} games
            </p>
            <p className="text-sm text-muted-foreground">
              🎮 Others: {gameModeDistribution["Other Modes"] || 0} games
            </p>
          </div>
        </motion.div>
      </div>

      {/* Role Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h3 className="text-xl font-bold mb-4 text-foreground">Performance by Role</h3>
        <div className="h-64">
          <Bar {...rolePerformanceConfig} />
        </div>
      </motion.div>

      {/* Game Mode Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 p-6 glass-card rounded-2xl"
      >
        <h3 className="text-xl font-bold mb-4 text-foreground">Mode Analysis</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Modes detected based on role assignments - Standard 5v5 roles indicate Summoner's Rift
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(gameModeDistribution).map(([mode, count]) => {
            const modeMatches = matchesWithMode.filter(m => m.detectedMode === mode)
            const modeWinRate = (modeMatches.filter(m => m.win).length / modeMatches.length) * 100
            const avgKDAInMode = modeMatches.reduce((sum, m) => sum + m.kda, 0) / modeMatches.length
            const avgCSInMode = mode === "Summoner's Rift" 
              ? modeMatches.reduce((sum, m) => sum + m.cs_per_min, 0) / modeMatches.length
              : null

            const getModeIcon = (mode: string) => {
              switch(mode) {
                case "Summoner's Rift": return "🏟️"
                case "Other Modes": return "🎮"
                default: return "🎮"
              }
            }

            const getModeDescription = (mode: string) => {
              switch(mode) {
                case "Summoner's Rift": return "Classic 5v5 with standard roles"
                case "Other Modes": return "ARAM, Arena, URF, and other game modes"
                default: return "Various game modes"
              }
            }

            return (
              <div key={mode} className="p-6 bg-background/30 rounded-xl border border-border/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{getModeIcon(mode)}</span>
                  <div>
                    <span className="font-bold text-foreground text-lg">{mode}</span>
                    <p className="text-xs text-muted-foreground">{getModeDescription(mode)}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Games Played:</span>
                    <span className="text-foreground font-medium">{count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span className={`font-bold ${modeWinRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                      {modeWinRate.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average KDA:</span>
                    <span className="text-foreground font-medium">{avgKDAInMode.toFixed(2)}</span>
                  </div>
                  {avgCSInMode && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average CS/min:</span>
                      <span className="text-yellow-400 font-medium">{avgCSInMode.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}