import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        // Send the file using Axios POST request
        axios
            .post("http://127.0.0.1:8000/upload", formData)
            .then((response) => {
                setMessage(response.data.message);  // Display success message
            })
            .catch((error) => {
                setMessage("Error uploading file: " + error.message);  // Display error message
            });
    };

    return (
        <div>
            <h3>Upload a File</h3>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
            <p>{message}</p>
        </div>
    );
};

export default FileUpload;
