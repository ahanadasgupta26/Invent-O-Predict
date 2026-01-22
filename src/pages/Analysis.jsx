import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      setTableData(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
      setSelectedFile(file);
    };
    reader.readAsArrayBuffer(file);
  };

  // ✅ FIX: reset input value
  const removeFile = () => {
    setSelectedFile(null);
    setTableData([]);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/analysisresult", { state: data });
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to analyze file");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 flex justify-center">

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Stockout Analysis
        </h1>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center bg-blue-50">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer text-blue-700 font-semibold"
          >
            Click to upload XLSX file
          </label>
        </div>

        {/* File Info */}
        {selectedFile && (
          <div className="mt-6 flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg">
            <span
              onClick={() => setShowPreview(true)}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              {selectedFile.name}
            </span>

            <button
              onClick={removeFile}
              className="text-red-500 font-bold text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* Analyze */}
        {selectedFile && (
          <div className="mt-8 text-center">
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg text-lg transition"
            >
              Analyze
            </button>
          </div>
        )}
      </div>

      {/* Full-screen Spinner */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-150">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-6 text-lg">
            Analyzing your data...
          </p>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-5xl rounded-xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">File Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto border rounded">
              <table className="min-w-full text-sm">
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 border-r">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
