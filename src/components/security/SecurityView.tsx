import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';
import type { SecurityAlert } from '../../types';

interface Props {
  alerts: SecurityAlert[];
}

const severityConfig = {
  critical: { color: '#ff4444', bg: 'rgba(255,68,68,0.1)', border: 'rgba(255,68,68,0.25)', label: 'CRITICAL' },
  high: { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.25)', label: 'HIGH' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: 'MEDIUM' },
  low: { color: '#39ff14', bg: 'rgba(57,255,20,0.1)', border: 'rgba(57,255,20,0.25)', label: 'LOW' },
};

const statusConfig = {
  active: { color: '#ff4444', label: 'Active' },
  investigating: { color: '#f59e0b', label: 'Investigating' },
  mitigated: { color: '#39ff14', label: 'Mitigated' },
};

const summaryItems = [
  { label: 'Total Alerts', value: '24', icon: <AlertTriangle size={18} />, color: '#f59e0b' },
  { label: 'Critical', value: '3', icon: <ShieldAlert size={18} />, color: '#ff4444' },
  { label: 'Mitigated', value: '18', icon: <ShieldCheck size={18} />, color: '#39ff14' },
  { label: 'Monitoring', value: '3', icon: <Activity size={18} />, color: '#00d4ff' },
];

export default function SecurityView({ alerts }: Props) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Security Center</h1>
        <p className="text-sm text-slate-500 mt-0.5">Threat detection and response management</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryItems.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-xl p-4 flex items-center gap-3"
            style={{ border: `1px solid ${s.color}22` }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Active Threat Alerts</h3>
        {alerts.map((alert, i) => {
          const sev = severityConfig[alert.severity];
          const st = statusConfig[alert.status];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ x: 4 }}
              className="glass rounded-xl p-4"
              style={{ border: `1px solid ${sev.border}` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: sev.bg, color: sev.color }}
                  >
                    <Shield size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">{alert.type}</span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: sev.bg, color: sev.color, border: `1px solid ${sev.border}` }}
                      >
                        {sev.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{alert.description}</p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${st.color}15`, color: st.color }}>
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">{alert.timestamp}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-4 text-xs text-slate-500">
                <span>Source: <span className="text-slate-300 font-mono">{alert.source}</span></span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
