//@refresh reset
import React, { useState, useEffect} from "react";
import WarframesTab from "../components/warframesTab.js";
import WeaponsTab from "../components/weaponsTab.js";
import CompanionsTab from "../components/companionsTab.js";
import ArchwingsTab from "../components/archwingTab.js";

const IndexPage = () => {
  const [selectedTab, setSelectedTab] = useState("warframes");
  const localStorageKey = "activetab";

  useEffect(() => {
    const savedTab = localStorage.getItem(localStorageKey);
    if(savedTab){
      setSelectedTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem(localStorageKey, tab);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Tab Buttons */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => handleTabChange("warframes")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "warframes" ? "#007bff" : "#e0e0e0",
            color: selectedTab === "warframes" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Warframes
        </button>
        <button
          onClick={() => handleTabChange("weapons")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "weapons" ? "#007bff" : "#e0e0e0",
            color: selectedTab === "weapons" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Weapons
        </button>
        <button
          onClick={() => handleTabChange("companions")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "companions" ? "#007bff" : "#e0e0e0",
            color: selectedTab === "companions" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Companions
        </button>
        <button
          onClick={() => handleTabChange("archwings")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: selectedTab === "archwings" ? "#007bff" : "#e0e0e0",
            color: selectedTab === "archwings" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Archwing
        </button>
        {/* Add more tabs as needed */}
      </div>

      {/* Conditional Tab Rendering */}
      <div>
        {selectedTab === "warframes" && <WarframesTab />}
        {selectedTab === "weapons" && <WeaponsTab />}
        {selectedTab === "companions" && <CompanionsTab />}
        {selectedTab === "archwings" && <ArchwingsTab />}
      </div>
    </div>
  );
};

export default IndexPage;
