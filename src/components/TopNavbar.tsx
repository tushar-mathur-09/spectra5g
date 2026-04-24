import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, RefreshCw, Download, Sun, Moon, ChevronDown, Wifi } from 'lucide-react';
import type { Notification } from '../types';

interface Props {
  onMenuToggle: () => void;
  notifications: Notification[];
  onRefresh: () => void;
  onExportCSV: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const typeColors = {
  info: '#00d4ff',
  warning: '#f59e0b',
  error: '#ff4444',
  success: '#39ff14',
};

export default function TopNavbar({ onMenuToggle, notifications, onRefresh, onExportCSV, darkMode, onThemeToggle }: Props) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.length;

  return (
    <header className="glass border-b border-white/5 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-slate-400 hover:text-white transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2">
        <div className="animate-pulse-neon w-2 h-2 rounded-full bg-[#39ff14]" />
        <span className="text-sm text-slate-400 hidden sm:block">Live Monitoring</span>
        <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-0.5 rounded glass text-xs text-[#00d4ff]">
          <Wifi size={11} />
          <span>5G NR</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <motion.button
          whileTap={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          onClick={onRefresh}
          className="p-2 rounded-lg glass text-slate-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/20 transition-all duration-200"
          title="Refresh data"
        >
          <RefreshCw size={15} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onExportCSV}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}
        >
          <Download size={13} />
          Export CSV
        </motion.button>

        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg glass text-slate-400 hover:text-amber-400 transition-all duration-200"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-lg glass text-slate-400 hover:text-white transition-all duration-200 relative"
          >
            <Bell size={15} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#ff4444] text-[9px] font-bold flex items-center justify-center text-white">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl glass border border-white/10 shadow-2xl z-50 overflow-hidden"
                style={{ background: 'rgba(5,11,26,0.97)' }}
              >
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="text-xs text-slate-500">{unread} new</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/2 transition-colors">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: typeColors[n.type] }}
                        />
                        <div>
                          <p className="text-xs text-slate-300">{n.message}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5">{n.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-[#00d4ff]" style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
            A
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-white">Admin</div>
            <div className="text-[10px] text-slate-500">Security Ops</div>
          </div>
          <ChevronDown size={13} className="text-slate-500 hidden md:block" />
        </div>
      </div>
    </header>
  );
}
