import React, { useState } from "react";
import axios from "axios";
import "./cssfile.css"; // Import the CSS file

const UploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:8000/upload", formData)
      .then((response) => {
        const { log_data } = response.data; // Extract log_data from the response
        onFileUpload(log_data); // Call the onFileUpload function from props to update logs in App.js
        setMessage(response.data.message); // Display success message
      })
      .catch((error) => {
        setMessage("Error uploading file: " + error.message); // Display error message
      });
  };

  return (
    <div className="upload-form"> {/* Apply the class here */}
      <input type="file" onChange={onFileChange} className="input-file"/>
      <button onClick={handleFileUpload} className="upload-btn">Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadForm;