export interface Match {
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

export interface Summary {
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

export interface Recap {
  strengths: string
  improvements: {
    issue: string
    drill: string
  }[]
  next_match_tip: string
  confidence: string
  style?: string
  trends?: string[]
  recommended_roles?: string[]
}

export interface PlayerData {
  puuid: string
  matches: Match[]
  summary: Summary
  recap: Recap
}