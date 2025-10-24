import { Brain, TrendingUp, Users, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"

export function InsightsGrid() {
  const insights = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Your early game has improved by 23% this season. You're securing first blood 40% more often.",
      highlight: "Early Game Dominance",
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Growth Trajectory",
      description: "Your vision score increased from 32 to 48 per game. Keep placing those wards!",
      highlight: "Vision Mastery",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Team Synergy",
      description: 'You have 67% win rate when playing with "SummonerX". Your duo synergy is exceptional.',
      highlight: "Dynamic Duo",
      color: "chart-4",
    },
    {
      icon: Flame,
      title: "Hot Streak",
      description: "You're on fire! 8 wins in your last 10 games. Your best performance period this year.",
      highlight: "Peak Performance",
      color: "chart-3",
    },
  ]

  return (
    <section className="py-24 px-4 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{"AI-Generated Insights"}</h2>
        <p className="text-xl text-muted-foreground">{"Personalized analysis to help you improve"}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <Card
              key={insight.title}
              className="p-8 bg-card border-border/50 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-${insight.color}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 text-${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${insight.color}/10 border border-${insight.color}/20`}
                  >
                    <span className={`text-sm font-medium text-${insight.color}`}>{insight.highlight}</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
