import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [totalPlants, setTotalPlants] = useState(0);
  const [badge, setBadge] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
            fetchGardenData(user.uid);
          } else {
            console.log("No user data found");
            setLoading(false);
          }
        } else {
          console.log("User is not logged in");
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const fetchGardenData = async (userId) => {
    try {
      const gardenCollection = collection(db, "gardens");
      const gardenSnapshot = await getDocs(gardenCollection);
      const gardenList = gardenSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((garden) => garden.userId === userId);

      let totalPlantCount = 0;
      gardenList.forEach((garden) => {
        if (garden.quantity) {
          totalPlantCount += garden.quantity;
        }
      });

      setTotalPlants(totalPlantCount);
      calculateBadge(totalPlantCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching garden data:", error);
      setLoading(false);
    }
  };

  const calculateBadge = (totalPlantCount) => {
    if (totalPlantCount >= 10) {
      setBadge("Titanium");
    } else if (totalPlantCount >= 5) {
      setBadge("Gold");
    } else {
      setBadge("Bronze");
    }
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
        <p className="text-center text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      {userDetails ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <img
              src={userDetails.photo || "/default-avatar.png"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-green-500"
            />
          </div>
          <div className="text-center mb-4">
            <h3 className="text-3xl font-semibold text-green-600 mb-2">
              {userDetails.firstName} {userDetails.lastName}
            </h3>
            <p className="text-lg text-gray-700">Email: {userDetails.email}</p>
          </div>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <span
                className={`text-xl font-semibold px-4 py-2 rounded-full ${
                  badge === "Titanium"
                    ? "bg-gray-800 text-white"
                    : badge === "Gold"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {badge} Badge
              </span>
            </div>
            <p className="text-lg text-gray-700 mt-2">Total Plants: {totalPlants}</p>
          </div>
          <div className="text-center">
            <button
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">User data not found</p>
      )}
    </div>
  );
}

export default Profile;