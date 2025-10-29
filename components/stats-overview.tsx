import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface StatsOverviewProps {
  summary: {
    win_rate: number
    avg_kda: number
    avg_cs_per_min: number
    avg_dpm: number
    avg_gold: number
  }
}


const statsTooltips = {
  winrate: "Tu porcentaje de victorias. +60% es excelente, 50-60% es bueno, -50% necesita mejora",
  kda: "Kills + Assists / Deaths. +2.0 es excelente, 1.0-2.0 es promedio, -1.0 necesita trabajar en supervivencia",
  cs: "Minions eliminados por minuto. +7 es excelente, 5-7 es bueno, -5 practica farming en training tool",
  damage: "Daño a campeones por minuto. Varía por rol: ADC/Mid +600, Top/Jungle +400, Support +200",
  gold: "Oro promedio por partida. Relacionado con farming, kills y objetivos. Más oro = más items = más poder"
}

export function StatsOverview({ summary }: StatsOverviewProps) {
  if (!summary) return null

  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 mt-6 text-center">General Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat 
          label="Winrate" 
          value={`${(summary.win_rate * 100).toFixed(0)}%`}
          tooltip={statsTooltips.winrate}
        />
        <Stat 
          label="KDA" 
          value={summary.avg_kda.toFixed(2)}
          tooltip={statsTooltips.kda}
        />
        <Stat 
          label="CS/min" 
          value={summary.avg_cs_per_min.toFixed(2)}
          tooltip={statsTooltips.cs}
        />
        <Stat 
          label="Damage/min" 
          value={summary.avg_dpm.toFixed(0)}
          tooltip={statsTooltips.damage}
        />
        <Stat 
          label="Gold" 
          value={summary.avg_gold.toFixed(0)}
          tooltip={statsTooltips.gold}
        />
      </div>
    </section>
  )
}

interface StatProps {
  label: string
  value: string | number
  tooltip?: string
}

function Stat({ label, value, tooltip }: StatProps) {
  const content = (
    <div className="p-4 rounded-2xl bg-card text-center shadow hover:shadow-lg transition-shadow">
      <p className="text-2xl font-bold">{value}</p>
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        {tooltip && <Info className="w-3 h-3 text-muted-foreground" />}
      </div>
    </div>
  )

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-center">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
