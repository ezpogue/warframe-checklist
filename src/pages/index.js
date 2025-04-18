//@refresh reset
import React, { useState} from "react";
import WarframesTab from "../components/warframesTab.js";
import WeaponsTab from "../components/weaponsTab.js";
import CompanionsTab from "../components/companionsTab.js";

const IndexPage = () => {
  const [selectedTab, setSelectedTab] = useState("warframes");

  return (
    <div style={{ padding: "2rem" }}>
      {/* Tab Buttons */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setSelectedTab("warframes")}
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
          onClick={() => setSelectedTab("weapons")}
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
          onClick={() => setSelectedTab("companions")}
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
        {/* Add more tabs as needed */}
      </div>

      {/* Conditional Tab Rendering */}
      <div>
        {selectedTab === "warframes" && <WarframesTab />}
        {selectedTab === "weapons" && <WeaponsTab />}
        {selectedTab === "companions" && <CompanionsTab />}
      </div>
    </div>
  );
};

export default IndexPage;
