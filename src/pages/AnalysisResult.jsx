import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const AnalysisResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.fields;

  const [downloading, setDownloading] = useState(false);
  const [search, setSearch] = useState("");

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="pt-24 text-center text-gray-500 text-lg">
        No analysis found
      </div>
    );
  }

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();

    return data.filter(
      (row) =>
        row.Product_id?.toString().toLowerCase().includes(q) ||
        row.Product_name?.toLowerCase().includes(q) ||
        row.Category?.toLowerCase().includes(q),
    );
  }, [search, data]);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Analysis Result");
      XLSX.writeFile(workbook, "analysis-result.xlsx");
      setDownloading(false);
    }, 800);
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          {/* Left */}
          <div>
            <button
              onClick={() => navigate("/analysis")}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-70"
            >
              ← Analyse Again
            </button>
          </div>

          {/* Center */}
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Stockout Prediction Result
          </h2>

          {/* Right */}
          <div className="flex sm:justify-end">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-70"
            >
              {downloading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {downloading ? "Downloading..." : "Download Excel"}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 pt-4">
          <input
            type="text"
            placeholder="Search by Product ID/Product Name/Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-180 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="p-6 pt-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-blue-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-center font-semibold">
                      Product ID
                    </th>
                    <th className="px-4 py-3 font-semibold">Product Name</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Days Left
                    </th>
                    <th className="px-4 py-3 font-semibold">Stockout Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition"
                      >
                        <td className="px-4 py-2 text-center">
                          {row.Product_id}
                        </td>
                        <td className="px-4 py-2">{row.Product_name}</td>
                        <td className="px-4 py-2">{row.Category}</td>
                        <td className="px-4 py-2 text-center font-bold text-red-600">
                          {row.Days_left_to_stockout}
                        </td>
                        <td className="px-4 py-2">
                          {row.Predicted_stockout_date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500"
                      >
                        No matching Product ID found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
