import React from "react";
import './cssfile.css'; 

const LogTable = ({ logs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Severity</th>
          <th>Node</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index} className={log.severity === 'ERROR' ? 'error' : log.severity === 'WARN' ? 'warn' : ''}>
            <td>{log.timestamp}</td>
            <td>{log.severity}</td>
            <td>{log.node}</td>
            <td>{log.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
