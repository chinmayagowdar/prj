'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TimelineDataPoint {
  date: string
  xp: number
}

const SAMPLE_XP_DATA: TimelineDataPoint[] = [
  { date: 'Mon', xp: 120 },
  { date: 'Tue', xp: 240 },
  { date: 'Wed', xp: 180 },
  { date: 'Thu', xp: 290 },
  { date: 'Fri', xp: 200 },
  { date: 'Sat', xp: 250 },
  { date: 'Sun', xp: 310 },
]

export function XpTimelineChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">XP Progress (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={SAMPLE_XP_DATA}>
          <defs>
            <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} dataKey="date" />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value) => [`${value} XP`, 'XP']}
          />
          <Area
            type="monotone"
            dataKey="xp"
            stroke="#06b6d4"
            fillOpacity={1}
            fill="url(#xpGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

interface ActivityHeatmapProps {
  data?: Array<{ day: string; activity: number }>
}

const SAMPLE_ACTIVITY = [
  { day: 'Mon', activity: 8 },
  { day: 'Tue', activity: 6 },
  { day: 'Wed', activity: 9 },
  { day: 'Thu', activity: 5 },
  { day: 'Fri', activity: 7 },
  { day: 'Sat', activity: 4 },
  { day: 'Sun', activity: 6 },
]

export function ActivityHeatmap({ data = SAMPLE_ACTIVITY }: ActivityHeatmapProps) {
  const maxActivity = Math.max(...data.map(d => d.activity))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
      <div className="flex gap-2 items-end justify-between">
        {data.map((item, idx) => {
          const intensity = item.activity / maxActivity
          return (
            <motion.div
              key={idx}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-md transition-all"
                style={{
                  height: `${120 * intensity}px`,
                  background: `linear-gradient(180deg, #06b6d4 0%, #a855f7 100%)`,
                  opacity: Math.max(0.3, intensity),
                }}
              />
              <span className="text-xs text-slate-400 font-medium">{item.day}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
