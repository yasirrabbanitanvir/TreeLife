import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from './firebase';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function PieChartPage() {
    const [humidity, setHumidity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [soilMoisture, setSoilMoisture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fertilizer, setFertilizer] = useState(null);

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

    const fetchData = () => {
        const db = getDatabase(app);

        const dht11Ref = ref(db, 'DHT11');
        onValue(dht11Ref, (snapshot) => {
            if (snapshot.exists()) {
                const dht11Data = snapshot.val();
                setHumidity(dht11Data.Humidity);
                setTemperature(dht11Data.Temperature);
            } else {
                console.warn('No DHT11 data available');
            }
        });

        const soilMoistureRef = ref(db, 'SoilMoisture');
        onValue(soilMoistureRef, (snapshot) => {
            if (snapshot.exists()) {
                setSoilMoisture(snapshot.val());
            } else {
                console.warn('No SoilMoisture data available');
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (humidity !== null && temperature !== null && soilMoisture !== null) {
            setLoading(false);
            const recommendedFertilizer = decisionTree(temperature, humidity, soilMoisture);
            setFertilizer(recommendedFertilizer);
        }
    }, [humidity, temperature, soilMoisture]);

    const chartData = {
        labels: ['Temperature', 'Soil Moisture', 'Humidity'],
        datasets: [
            {
                label: 'Real-Time Sensor Data',
                data: [temperature, soilMoisture, humidity],
                backgroundColor: ['#34d399', '#60a5fa', '#fbbf24'],
                borderColor: '#10b981',
                borderWidth: 1,
            },
        ],
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-800">
                <CircularProgress size={60} style={{ color: 'white' }} />
                <p className="text-white text-xl ml-4">Fetching Data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-800 p-4 md:p-10">
            <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                    🌱 Real-Time Garden Monitoring
                </h2>
                <div className="mb-10">
                    <Line data={chartData} />
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <p className="text-green-700 text-lg font-medium">🌡️ Temperature:</p>
                        <p className="text-2xl text-green-900 font-bold">{temperature}°C</p>
                    </div>
                    <div className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <p className="text-blue-700 text-lg font-medium">💧 Soil Moisture:</p>
                        <p className="text-2xl text-blue-900 font-bold">{soilMoisture}%</p>
                    </div>
                    <div className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <p className="text-yellow-700 text-lg font-medium">🌫️ Humidity:</p>
                        <p className="text-2xl text-yellow-900 font-bold">{humidity}%</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-xl text-green-800 font-medium">
                        Fertilizer Recommendation: {fertilizer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PieChartPage;