import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";

const WeaponsTab = () => {
    const [weapons, setWeapons] = useState([]);
    
    useEffect(() => {
    async function fetchWeapons() {
        const response = await fetch("/data/weapons.json");
        const data = await response.json();
        const filtered = data.filter(
            (weapons) => weapons.masterable === true
          );
          setWeapons(filtered);
      }
      
  
      fetchWeapons();
    }, []);
  
    return (
      <div style={{ padding: "2rem", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
            {weapons.map((weapon) => (
              <ChecklistCard
                key={weapon.uniqueName}
                name={weapon.name}
                imageName={weapon.imageName}
                components={weapon.components}
              />
            ))}
          </div>
      </div>
    );
};

export default WeaponsTab;
