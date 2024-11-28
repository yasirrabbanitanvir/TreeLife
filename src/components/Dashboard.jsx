import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ControlSection from "./ControlSection";
import Profile from "./Profile";
import CsvReader from "./CsvReader";
import Suggest from "./Suggest";
import GardenInfo from "./GardenInfo";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("control");
  const [formData, setFormData] = useState({ treeName: "", esp8266Id: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <div className="bg-gray-800 font-sans leading-normal tracking-normal min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Sidebar onSectionChange={handleSectionChange} />
        <section className="flex-1 bg-gray-100 p-4 md:p-8 overflow-y-auto">
          {activeSection === "control" && (
            <ControlSection
              onAddDevice={handleAddDevice}
              formData={formData}
              isFormSubmitted={isFormSubmitted}
            />
          )}
          {activeSection === "profile" && <Profile />}
          {activeSection === "readCSV" && <CsvReader />}
          {activeSection === "Suggest" && <Suggest />}
          {activeSection === "gardenInfo" && <GardenInfo />}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;