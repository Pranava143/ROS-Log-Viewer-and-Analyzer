import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import LogTable from "./components/LogTable";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleFileUpload = (parsedLogs) => {
    setLogs(parsedLogs);
  };

  const filteredLogs = logs
    .filter((log) =>
      filter ? log.severity === filter: true
    )
    .filter((log) =>
      search ? log.message.toLowerCase().includes(search.toLowerCase()) : true
    );

  return (
    <div className="app">
      <h1>ROS Log Viewer</h1>
      <UploadForm onFileUpload={handleFileUpload} className="uploadbtn"/>
      <div>
        <label>
          Filter by Severity:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="">All</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
            <option value="DEBUG">DEBUG</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredLogs.length > 0 ? (
        <LogTable logs={filteredLogs} />
      ) : (
        <p>No logs to display. Upload a file to get started!</p>
      )}
    </div>
  );
};

export default App;
