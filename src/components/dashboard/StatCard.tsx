import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  unit?: string;
  change: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'cyan';
  index: number;
}

const colorMap = {
  blue: { glow: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.25)', text: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  green: { glow: 'rgba(57,255,20,0.12)', border: 'rgba(57,255,20,0.2)', text: '#39ff14', bg: 'rgba(57,255,20,0.06)' },
  yellow: { glow: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  red: { glow: 'rgba(255,68,68,0.15)', border: 'rgba(255,68,68,0.25)', text: '#ff4444', bg: 'rgba(255,68,68,0.08)' },
  purple: { glow: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.25)', text: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  cyan: { glow: 'rgba(0,212,255,0.15)', border: 'rgba(0,212,255,0.25)', text: '#00d4ff', bg: 'rgba(0,212,255,0.08)' },
};

export default function StatCard({ label, value, unit, change, icon, color, index }: Props) {
  const c = colorMap[color];
  const positive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${c.glow}` }}
      className="glass rounded-xl p-5 cursor-default"
      style={{ border: `1px solid ${c.border}`, boxShadow: `0 0 20px ${c.glow}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: c.bg, color: c.text }}
        >
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-0.5 tabular-nums">
        {value}
        {unit && <span className="text-sm font-normal ml-1" style={{ color: c.text }}>{unit}</span>}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </motion.div>
  );
}
