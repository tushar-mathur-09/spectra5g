import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Shield, Cpu, HardDrive, Clock } from 'lucide-react';
import type { CoveragePoint, ServerHealth } from '../../types';

interface Props {
  coverageData: CoveragePoint[];
  serverHealth: ServerHealth;
}

function GaugeBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

const firewallColors = { active: '#39ff14', warning: '#f59e0b', disabled: '#ff4444' };

export default function CoverageView({ coverageData, serverHealth }: Props) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Coverage & Health</h1>
        <p className="text-sm text-slate-500 mt-0.5">Signal coverage and server infrastructure status</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-5"
          style={{ border: '1px solid rgba(0,212,255,0.1)' }}
        >
          <h3 className="text-sm font-semibold text-white mb-1">Signal Strength vs Distance</h3>
          <p className="text-xs text-slate-500 mb-5">5G NR signal attenuation curve</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={coverageData}>
              <defs>
                <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="distance"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}m`}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{ background: 'rgba(5,11,26,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                itemStyle={{ color: '#00d4ff', fontSize: 12 }}
                formatter={(v: number) => [`${v.toFixed(1)}%`, 'Signal']}
                labelFormatter={(l) => `Distance: ${l}m`}
              />
              <Area type="monotone" dataKey="signalStrength" name="Signal" stroke="#00d4ff" strokeWidth={2.5} fill="url(#sigGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-xl p-5 space-y-5"
          style={{ border: '1px solid rgba(57,255,20,0.1)' }}
        >
          <h3 className="text-sm font-semibold text-white">Server Health</h3>

          <div className="space-y-4">
            <GaugeBar value={serverHealth.cpu} label="CPU Usage" color="#00d4ff" />
            <GaugeBar value={serverHealth.ram} label="RAM Usage" color="#a855f7" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="glass rounded-lg p-3 flex items-center gap-3" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <Clock size={16} className="text-[#f59e0b] flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Uptime</div>
                <div className="text-sm font-semibold text-white font-mono">{serverHealth.uptime}</div>
              </div>
            </div>
            <div
              className="glass rounded-lg p-3 flex items-center gap-3"
              style={{ border: `1px solid ${firewallColors[serverHealth.firewallStatus]}22` }}
            >
              <Shield size={16} style={{ color: firewallColors[serverHealth.firewallStatus] }} className="flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Firewall</div>
                <div
                  className="text-sm font-semibold capitalize"
                  style={{ color: firewallColors[serverHealth.firewallStatus] }}
                >
                  {serverHealth.firewallStatus}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: 'gNodeB', status: 'Online', color: '#39ff14' },
              { label: 'UPF', status: 'Online', color: '#39ff14' },
              { label: 'AMF', status: 'Online', color: '#39ff14' },
              { label: 'SMF', status: 'Degraded', color: '#f59e0b' },
              { label: 'PCF', status: 'Online', color: '#39ff14' },
              { label: 'NRF', status: 'Online', color: '#39ff14' },
            ].map((node) => (
              <div key={node.label} className="glass rounded-lg px-2 py-2 text-center" style={{ border: `1px solid ${node.color}22` }}>
                <div className="text-[10px] text-slate-500">{node.label}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: node.color }}>{node.status}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
