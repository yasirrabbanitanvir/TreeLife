import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const CsvReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/f2.csv");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const result = await reader.read();
      const csvText = decoder.decode(result.value);

      Papa.parse(csvText, {
        complete: (result) => {
          setCsvData(result.data);
          setLoading(false);
        },
        header: true,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 md:ml-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-5 mt-5">Fertilizer Recommendation Dataset(Kaggle)</h1>
      {loading ? (
        <p className="text-lg text-gray-500">Loading data...</p>
      ) : csvData.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-full md:max-w-4xl">
          <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} className="px-4 py-2 border border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {Object.values(row).map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border border-gray-300 text-center"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-red-500">No data found in the CSV file.</p>
      )}
    </div>
  );
};

export default CsvReader;