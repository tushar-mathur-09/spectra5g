import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Activity, Shield, ScrollText,
  Cpu, Radio, Settings, Zap, X,
} from 'lucide-react';
import type { NavItem } from '../types';

interface Props {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'traffic', label: 'Traffic', icon: <Activity size={18} /> },
  { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  { id: 'logs', label: 'Logs', icon: <ScrollText size={18} /> },
  { id: 'devices', label: 'Devices', icon: <Cpu size={18} /> },
  { id: 'coverage', label: 'Coverage', icon: <Radio size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

function SidebarContent({ active, onNavigate, onClose, showClose }: {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  onClose: () => void;
  showClose: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <Zap size={16} className="neon-blue" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide text-white"> SPECTRA</span>
          </div>
        </div>
        {showClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-6 pt-4 pb-1 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
        Navigation
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive ? 'text-[#00d4ff]' : 'text-slate-400 hover:text-white'
              }`}
              style={isActive ? {
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.15)',
              } : {}}
            >
              <span className={isActive ? 'neon-blue' : 'group-hover:text-slate-200'}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse-neon"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/5">
        <div className="glass rounded-lg px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">System Status</span>
            <span className="text-xs neon-green font-medium">Online</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Network</span><span className="text-[#00d4ff]">5G NR</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Band</span><span className="text-[#00d4ff]">n78 3.5GHz</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Core</span><span className="neon-green">SA Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ active, onNavigate, mobileOpen, onClose }: Props) {
  return (
    <>
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-white/5"
        style={{ background: 'rgba(5, 11, 26, 0.95)' }}
      >
        <SidebarContent active={active} onNavigate={onNavigate} onClose={onClose} showClose={false} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-20 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-30 w-64 lg:hidden border-r border-white/5"
              style={{ background: 'rgba(5, 11, 26, 0.98)' }}
            >
              <SidebarContent active={active} onNavigate={onNavigate} onClose={onClose} showClose />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
