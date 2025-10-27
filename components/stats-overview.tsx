interface StatsOverviewProps {
  summary: {
    win_rate: number
    avg_kda: number
    avg_cs_per_min: number
    avg_dpm: number
    avg_gold: number
  }
}


export function StatsOverview({ summary }: StatsOverviewProps) {
  if (!summary) return null

  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 mt-6 text-center">Resumen General</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Winrate" value={`${(summary.win_rate * 100).toFixed(0)}%`} />
        <Stat label="KDA" value={summary.avg_kda.toFixed(2)} />
        <Stat label="CS/min" value={summary.avg_cs_per_min.toFixed(2)} />
        <Stat label="Daño/min" value={summary.avg_dpm.toFixed(0)} />
        <Stat label="Oro" value={summary.avg_gold.toFixed(0)} />
      </div>
    </section>
  )
}

interface StatProps {
  label: string
  value: string | number
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="p-4 rounded-2xl bg-card text-center shadow">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
