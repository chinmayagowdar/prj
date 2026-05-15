'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

interface SkillRadarProps {
  skills: {
    name: string
    proficiency: number
  }[]
}

export function SkillRadar({ skills }: SkillRadarProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/30 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Skill Profile</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={skills}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
          <Radar
            name="Proficiency"
            dataKey="proficiency"
            stroke="#00f5ff"
            fill="#00f5ff"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}
