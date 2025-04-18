//@refresh reset
import React, { useState, useEffect} from "react";
import WarframesTab from "../components/warframesTab.js";
import WeaponsTab from "../components/weaponsTab.js";
import CompanionsTab from "../components/companionsTab.js";
import ArchwingsTab from "../components/archwingTab.js";

const IndexPage = () => {
  const [selectedTab, setSelectedTab] = useState("warframes");
  const localStorageKey = "activetab";

  const [searchQuery, setSearchQuery] = useState("");

  const [moveSelectedToEnd, setMoveSelectedToEnd] = useState(false);
  const [hideSelected, setHideSelected] = useState(false);

  const moveSelectedToEndKey = "moveSelectedToEnd";
  const hideSelectedKey = "hideSelected";

  useEffect(() => {
    const moveToEndSaved = localStorage.getItem(moveSelectedToEndKey);
    const hideSaved = localStorage.getItem(hideSelectedKey);
  
    if (moveToEndSaved) {
      setMoveSelectedToEnd(JSON.parse(moveToEndSaved));
    }
  
    if (hideSaved) {
      setHideSelected(JSON.parse(hideSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(moveSelectedToEndKey, JSON.stringify(moveSelectedToEnd));
  }, [moveSelectedToEnd]);
  
  useEffect(() => {
    localStorage.setItem(hideSelectedKey, JSON.stringify(hideSelected));
  }, [hideSelected]);

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
    <div style={{ padding: "2rem", paddingLeft: "4%", paddingRight: "4%", margin: "0 auto" }}>
      <div style={{
        marginBottom: "1rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flexGrow: 1,
            minWidth: "180px",
            maxWidth: "400px",
          }}
        />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
        </div>
      </div>

      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={moveSelectedToEnd}
            onChange={(e) => setMoveSelectedToEnd(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Move selected to end
        </label>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={hideSelected}
            onChange={(e) => setHideSelected(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Hide selected
        </label>
      </div>

      <div>
        {selectedTab === "warframes" && <WarframesTab 
          searchQuery={searchQuery}
          moveSelectedToEnd={moveSelectedToEnd}
          hideSelected={hideSelected} />}
        {selectedTab === "weapons" && <WeaponsTab 
          searchQuery={searchQuery}
          moveSelectedToEnd={moveSelectedToEnd}
          hideSelected={hideSelected}/>}
        {selectedTab === "companions" && <CompanionsTab 
          searchQuery={searchQuery}
          moveSelectedToEnd={moveSelectedToEnd}
          hideSelected={hideSelected}/>}
        {selectedTab === "archwings" && <ArchwingsTab 
          searchQuery={searchQuery}
          moveSelectedToEnd={moveSelectedToEnd}
          hideSelected={hideSelected}/>}
      </div>
    </div>
  );
};

export default IndexPage;
