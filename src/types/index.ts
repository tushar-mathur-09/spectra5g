export type NavItem = 'dashboard' | 'traffic' | 'security' | 'logs' | 'devices' | 'coverage' | 'settings';

export interface StatCard {
  label: string;
  value: string;
  unit?: string;
  change: number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'cyan';
}

export interface TrafficPoint {
  time: string;
  inbound: number;
  outbound: number;
}

export interface SpeedPoint {
  time: string;
  download: number;
  upload: number;
}

export interface ProtocolData {
  name: string;
  value: number;
  color: string;
}

export interface SecurityAlert {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating';
  description: string;
}

export interface LogEntry {
  id: string;
  time: string;
  sourceIP: string;
  destIP: string;
  protocol: string;
  size: string;
  status: 'normal' | 'suspicious' | 'blocked';
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  type: 'mobile' | 'laptop' | 'iot' | 'server' | 'tablet' | 'router';
  signal: number;
  riskScore: number;
  lastSeen: string;
  status: 'connected' | 'idle' | 'suspicious';
}

export interface CoveragePoint {
  distance: number;
  signalStrength: number;
}

export interface ServerHealth {
  cpu: number;
  ram: number;
  uptime: string;
  firewallStatus: 'active' | 'warning' | 'disabled';
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
}
