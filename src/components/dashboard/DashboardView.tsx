import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Wifi, Download, Upload, Clock, Cpu, ShieldCheck } from 'lucide-react';
import StatCard from './StatCard';
import type { TrafficPoint, SpeedPoint, ProtocolData } from '../../types';

interface Props {
  trafficData: TrafficPoint[];
  speedData: SpeedPoint[];
  protocolData: ProtocolData[];
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

export default function DashboardView({ trafficData, speedData, protocolData }: Props) {
  const cards = [
    { label: 'Network Status', value: 'Active', icon: <Wifi size={18} />, color: 'green' as const, change: 0, unit: '' },
    { label: 'Download Speed', value: '847', unit: 'Mbps', icon: <Download size={18} />, color: 'cyan' as const, change: 12 },
    { label: 'Upload Speed', value: '412', unit: 'Mbps', icon: <Upload size={18} />, color: 'blue' as const, change: 5 },
    { label: 'Latency', value: '4.2', unit: 'ms', icon: <Clock size={18} />, color: 'yellow' as const, change: -8 },
    { label: 'Connected Devices', value: '128', icon: <Cpu size={18} />, color: 'purple' as const, change: 3 },
    { label: 'Security Score', value: '94', unit: '/100', icon: <ShieldCheck size={18} />, color: 'green' as const, change: 2 },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Real-time 5G network overview</p>
        </div>
        <div className="text-xs text-slate-600 font-mono">
          {new Date().toLocaleTimeString()} UTC
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c, i) => (
          <StatCard key={c.label} {...c} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5"
          style={{ border: '1px solid rgba(0,212,255,0.1)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Traffic Usage</h3>
              <p className="text-xs text-slate-500 mt-0.5">24-hour inbound / outbound</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00d4ff]" />Inbound</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a855f7]" />Outbound</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="inboundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outboundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inbound" name="Inbound" stroke="#00d4ff" strokeWidth={2} fill="url(#inboundGrad)" dot={false} />
              <Area type="monotone" dataKey="outbound" name="Outbound" stroke="#a855f7" strokeWidth={2} fill="url(#outboundGrad)" dot={false} />
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
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Speed Trends</h3>
              <p className="text-xs text-slate-500 mt-0.5">Download & upload over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={speedData}>
              <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="download" name="Download" stroke="#39ff14" strokeWidth={2} dot={false} strokeDasharray="" />
              <Line type="monotone" dataKey="upload" name="Upload" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-5"
        style={{ border: '1px solid rgba(168,85,247,0.1)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Protocol Distribution</h3>
            <p className="text-xs text-slate-500 mt-0.5">TCP · UDP · HTTP · DNS</p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {protocolData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'rgba(5,11,26,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  itemStyle={{ color: '#e2e8f0', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3">
              {protocolData.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: p.color }} />
                  <div>
                    <div className="text-xs font-medium text-white">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
