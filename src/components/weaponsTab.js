import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import {withPrefix} from "gatsby";

const WeaponsTab = ({searchQuery}) => {
  const [weapons, setWeapons] = useState([]);
  
  useEffect(() => {
  async function fetchWeapons() {
      const response = await fetch(withPrefix("/data/weapons.json"));
      const data = await response.json();
      const filtered = data.filter(
          (weapons) => weapons.masterable === true
        );
        setWeapons(filtered);
    }
    

    fetchWeapons();
  }, []);

  const filteredWeapons = weapons.filter((weapon) =>
    weapon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "flex-start",
          marginInline: "auto",
        }}
      >
      {filteredWeapons.map((weapon) => (
        <div key={weapon.uniqueName} style={{maxWidth: "330px"}}>
          <ChecklistCard
            name={weapon.name}
            imageName={weapon.imageName}
            components={weapon.components}
            wiki={weapon.wikiaUrl}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default WeaponsTab;
