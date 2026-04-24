import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardView from './components/dashboard/DashboardView';
import TrafficView from './components/traffic/TrafficView';
import SecurityView from './components/security/SecurityView';
import LogsView from './components/logs/LogsView';
import DevicesView from './components/devices/DevicesView';
import CoverageView from './components/coverage/CoverageView';
import SettingsView from './components/settings/SettingsView';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import {
  generateTrafficData,
  generateSpeedData,
  protocolData,
  generateSecurityAlerts,
  generateLogs,
  generateDevices,
  generateCoverageData,
  getServerHealth,
  generateNotifications,
} from './data/mockData';
import type { NavItem } from './types';

function useRefreshableData() {
  const [trafficData, setTrafficData] = useState(generateTrafficData);
  const [speedData, setSpeedData] = useState(generateSpeedData);
  const [alerts, setAlerts] = useState(generateSecurityAlerts);
  const [logs, setLogs] = useState(generateLogs);
  const [devices, setDevices] = useState(generateDevices);
  const [coverageData, setCoverageData] = useState(generateCoverageData);
  const [serverHealth, setServerHealth] = useState(getServerHealth);
  const [notifications] = useState(generateNotifications);

  const refresh = useCallback(() => {
    setTrafficData(generateTrafficData());
    setSpeedData(generateSpeedData());
    setAlerts(generateSecurityAlerts());
    setLogs(generateLogs());
    setDevices(generateDevices());
    setCoverageData(generateCoverageData());
    setServerHealth(getServerHealth());
  }, []);

  return { trafficData, speedData, alerts, logs, devices, coverageData, serverHealth, notifications, refresh };
}

function exportCSV(logs: ReturnType<typeof generateLogs>) {
  const header = 'Time,Source IP,Destination IP,Protocol,Size,Status';
  const rows = logs.map((l) => `${l.time},${l.sourceIP},${l.destIP},${l.protocol},${l.size},${l.status}`);
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '5g_security_logs.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const data = useRefreshableData();

  useAutoRefresh(data.refresh, 15000);

  const renderView = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardView trafficData={data.trafficData} speedData={data.speedData} protocolData={protocolData} />;
      case 'traffic':
        return <TrafficView trafficData={data.trafficData} />;
      case 'security':
        return <SecurityView alerts={data.alerts} />;
      case 'logs':
        return <LogsView logs={data.logs} />;
      case 'devices':
        return <DevicesView devices={data.devices} />;
      case 'coverage':
        return <CoverageView coverageData={data.coverageData} serverHealth={data.serverHealth} />;
      case 'settings':
        return <SettingsView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden grid-bg" style={{ background: '#050b1a' }}>
      <Sidebar
        active={activeNav}
        onNavigate={setActiveNav}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          notifications={data.notifications}
          onRefresh={data.refresh}
          onExportCSV={() => exportCSV(data.logs)}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
