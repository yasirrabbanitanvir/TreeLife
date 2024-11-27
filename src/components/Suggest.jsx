import React, { useState } from "react";
import Header from "./Header";
import Papa from "papaparse";

function Suggest() {
    const [inputs, setInputs] = useState({
        cropType: "",
        temperature: "",
        humidity: "",
        moisture: "",
    });
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const decisionTree = (temperature, humidity, moisture) => {
        if (temperature < 20) {
            if (humidity > 80) {
                return "Urea";
            } else {
                return "NPK";
            }
        } else if (temperature >= 20 && temperature <= 30) {
            if (moisture > 30) {
                return "Compost";
            } else {
                return "Urea";
            }
        } else {
            if (humidity > 60) {
                return "NPK";
            } else {
                return "Potassium";
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuggestion("");
        setError("");

        try {
            const response = await fetch('/f2.csv');
            if (!response.ok) {
                throw new Error('Failed to fetch CSV file.');
            }
            const data = await response.text();

            Papa.parse(data, {
                complete: function (results) {
                    console.log('CSV data parsed:', results);

                    const parsedData = results.data;

                    if (!parsedData || parsedData.length === 0) {
                        throw new Error('No valid data found in CSV file.');
                    }

                    const trainingData = parsedData.map((row, index) => {
                        if (row.length < 9) {
                            console.warn(`Skipping row ${index + 1} due to insufficient columns:`, row);
                            return null;
                        }

                        const temp = parseFloat(row[0]);
                        const humidity = parseFloat(row[1]);
                        const moisture = parseFloat(row[2]);

                        if (isNaN(temp) || isNaN(humidity) || isNaN(moisture)) {
                            console.warn(`Skipping row ${index + 1} due to invalid numeric values:`, row);
                            return null;
                        }

                        return [
                            temp,
                            humidity,
                            moisture,
                            row[8],
                        ];
                    }).filter(row => row !== null);

                    if (trainingData.length === 0) {
                        throw new Error('Training data is incomplete or invalid.');
                    }

                    const prediction = decisionTree(
                        parseFloat(inputs.temperature),
                        parseFloat(inputs.humidity),
                        parseFloat(inputs.moisture)
                    );

                    console.log('Prediction:', prediction);

                    setSuggestion(prediction);
                },
                error: function (error) {
                    console.error('Error parsing CSV:', error);
                    setError('Error parsing CSV: ' + error.message);
                }
            });
        } catch (error) {
            console.error('Error occurred:', error);
            setError('Error occurred while processing the data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-20 min-h-screen">
                <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Plant Fertilizer Suggestion</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="cropType"
                            value={inputs.cropType}
                            onChange={handleInputChange}
                            placeholder="Crop Type"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="temperature"
                            value={inputs.temperature}
                            onChange={handleInputChange}
                            placeholder="Temperature (°C)"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="number"
                            name="humidity"
                            value={inputs.humidity}
                            onChange={handleInputChange}
                            placeholder="Humidity (%)"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="moisture"
                            value={inputs.moisture}
                            onChange={handleInputChange}
                            placeholder="Moisture (%)"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    >
                        Get Suggestion
                    </button>
                </form>

                {loading && <p className="mt-4 text-center text-green-600">Loading...</p>}

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                {suggestion && (
                    <p className="mt-4 text-center text-lg font-semibold text-green-700">
                        Suggested Fertilizer: <span className="font-bold">{suggestion}</span>
                    </p>
                )}
            </div>
        </>
    );
}

export default Suggest;