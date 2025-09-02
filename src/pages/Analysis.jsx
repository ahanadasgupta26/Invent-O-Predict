import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Result from './Result';

const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      // Simulate backend response
      setResultData({
        summary: "Stock prediction analysis completed successfully.",
        fields: [
          { Product_id: "P001", Product_name: "Item A", Category: "Category 1", Days_left_to_stockout: 12, Predicted_stockout_date: "2025-09-15" },
          { Product_id: "P002", Product_name: "Item B", Category: "Category 2", Days_left_to_stockout: 5, Predicted_stockout_date: "2025-09-08" }
        ]
      });
    }, 2000);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Upload XLSX File
      </h1>

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
            accept=".xlsx"
            onChange={handleFileChange}
            hidden
          />
          <button className="bg-black text-white px-4 py-2 rounded">Browse Files</button>
        </label>
      </div>

      {/* File Name with Modal Preview */}
      {selectedFile && (
        <div className="mt-6 w-full max-w-4xl text-center">
          <button
            className="text-blue-600 font-semibold underline hover:text-blue-800"
            onClick={() => setIsModalOpen(true)}
          >
            {selectedFile.name}
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-5xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">📄 File Preview</h2>

            {tableData.length > 0 ? (
              <div className="overflow-x-auto max-h-[70vh]">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
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
                <p className="text-sm text-gray-500 mt-2 text-center">Showing first 10 rows...</p>
              </div>
            ) : (
              <p className="text-center text-gray-500">No data available in this file.</p>
            )}
          </div>
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

      {/* Result Section */}
      <div className="mt-10 w-full max-w-4xl">
        <Result data={resultData} />
      </div>
    </div>
  );
};

export default Analysis;
