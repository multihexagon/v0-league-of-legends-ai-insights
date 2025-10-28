interface PlayerData {
  playerName: string
  recap: {
    strengths: string
    next_match_tip: string
    confidence: string
    style?: string
    trends?: string[]
    improvements?: { issue: string; drill: string }[]
    recommended_roles?: string[]
  }
  summary?: {
    games: number
    win_rate: number
    avg_kda: number
  }
  matches?: Array<{
    champion: string
    role: string
    kills: number
    deaths: number
    assists: number
    kda: number
    cs: number
    cs_per_min: number
    win: boolean
    damage_dealt: number
    gold_earned: number
  }>
}

export const generateSimplePDF = async (data: PlayerData, setDownloading: (loading: boolean) => void) => {
  setDownloading(true)
  try {
    // Import jsPDF only
    const jspdf = await import('jspdf')
    const jsPDF = jspdf.default
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Set background
    pdf.setFillColor(10, 10, 10) // Dark background
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')
    
    // Title
    pdf.setTextColor(59, 130, 246) // Blue color
    pdf.setFontSize(28)
    pdf.setFont('helvetica', 'bold')
    const titleY = 40
    pdf.text(data.playerName, pageWidth / 2, titleY, { align: 'center' })
    
    // Subtitle
    pdf.setTextColor(163, 163, 163) // Gray color
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.text('League of Legends Performance Report', pageWidth / 2, titleY + 15, { align: 'center' })
    
    // Section divider
    pdf.setDrawColor(64, 64, 64)
    pdf.setLineWidth(0.5)
    pdf.line(20, titleY + 25, pageWidth - 20, titleY + 25)
    
    // Performance Overview Section
    const sectionY = titleY + 40
    pdf.setTextColor(255, 255, 255) // White
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Performance Overview', 20, sectionY)
    
    // Content box background
    pdf.setFillColor(26, 26, 26) // Darker gray
    pdf.setDrawColor(64, 64, 64)
    pdf.roundedRect(20, sectionY + 5, pageWidth - 40, 60, 3, 3, 'FD')
    
    // Content text
    pdf.setTextColor(163, 163, 163)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    // Build dynamic content based on player data
    const contentLines = [
      `Performance analysis for ${data.playerName}`,
      `Play Style: ${data.recap.style || 'Versatile'} • Confidence: ${data.recap.confidence}`,
      '',
      'Statistics:',
      `• Games Played: ${data.summary?.games || 'N/A'}`,
      `• Win Rate: ${data.summary ? Math.round(data.summary.win_rate * 100) : 0}%`,
      `• Average KDA: ${data.summary?.avg_kda.toFixed(1) || 'N/A'}`,
      data.recap.recommended_roles && data.recap.recommended_roles.length > 0 
        ? `• Best Roles: ${data.recap.recommended_roles.join(', ')}` 
        : ''
    ].filter(line => line !== '')
    
    let lineY = sectionY + 20
    contentLines.forEach(line => {
      pdf.text(line, 25, lineY)
      lineY += 6
    })
    
    // Recent Games Section
    const gamesY = sectionY + 80
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Recent Games Analysis', 20, gamesY)
    
    // Games box
    pdf.setFillColor(26, 26, 26)
    pdf.roundedRect(20, gamesY + 5, pageWidth - 40, 40, 3, 3, 'FD')
    
    pdf.setTextColor(163, 163, 163)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    // Show actual strengths
    const strengthsText = data.recap.strengths
      ? `Key Strengths: ${data.recap.strengths}`
      : 'Analyzing your recent match performance...'
    pdf.text(strengthsText, 25, gamesY + 20)
    
    // Show trends if available
    const trendsText = data.recap.trends && data.recap.trends.length > 0
      ? `Current Trend: ${data.recap.trends[0]}`
      : 'Building comprehensive performance insights.'
    pdf.text(trendsText, 25, gamesY + 30)
    
    // Show recommended roles if available
    if (data.recap.recommended_roles && data.recap.recommended_roles.length > 0) {
      const rolesText = `Best Roles: ${data.recap.recommended_roles.join(', ')}`
      pdf.text(rolesText, 25, gamesY + 40)
    }
    
    // AI Insights Section
    const aiY = gamesY + 70
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('AI-Powered Insights', 20, aiY)
    
    // AI box
    pdf.setFillColor(26, 26, 26)
    pdf.roundedRect(20, aiY + 5, pageWidth - 40, 40, 3, 3, 'FD')
    
    pdf.setTextColor(163, 163, 163)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    // Show actual AI tip
    const tipText = `Coach Tip: ${data.recap.next_match_tip}`
    pdf.text(tipText, 25, aiY + 20)
    
    // Show improvement area if available
    const improvementText = data.recap.improvements && data.recap.improvements.length > 0
      ? `Focus Area: ${data.recap.improvements[0].issue}`
      : 'Continue practicing to improve your gameplay.'
    pdf.text(improvementText, 25, aiY + 30)
    
    // Training Drills Section (if improvements exist)
    if (data.recap.improvements && data.recap.improvements.length > 0) {
      const drillsY = aiY + 60
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Training Drills', 20, drillsY)
      
      // Drills box
      pdf.setFillColor(26, 26, 26)
      pdf.roundedRect(20, drillsY + 5, pageWidth - 40, 35, 3, 3, 'FD')
      
      pdf.setTextColor(163, 163, 163)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      
      const drill = data.recap.improvements[0].drill || 'Practice regularly in training mode'
      // Wrap text if too long
      const drillLines = pdf.splitTextToSize(drill, pageWidth - 50)
      let drillY = drillsY + 20
      drillLines.forEach((line: string) => {
        pdf.text(line, 25, drillY)
        drillY += 6
      })
    }

    // Game Mode Analysis Section (if matches exist)
    if (data.matches && data.matches.length > 0) {
      const analysisY = (data.recap.improvements?.length ? aiY + 115 : aiY + 60)
      
      // Detect game modes based on role
      const detectGameMode = (match: any): string => {
        const riftRoles = ["top", "jungle", "mid", "bottom", "support"]
        const role = match.role?.toLowerCase()
        
        if (role && riftRoles.includes(role)) {
          return "Summoner's Rift"
        }
        
        return "Other Modes"
      }

      const recentMatches = data.matches.slice(0, 10)
      const gameModes = recentMatches.reduce((acc, match) => {
        const mode = detectGameMode(match)
        acc[mode] = (acc[mode] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const mostPlayedMode = Object.entries(gameModes).sort((a, b) => b[1] - a[1])[0]
      const recentWinRate = (recentMatches.filter(m => m.win).length / recentMatches.length) * 100

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Game Analysis', 20, analysisY)
      
      // Analysis box
      pdf.setFillColor(26, 26, 26)
      pdf.roundedRect(20, analysisY + 5, pageWidth - 40, 45, 3, 3, 'FD')
      
      pdf.setTextColor(163, 163, 163)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      
      const analysisLines = [
        `Most Played Mode: ${mostPlayedMode[0]} (${mostPlayedMode[1]} games)`,
        `Recent Performance: ${recentWinRate.toFixed(0)}% win rate in last ${recentMatches.length} games`,
        `Game Modes Detected: ${Object.keys(gameModes).join(', ')}`,
        `Average KDA Trend: ${(recentMatches.reduce((sum, m) => sum + m.kda, 0) / recentMatches.length).toFixed(2)}`
      ]
      
      let analysisLineY = analysisY + 20
      analysisLines.forEach(line => {
        pdf.text(line, 25, analysisLineY)
        analysisLineY += 8
      })
    }
    
    // Footer
    const footerY = pageHeight - 30
    pdf.setDrawColor(64, 64, 64)
    pdf.line(20, footerY - 10, pageWidth - 20, footerY - 10)
    
    pdf.setTextColor(102, 102, 102)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Generated by Rift Rewind', pageWidth / 2, footerY, { align: 'center' })
    pdf.text(new Date().toLocaleDateString(), pageWidth / 2, footerY + 5, { align: 'center' })
    
    // Save the PDF
    const cleanPlayerName = data.playerName.replace(/[^a-zA-Z0-9]/g, '_')
    const fileName = `${cleanPlayerName}_RiftRewind_${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(fileName)
    
    console.log('PDF generated successfully!')
    
  } catch (err) {
    console.error('Failed to generate PDF:', err)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    setDownloading(false)
  }
}