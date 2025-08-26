import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setSelectedFile(file);
      setTableData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      alert("Analysis completed!");
    }, 5000);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Upload CSV / XLSX File</h1>

      {/* Upload Box */}
      <div className="w-full max-w-4xl border border-dashed border-gray-400 rounded-lg bg-blue-100 p-8 text-center">
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-lg font-semibold">Drag or Drop file(s) here</p>
          <p className="text-sm text-gray-500">or</p>
          <input
            type="file"
            id="fileUpload"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            hidden
          />
          <button className="bg-black text-white px-4 py-2 rounded">Browse Files</button>
        </label>
      </div>

      {/* Preview Table */}
      {tableData.length > 0 && (
        <div className="mt-8 w-full max-w-6xl overflow-x-auto">
          <p className="text-gray-600 mb-2 text-center">File Preview: {selectedFile?.name}</p>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {tableData[0].map((cell, index) => (
                  <th key={index} className="px-4 py-2 border text-sm font-semibold text-left">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1, 11).map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white even:bg-gray-100">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-2">Showing first 10 rows...</p>
        </div>
      )}

      {/* Analyze Button */}
      {selectedFile && (
        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <span className="loader h-5 w-5 border-2 border-white border-t-blue-300 rounded-full animate-spin inline-block" />
                Analyzing...
              </div>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Analysis;
