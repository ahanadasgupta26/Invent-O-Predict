import React, { useRef, useEffect } from 'react';

const Result = ({ data }) => {
  const resultRef = useRef(null);

  // Scroll into view whenever data changes and has fields
  useEffect(() => {
    if (data && data.fields && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  if (!data || !data.fields) {
    return (
      <div
        ref={resultRef}
        className="text-center text-gray-500 p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50"
      >
        <p className="text-lg font-semibold">Upload xlsx to get data</p>
      </div>
    );
  }

  return (
    <div ref={resultRef} className="bg-white shadow-lg rounded-xl p-6 border overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">📊 Analysis Result</h2>
      <p className="text-gray-700 text-center mb-6">{data.summary || "Predicted stockout details"}</p>

      <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 border text-sm font-semibold text-left">Product ID</th>
            <th className="px-4 py-2 border text-sm font-semibold text-left">Product Name</th>
            <th className="px-4 py-2 border text-sm font-semibold text-left">Category</th>
            <th className="px-4 py-2 border text-sm font-semibold text-left">Days Left to Stockout</th>
            <th className="px-4 py-2 border text-sm font-semibold text-left">Predicted Stockout Date</th>
          </tr>
        </thead>
        <tbody>
          {data.fields.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-6">
                No data available
              </td>
            </tr>
          ) : (
            data.fields.map((row, index) => (
              <tr key={index} className="bg-white even:bg-gray-50 hover:bg-blue-50 transition">
                <td className="px-4 py-2 border text-sm">{row.Product_id}</td>
                <td className="px-4 py-2 border text-sm">{row.Product_name}</td>
                <td className="px-4 py-2 border text-sm">{row.Category}</td>
                <td className="px-4 py-2 border text-sm text-red-600 font-semibold">
                  {row.Days_left_to_stockout}
                </td>
                <td className="px-4 py-2 border text-sm">{row.Predicted_stockout_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
