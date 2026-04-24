import { motion } from 'framer-motion';
import { Smartphone, Laptop, Cpu, Server, Tablet, Router } from 'lucide-react';
import type { Device } from '../../types';

interface Props {
  devices: Device[];
}

const typeIcons: Record<Device['type'], React.ReactNode> = {
  mobile: <Smartphone size={16} />,
  laptop: <Laptop size={16} />,
  iot: <Cpu size={16} />,
  server: <Server size={16} />,
  tablet: <Tablet size={16} />,
  router: <Router size={16} />,
};

const statusConfig = {
  connected: { color: '#39ff14', label: 'Connected' },
  idle: { color: '#f59e0b', label: 'Idle' },
  suspicious: { color: '#ff4444', label: 'Suspicious' },
};

function RiskBar({ score }: { score: number }) {
  const color = score < 30 ? '#39ff14' : score < 60 ? '#f59e0b' : '#ff4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-mono w-8 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

function SignalBars({ signal }: { signal: number }) {
  const bars = 4;
  const filled = Math.ceil((signal / 100) * bars);
  const color = signal > 70 ? '#39ff14' : signal > 40 ? '#f59e0b' : '#ff4444';
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm"
          style={{
            height: `${6 + i * 3}px`,
            background: i < filled ? color : 'rgba(255,255,255,0.1)',
          }}
        />
      ))}
      <span className="text-[10px] ml-1 font-mono" style={{ color }}>{signal}%</span>
    </div>
  );
}

export default function DevicesView({ devices }: Props) {
  const connected = devices.filter((d) => d.status === 'connected').length;
  const suspicious = devices.filter((d) => d.status === 'suspicious').length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Devices</h1>
          <p className="text-sm text-slate-500 mt-0.5">Connected endpoint monitoring</p>
        </div>
        <div className="flex gap-3">
          <div className="glass rounded-lg px-4 py-2 text-center" style={{ border: '1px solid rgba(57,255,20,0.2)' }}>
            <div className="text-lg font-bold neon-green">{connected}</div>
            <div className="text-[10px] text-slate-500">Connected</div>
          </div>
          <div className="glass rounded-lg px-4 py-2 text-center" style={{ border: '1px solid rgba(255,68,68,0.2)' }}>
            <div className="text-lg font-bold neon-red">{suspicious}</div>
            <div className="text-[10px] text-slate-500">Suspicious</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {devices.map((device, i) => {
          const st = statusConfig[device.status];
          return (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="glass rounded-xl p-4"
              style={{
                border: device.status === 'suspicious'
                  ? '1px solid rgba(255,68,68,0.25)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                  >
                    {typeIcons[device.type]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{device.name}</div>
                    <div className="text-xs font-mono text-[#00d4ff]">{device.ip}</div>
                  </div>
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${st.color}12`, color: st.color }}
                >
                  {st.label}
                </span>
              </div>

              <div className="space-y-2.5 mt-4 pt-3 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Signal</span>
                  <SignalBars signal={device.signal} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-500">Risk Score</span>
                    <span className="text-[10px] text-slate-500 capitalize">{device.type}</span>
                  </div>
                  <RiskBar score={device.riskScore} />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-600">Last seen</span>
                  <span className="text-[10px] text-slate-400">{device.lastSeen}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
