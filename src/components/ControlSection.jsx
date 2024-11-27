import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ControlSection() {
  const [gardenData, setGardenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [selectedNodeMCU, setSelectedNodeMCU] = useState(null);
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
        setIsLoading(false);
      }
    };

    fetchGardenData();
  }, []);

  const handleSaveWifiData = async () => {
    if (wifiName && wifiPassword && selectedPlant) {
      try {
        await addDoc(collection(db, "wifiData"), {
          wifiName,
          wifiPassword,
          plantName: selectedPlant.plantName,
          timestamp: new Date(),
        });

        toast.success("Wi-Fi information saved successfully!");

        navigate("/PieChartPage");
      } catch (error) {
        console.error("Error saving Wi-Fi data: ", error);
      }
    } else {
      toast.error("Please fill in all fields and select a plant.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 min-h-screen">
      <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
        🌿 Control Section 🌿
      </h2>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Garden:</h3>
            {gardenData.length > 0 ? (
              <ul className="space-y-4">
                {gardenData.map((item) => (
                  <li
                    key={item.id}
                    className={`bg-gray-100 shadow-md p-4 rounded-md flex justify-between items-center hover:bg-green-50 transition duration-200 cursor-pointer ${selectedPlant?.id === item.id ? "bg-green-200" : ""}`}
                    onClick={() => setSelectedPlant(item)}
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

          {selectedPlant && (
            <div className="mt-6">
              <h3 className="text-lg text-gray-800 font-semibold">Selected Plant:</h3>
              <p className="text-gray-700">Name: {selectedPlant.plantName}</p>
              <p className="text-gray-700">Quantity: {selectedPlant.quantity} pcs</p>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Wi-Fi Information:</h3>

                <div className="space-y-2">
                  <div>
                    <label className="text-gray-700 text-sm">Wi-Fi Name</label>
                    <input
                      type="text"
                      value={wifiName}
                      onChange={(e) => setWifiName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm">Wi-Fi Password</label>
                    <input
                      type="password"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <button
                    onClick={handleSaveWifiData}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mt-4"
                  >
                    Save Wi-Fi Info
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ControlSection;