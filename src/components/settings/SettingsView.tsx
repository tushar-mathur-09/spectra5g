import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, RefreshCw, Wifi, Lock, Eye } from 'lucide-react';

function Toggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-4"
        style={{ background: on ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)', border: `1px solid ${on ? '#00d4ff' : 'rgba(255,255,255,0.1)'}` }}
      >
        <motion.div
          animate={{ x: on ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-0.5 w-5 h-5 rounded-full"
          style={{ background: on ? '#00d4ff' : '#64748b' }}
        />
      </button>
    </div>
  );
}

function SelectField({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5">
      <div className="text-sm font-medium text-white">{label}</div>
      <select
        defaultValue={defaultValue}
        className="glass rounded-lg px-3 py-1.5 text-xs text-slate-300 border border-white/10 bg-transparent focus:outline-none focus:border-[#00d4ff]/40"
      >
        {options.map((o) => <option key={o} value={o} style={{ background: '#0a1628' }}>{o}</option>)}
      </select>
    </div>
  );
}

export default function SettingsView() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">System configuration and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[
          {
            icon: <Shield size={16} />,
            title: 'Security',
            color: '#ff4444',
            items: (
              <>
                <Toggle label="Intrusion Detection" description="Real-time IDS/IPS monitoring" defaultOn />
                <Toggle label="DDoS Protection" description="Automatic volumetric attack mitigation" defaultOn />
                <Toggle label="IP Blacklisting" description="Auto-block known malicious IPs" defaultOn />
                <Toggle label="Geo-blocking" description="Block traffic from high-risk regions" />
                <SelectField label="Threat Level" options={['Critical', 'High', 'Medium', 'Low']} defaultValue="High" />
              </>
            ),
          },
          {
            icon: <Bell size={16} />,
            title: 'Notifications',
            color: '#f59e0b',
            items: (
              <>
                <Toggle label="Email Alerts" description="Send security events to admin email" defaultOn />
                <Toggle label="SMS Notifications" description="SMS on critical severity events" />
                <Toggle label="Push Notifications" description="Browser push for live alerts" defaultOn />
                <Toggle label="Daily Digest" description="24h security summary report" defaultOn />
                <SelectField label="Alert Threshold" options={['All Events', 'Medium+', 'High+', 'Critical Only']} defaultValue="High+" />
              </>
            ),
          },
          {
            icon: <RefreshCw size={16} />,
            title: 'Auto-Refresh',
            color: '#00d4ff',
            items: (
              <>
                <Toggle label="Live Data Refresh" description="Auto-refresh dashboard data" defaultOn />
                <Toggle label="Log Streaming" description="Continuous log stream updates" defaultOn />
                <SelectField label="Refresh Interval" options={['5s', '10s', '30s', '1m', '5m']} defaultValue="10s" />
                <SelectField label="Data Retention" options={['24 hours', '7 days', '30 days', '90 days']} defaultValue="7 days" />
              </>
            ),
          },
          {
            icon: <Wifi size={16} />,
            title: 'Network',
            color: '#39ff14',
            items: (
              <>
                <Toggle label="5G SA Mode" description="Standalone 5G core network mode" defaultOn />
                <Toggle label="Network Slicing" description="Multi-slice traffic management" defaultOn />
                <Toggle label="QoS Enforcement" description="Quality of Service prioritization" defaultOn />
                <SelectField label="Band Selection" options={['n78 3.5GHz', 'n77 3.7GHz', 'n258 26GHz', 'Auto']} defaultValue="n78 3.5GHz" />
              </>
            ),
          },
        ].map(({ icon, title, color, items }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5"
            style={{ border: `1px solid ${color}22` }}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, color }}>
                {icon}
              </div>
              <span className="font-semibold text-white">{title}</span>
            </div>
            {items}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-5"
        style={{ border: '1px solid rgba(255,68,68,0.15)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Lock size={16} className="text-[#ff4444]" />
          <span className="font-semibold text-white">Danger Zone</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-[#f59e0b] transition-all hover:bg-[#f59e0b]/10" style={{ border: '1px solid rgba(245,158,11,0.3)' }}>
            Reset Security Policies
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-[#ff4444] transition-all hover:bg-[#ff4444]/10" style={{ border: '1px solid rgba(255,68,68,0.3)' }}>
            Factory Reset
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            Export Config
          </button>
        </div>
      </motion.div>
    </div>
  );
}
