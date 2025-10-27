import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface MatchDebug {
  champion: string
  champion_img: string
  win: boolean
  kills: number
  deaths: number
  assists: number
}

interface RecentGamesDebugProps {
  matches: MatchDebug[]
}

export function RecentGamesDebug({ matches }: RecentGamesDebugProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  
  const toggleExpanded = (index: number) => {
    console.log('🔄 Toggle clicked for index:', index)
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
      console.log('📉 Collapsing card:', index)
    } else {
      newExpanded.add(index)
      console.log('📈 Expanding card:', index)
    }
    setExpandedCards(newExpanded)
  }
  
  if (!matches || matches.length === 0) {
    return <div>No matches for debug</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Debug Recent Games</h2>
      
      {/* Control buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setExpandedCards(new Set(matches.map((_, i) => i)))}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Expand All
        </button>
        <button
          onClick={() => setExpandedCards(new Set())}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Collapse All
        </button>
      </div>
      
      {matches.slice(0, 3).map((match, index) => {
        const isExpanded = expandedCards.has(index)
        
        return (
          <div key={index} className="border p-4 rounded-lg bg-white shadow">
            {/* Debug info */}
            <div className="text-xs text-gray-500 mb-2">
              Card {index}: {isExpanded ? '✅ EXPANDED' : '❌ COLLAPSED'}
            </div>
            
            {/* Header */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpanded(index)}
            >
              <div className="flex items-center gap-2">
                <img 
                  src={match.champion_img} 
                  alt={match.champion}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <h3 className="font-bold">{match.champion}</h3>
                  <p>{match.kills}/{match.deaths}/{match.assists}</p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(index)
                }}
                className="p-2 bg-blue-100 rounded"
              >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {/* Expandable content */}
            {isExpanded && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h4>Detalles:</h4>
                <p>Resultado: {match.win ? 'Victoria' : 'Derrota'}</p>
                <p>Esta sección solo aparece cuando está expandida</p>
                <p>Estado actual: {isExpanded ? 'Expandida' : 'Colapsada'}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}