import React, { useState } from "react";

export const About = () => {
  const [urlScanResult, setUrlScanResult] = useState(null);
  const [fileScanResult, setFileScanResult] = useState(null);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [urlColor, setUrlColor] = useState(''); // New state for URL color
  const [fileColor, setFileColor] = useState(''); // New state for file color

  // Function to trigger the URL scan action
  const handleUrlCheck = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    setLoadingUrl(true);
    try {
      const response = await fetch('http://localhost:3001/api/check-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      const scanResults = data?.data?.attributes?.last_analysis_stats;

      if (scanResults && scanResults.malicious > 0) {
        setUrlScanResult("Malicious");
        setUrlColor("red"); // Set color to red for malicious
      } else {
        setUrlScanResult("Safe");
        setUrlColor("green"); // Set color to green for safe
      }
    } catch (error) {
      console.error("Error checking URL:", error);
    } finally {
      setLoadingUrl(false);
    }
  };

  // Function to trigger the file scan action
  const handleFileCheck = async () => {
    if (!file) {
      alert("Please select a file to check.");
      return;
    }

    setLoadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api/check-file', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const scanResults = data?.data?.attributes?.last_analysis_stats;

      if (scanResults && scanResults.malicious > 0) {
        setFileScanResult("Malicious");
        setFileColor("red"); // Set color to red for malicious
      } else {
        setFileScanResult("Safe");
        setFileColor("green"); // Set color to green for safe
      }
    } catch (error) {
      console.error("Error checking file:", error);
    } finally {
      setLoadingFile(false);
    }
  };

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="feature-section">
              <h3>URL Checker</h3>
              <div className="feature">
                <input
                  type="text"
                  placeholder="Enter URL to check"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input-field"
                />
                <button onClick={handleUrlCheck} className="styled-button" disabled={loadingUrl}>
                  {loadingUrl ? "Checking..." : "Check URL"}
                </button>
                <div className="output" style={{ color: urlColor }}>
                  {urlScanResult ? (
                    <p>{urlScanResult}</p>
                  ) : (
                    "No URL scan result yet."
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="feature-section">
              <h3>File Checker</h3>
              <div className="feature">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="input-field"
                />
                <button onClick={handleFileCheck} className="styled-button" disabled={loadingFile}>
                  {loadingFile ? "Checking..." : "Check File"}
                </button>
                <div className="output" style={{ color: fileColor }}>
                  {fileScanResult ? (
                    <p>{fileScanResult}</p>
                  ) : (
                    "No file scan result yet."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for buttons */}
      <style jsx>{`
        .styled-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .styled-button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        .styled-button:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-top: 10px;
        }

        .output {
          margin-top: 10px;
          font-family: monospace;
          background: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .feature-section {
          padding: 20px;
          background-color: #f1f1f1;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        h3 {
          margin-bottom: 15px;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .container {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};
