import React from "react";

type Log = {
  time: string;
  sourceIP: string;
  destIP: string;
  protocol: string;
  size: number;
  status: string;
};

export default function LogsView({ logs }: { logs: Log[] }) {
  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Logs View</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Time</th>
              <th className="p-2">Source IP</th>
              <th className="p-2">Destination IP</th>
              <th className="p-2">Protocol</th>
              <th className="p-2">Size</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                className={log.status === "Suspicious" ? "bg-red-900" : "bg-gray-900"}
              >
                <td className="p-2">{log.time}</td>
                <td className="p-2">{log.sourceIP}</td>
                <td className="p-2">{log.destIP}</td>
                <td className="p-2">{log.protocol}</td>
                <td className="p-2">{log.size}</td>
                <td className="p-2">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}