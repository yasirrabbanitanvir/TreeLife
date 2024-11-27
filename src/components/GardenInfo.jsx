import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function GardenInfo() {
    const [plantData, setPlantData] = useState({
        plantName: "",
        quantity: "",
    });
    const [gardenData, setGardenData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlantData({ ...plantData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (plantData.plantName && plantData.quantity) {
            try {
                const gardenCollection = collection(db, "gardens");
                await addDoc(gardenCollection, {
                    plantName: plantData.plantName,
                    quantity: parseInt(plantData.quantity),
                    timestamp: new Date(),
                });

                setPlantData({ plantName: "", quantity: "" });

                setMessage("Garden data added successfully!");

                fetchGardenData();
            } catch (error) {
                console.error("Error adding garden data: ", error);
                setMessage("Failed to add garden data. Please try again later.");
            }
        } else {
            alert("Please fill in both fields!");
        }
    };

    const fetchGardenData = async () => {
        try {
            const gardenCollection = collection(db, "gardens");
            const gardenSnapshot = await getDocs(gardenCollection);
            const gardenList = gardenSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setGardenData(gardenList);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching garden data: ", error);
            setMessage("Failed to fetch data. Please try again later.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGardenData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 max-w-full md:max-w-3xl mx-auto min-h-screen">
            <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
                🌱 Add Plant to Your Garden 🌱
            </h2>

            {message && <p className="text-center text-lg text-green-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label
                            htmlFor="plantName"
                            className="text-lg text-gray-700 mb-2 block"
                        >
                            Plant Name:
                        </label>
                        <input
                            type="text"
                            id="plantName"
                            name="plantName"
                            value={plantData.plantName}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter plant name"
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            htmlFor="quantity"
                            className="text-lg text-gray-700 mb-2 block"
                        >
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={plantData.quantity}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter quantity"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg transition duration-300"
                    >
                        Add Plant
                    </button>
                </div>
            </form>

            <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Garden:</h3>
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : gardenData.length > 0 ? (
                    <ul className="space-y-4">
                        {gardenData.map((item) => (
                            <li
                                key={item.id}
                                className="bg-gray-100 shadow-md p-4 rounded-md flex justify-between items-center hover:bg-green-50 transition duration-200"
                            >
                                <span className="text-lg font-medium text-gray-800">{item.plantName}</span>
                                <span className="text-lg text-gray-600">{item.quantity} pcs</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(item.timestamp.seconds * 1000).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No plants added yet! Start by adding your first plant.</p>
                )}
            </div>
        </div>
    );
}

export default GardenInfo;