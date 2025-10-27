import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Match {
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
}

interface RecentGamesProps {
  matches: Match[]
}

export function RecentGames({ matches }: RecentGamesProps) {
  // Estado para controlar cuántas partidas mostrar
  const [visibleMatches, setVisibleMatches] = useState(9)
  const MATCHES_PER_PAGE = 9
  
  if (!matches || matches.length === 0) {
    return (
      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-black mb-4 gradient-text">Historial de Partidas</h3>
          <p className="text-lg text-muted-foreground">No hay partidas recientes disponibles</p>
        </div>
        <div className="text-center p-8 rounded-3xl glass-card">
          <p className="text-muted-foreground">Los datos de partidas se mostrarán aquí cuando estén disponibles.</p>
        </div>
      </section>
    )
  }

  // Estado para controlar qué tarjetas están expandidas
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  
  // Funciones para lazy loading
  const loadMoreMatches = () => {
    setVisibleMatches(prev => Math.min(prev + MATCHES_PER_PAGE, matches.length))
  }
  
  const showLessMatches = () => {
    setVisibleMatches(MATCHES_PER_PAGE)
    // Colapsar todas las tarjetas al mostrar menos
    setExpandedCards(new Set())
  }
  
  // Obtener las partidas visibles
  const displayedMatches = matches.slice(0, visibleMatches)
  const hasMoreMatches = visibleMatches < matches.length
  const canShowLess = visibleMatches > MATCHES_PER_PAGE
  
  // Función para alternar expansión de tarjeta
  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  // Función para determinar el color del KDA
  const getKDAColor = (kda: number) => {
    if (kda >= 3) return "text-green-400"
    if (kda >= 2) return "text-yellow-400"
    if (kda >= 1) return "text-orange-400"
    return "text-red-400"
  }

  // Función para determinar badge de rendimiento
  const getPerformanceBadge = (match: Match) => {
    if (match.kda >= 5) return { text: "ÉPICO", color: "bg-purple-500" }
    if (match.kda >= 3) return { text: "EXCELENTE", color: "bg-green-500" }
    if (match.kda >= 2) return { text: "BUENO", color: "bg-blue-500" }
    if (match.kda >= 1) return { text: "REGULAR", color: "bg-yellow-500" }
    return { text: "DIFÍCIL", color: "bg-red-500" }
  }

  return (
    <section className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-black mb-4 gradient-text">Historial de Partidas</h3>
        <p className="text-lg text-muted-foreground mb-6">
          Análisis detallado de tu rendimiento reciente 
          <span className="text-primary font-medium">
            ({displayedMatches.length} de {matches.length} partidas)
          </span>
        </p>
        
        {/* Botones de control */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={() => setExpandedCards(new Set(displayedMatches.map((_, i) => i)))}
            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-xl text-primary font-medium transition-colors duration-200"
          >
            Expandir Visibles
          </button>
          <button
            onClick={() => setExpandedCards(new Set())}
            className="px-4 py-2 bg-muted/20 hover:bg-muted/30 rounded-xl text-muted-foreground font-medium transition-colors duration-200"
          >
            Colapsar Todo
          </button>
          {hasMoreMatches && (
            <button
              onClick={loadMoreMatches}
              className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-xl text-secondary font-medium transition-colors duration-200"
            >
              Ver Más ({Math.min(MATCHES_PER_PAGE, matches.length - visibleMatches)} más)
            </button>
          )}
          {canShowLess && (
            <button
              onClick={showLessMatches}
              className="px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-xl text-accent font-medium transition-colors duration-200"
            >
              Mostrar Menos
            </button>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
        {displayedMatches.map((match, index) => {
          const badge = getPerformanceBadge(match)
          const kdaColor = getKDAColor(match.kda)
          const isExpanded = expandedCards.has(index)
          
          return (
            <div
              key={index}
              className={`relative p-6 rounded-2xl glass-card transition-all duration-500 ease-out ${
                match.win 
                  ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent" 
                  : "border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent"
              } hover:border-primary/40 hover:shadow-lg ${
                isExpanded ? 'shadow-xl border-primary/30' : ''
              }`}
            >
              {/* Header simplificado */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs font-bold ${badge.color} text-white`}>
                    {badge.text}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    match.win ? "bg-green-500 text-white" : "bg-red-500 text-white"  
                  }`}>
                    {match.win ? "W" : "L"}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleExpanded(index)
                  }}
                  className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 z-10 hover:scale-110"
                >
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
              </div>

              {/* Header - Campeón */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={match.champion_img}
                    alt={match.champion}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30 shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{match.champ_level}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground">{match.champion}</h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {match.role || "Flex"} • Nivel {match.champ_level}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm font-bold ${kdaColor}`}>
                      {match.kills}/{match.deaths}/{match.assists}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-sm font-bold ${kdaColor}`}>
                      {match.kda.toFixed(1)} KDA
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido colapsable */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`space-y-6 pt-4 transition-all duration-300 ${
                  isExpanded ? 'translate-y-0' : 'translate-y-2'
                }`}>
                {/* KDA Principal */}
                  <div className="p-4 rounded-2xl bg-background/50 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">KDA Detallado</span>
                      <span className={`text-lg font-black ${kdaColor}`}>
                        {match.kda.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold text-foreground">
                        {match.kills}/{match.deaths}/{match.assists}
                      </span>
                    </div>
                    {/* Barra visual de KDA */}
                    <div className="w-full bg-border/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          match.kda >= 3 ? "bg-green-400" :
                          match.kda >= 2 ? "bg-yellow-400" :
                          match.kda >= 1 ? "bg-orange-400" : "bg-red-400"
                        }`}
                        style={{ width: `${Math.min(100, (match.kda / 5) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid Principal */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-background/30 rounded-xl border border-border/20">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Daño</p>
                      <p className="text-lg font-bold text-foreground">{(match.damage_dealt / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-primary">{match.dpm.toFixed(0)} DPM</p>
                    </div>
                    <div className="text-center p-3 bg-background/30 rounded-xl border border-border/20">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Oro</p>
                      <p className="text-lg font-bold text-foreground">{(match.gold_earned / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-secondary">{match.gpm.toFixed(0)} GPM</p>
                    </div>
                  </div>

                  {/* Stats Secundarias */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 bg-background/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">CS</p>
                      <p className="text-sm font-bold text-foreground">{match.cs}</p>
                      <p className="text-xs text-muted-foreground">{match.cs_per_min.toFixed(1)}/min</p>
                    </div>
                    <div className="p-2 bg-background/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Visión</p>
                      <p className="text-sm font-bold text-foreground">{match.vision_score}</p>
                      <p className="text-xs text-accent">Score</p>
                    </div>
                    <div className="p-2 bg-background/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Daño Rec.</p>
                      <p className="text-sm font-bold text-foreground">{(match.damage_taken / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-muted-foreground">Tanque</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Información de progreso y botón adicional de "Ver más" */}
      {(hasMoreMatches || canShowLess) && (
        <div className="mt-12 text-center space-y-4">
          {/* Indicador de progreso */}
          <div className="w-full max-w-xs mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Partidas mostradas</span>
              <span>{displayedMatches.length} / {matches.length}</span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(displayedMatches.length / matches.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Botones principales de navegación */}
          <div className="flex justify-center gap-4">
            {hasMoreMatches && (
              <button
                onClick={loadMoreMatches}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Cargar Más Partidas
                <span className="ml-2 text-sm opacity-80">
                  (+{Math.min(MATCHES_PER_PAGE, matches.length - visibleMatches)})
                </span>
              </button>
            )}
            {canShowLess && (
              <button
                onClick={showLessMatches}
                className="px-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-2xl transition-all duration-200 hover:scale-105"
              >
                Mostrar Solo Recientes
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
