import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import type { TrafficPoint } from '../../types';

interface Props {
  trafficData: TrafficPoint[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-white/10" style={{ background: 'rgba(5,11,26,0.97)' }}>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-xs font-medium" style={{ color: p.color }}>
          {p.name}: {p.value} Mbps
        </p>
      ))}
    </div>
  );
};

const summaryStats = [
  { label: 'Total Inbound', value: '8.4 TB', color: '#00d4ff' },
  { label: 'Total Outbound', value: '3.2 TB', color: '#a855f7' },
  { label: 'Peak Bandwidth', value: '980 Mbps', color: '#39ff14' },
  { label: 'Avg Latency', value: '4.2 ms', color: '#f59e0b' },
];

export default function TrafficView({ trafficData }: Props) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Traffic Analysis</h1>
        <p className="text-sm text-slate-500 mt-0.5">Network bandwidth and flow monitoring</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-xl p-4"
            style={{ border: `1px solid ${s.color}22` }}
          >
            <div className="text-xl font-bold text-white" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-xl p-5"
        style={{ border: '1px solid rgba(0,212,255,0.1)' }}
      >
        <h3 className="text-sm font-semibold text-white mb-1">24-Hour Traffic Volume</h3>
        <p className="text-xs text-slate-500 mb-5">Inbound vs Outbound Mbps</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="tIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inbound" name="Inbound" stroke="#00d4ff" strokeWidth={2} fill="url(#tIn)" dot={false} />
            <Area type="monotone" dataKey="outbound" name="Outbound" stroke="#a855f7" strokeWidth={2} fill="url(#tOut)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-xl p-5"
        style={{ border: '1px solid rgba(57,255,20,0.1)' }}
      >
        <h3 className="text-sm font-semibold text-white mb-1">Hourly Inbound Breakdown</h3>
        <p className="text-xs text-slate-500 mb-5">Peak usage pattern</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="inbound" name="Inbound" fill="#00d4ff" opacity={0.7} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
