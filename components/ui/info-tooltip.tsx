"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface InfoTooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function InfoTooltip({ content, children, side = "top", className = "" }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`relative group ${className}`}>
          {children}
          <HelpCircle className="w-3 h-3 text-muted-foreground/50 hover:text-primary transition-colors cursor-help group-hover:text-primary" />
        </div>
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p className="max-w-xs text-center text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

// Tooltips predefinidos para métricas comunes de League of Legends
export const gameTooltips = {
  winRate: "Tu porcentaje de victorias. +60% es excelente, 50-60% es bueno, -50% necesita mejora",
  kda: "Kill/Death/Assist ratio. +2.0 es excelente, 1.0-2.0 es promedio, -1.0 necesita trabajar en supervivencia",
  csPerMin: "Minions eliminados por minuto. +7 es excelente, 5-7 es bueno, -5 practica farming en training tool",
  visionScore: "Vision Score - wards colocadas y destruidas. +40 es excelente, 20-40 es bueno, -20 necesita más wards",
  damagePerMin: "Daño a campeones por minuto. Varía por rol: ADC/Mid +600, Top/Jungle +400, Support +200",
  goldEarned: "Oro promedio por partida. Relacionado con farming, kills y objetivos. Más oro = más items = más poder",
  killParticipation: "Porcentaje de kills del equipo en las que participaste. +70% es excelente para la mayoría de roles",
  averageKills: "Promedio de eliminaciones por partida. Varía por rol y estilo de juego",
  averageDeaths: "Promedio de muertes por partida. Menos muertes = mejor posicionamiento y supervivencia",
  averageAssists: "Promedio de asistencias por partida. Más asistencias = mejor trabajo en equipo",
  firstBlood: "Porcentaje de partidas donde conseguiste la primera eliminación. Buen indicador de presencia en early game",
  multikills: "Eliminaciones múltiples (Double kills, Triple kills, etc.). Indicador de capacidad de carry",
  objectiveControl: "Participación en objetivos importantes (Dragones, Baron, Torres). Clave para ganar partidas"
}

// Componente específico para métricas de juego con tooltips predefinidos
interface GameMetricTooltipProps {
  metric: keyof typeof gameTooltips
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function GameMetricTooltip({ metric, children, side = "top", className = "" }: GameMetricTooltipProps) {
  return (
    <InfoTooltip content={gameTooltips[metric]} side={side} className={className}>
      {children}
    </InfoTooltip>
  )
}