import type {
  TrafficPoint,
  SpeedPoint,
  ProtocolData,
  SecurityAlert,
  LogEntry,
  Device,
  CoveragePoint,
  ServerHealth,
  Notification,
} from '../types';

const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateTrafficData = (): TrafficPoint[] => {
  const hours = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
  return hours.map((h) => ({
    time: `${h}:00`,
    inbound: randBetween(100, 950),
    outbound: randBetween(60, 700),
  }));
};

export const generateSpeedData = (): SpeedPoint[] => {
  const minutes = Array.from({ length: 12 }, (_, i) => `${i * 5}m`);
  return minutes.map((m) => ({
    time: m,
    download: randBetween(400, 980),
    upload: randBetween(200, 600),
  }));
};

export const protocolData: ProtocolData[] = [
  { name: 'TCP', value: 42, color: '#00d4ff' },
  { name: 'UDP', value: 28, color: '#39ff14' },
  { name: 'HTTP', value: 18, color: '#ff6b6b' },
  { name: 'DNS', value: 12, color: '#a855f7' },
];

export const generateSecurityAlerts = (): SecurityAlert[] => [
  {
    id: 'a1',
    type: 'DDoS Attempt',
    severity: 'critical',
    source: '192.168.45.221',
    timestamp: '2026-04-17 14:32:11',
    status: 'active',
    description: 'Volumetric flood attack detected — 84,000 pps from spoofed IPs.',
  },
  {
    id: 'a2',
    type: 'Port Scan',
    severity: 'high',
    source: '10.0.0.87',
    timestamp: '2026-04-17 14:28:44',
    status: 'investigating',
    description: 'Sequential port scan detected across ports 1–9999.',
  },
  {
    id: 'a3',
    type: 'Suspicious IP',
    severity: 'medium',
    source: '203.0.113.44',
    timestamp: '2026-04-17 14:21:05',
    status: 'investigating',
    description: 'Connection from known threat intelligence blacklisted IP.',
  },
  {
    id: 'a4',
    type: 'Unauthorized Device',
    severity: 'high',
    source: 'MAC: AA:BB:CC:DD:EE:FF',
    timestamp: '2026-04-17 14:17:30',
    status: 'active',
    description: 'Unregistered device attempted network authentication.',
  },
  {
    id: 'a5',
    type: 'Brute Force',
    severity: 'medium',
    source: '198.51.100.22',
    timestamp: '2026-04-17 14:10:18',
    status: 'mitigated',
    description: '312 failed SSH login attempts within 60 seconds.',
  },
  {
    id: 'a6',
    type: 'Data Exfiltration',
    severity: 'low',
    source: '172.16.0.55',
    timestamp: '2026-04-17 13:58:02',
    status: 'mitigated',
    description: 'Anomalous outbound data spike — 2.4 GB transferred in 3 minutes.',
  },
];

const protocols = ['TCP', 'UDP', 'HTTP', 'DNS', 'TLS', 'ICMP'];
const statuses: LogEntry['status'][] = ['normal', 'normal', 'normal', 'suspicious', 'blocked'];

const genIP = () =>
  `${randBetween(1, 254)}.${randBetween(0, 255)}.${randBetween(0, 255)}.${randBetween(1, 254)}`;

export const generateLogs = (): LogEntry[] =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i}`,
    time: `14:${String(randBetween(0, 59)).padStart(2, '0')}:${String(randBetween(0, 59)).padStart(2, '0')}`,
    sourceIP: genIP(),
    destIP: genIP(),
    protocol: protocols[randBetween(0, protocols.length - 1)],
    size: `${randBetween(64, 9000)} B`,
    status: statuses[randBetween(0, statuses.length - 1)],
  }));

const deviceTypes: Device['type'][] = ['mobile', 'laptop', 'iot', 'server', 'tablet', 'router'];
const deviceNames = [
  'Galaxy S24 Ultra', 'MacBook Pro 14"', 'Smart Thermostat', 'Edge Server Node-1',
  'iPad Pro 12.9"', 'Core Router X7', 'Windows Workstation', 'Security Camera #3',
  'Pixel 8 Pro', 'Dell XPS 15', 'Smart TV Panel', 'Backup Server Node-2',
];

export const generateDevices = (): Device[] =>
  deviceNames.map((name, i) => ({
    id: `dev-${i}`,
    name,
    ip: `10.0.${randBetween(0, 10)}.${randBetween(2, 254)}`,
    type: deviceTypes[i % deviceTypes.length],
    signal: randBetween(40, 100),
    riskScore: randBetween(0, 100),
    lastSeen: `${randBetween(0, 59)}s ago`,
    status: i === 3 ? 'suspicious' : i % 5 === 0 ? 'idle' : 'connected',
  }));

export const generateCoverageData = (): CoveragePoint[] =>
  Array.from({ length: 20 }, (_, i) => ({
    distance: i * 50,
    signalStrength: Math.max(0, 100 - i * 4.5 + randBetween(-5, 5)),
  }));

export const getServerHealth = (): ServerHealth => ({
  cpu: randBetween(28, 82),
  ram: randBetween(40, 90),
  uptime: '14d 06h 22m',
  firewallStatus: 'active',
});

export const generateNotifications = (): Notification[] => [
  { id: 'n1', message: 'DDoS attack mitigated — traffic normalized', type: 'success', timestamp: '14:33' },
  { id: 'n2', message: 'New unauthorized device blocked', type: 'warning', timestamp: '14:18' },
  { id: 'n3', message: 'Firmware update available for Core Router X7', type: 'info', timestamp: '14:05' },
  { id: 'n4', message: 'Security score dropped below threshold', type: 'error', timestamp: '13:47' },
];
