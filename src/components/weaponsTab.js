import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import { withPrefix } from "gatsby";
import usePersistentLocalStorage from "../hooks/usePersistentLocalStorage.js"

const WeaponsTab = ({ searchQuery, moveSelectedToEnd, hideSelected }) => {
  const localStorageKey = "weaponsKey";
  const [weapons, setWeapons] = useState([]);
  const [selectedItems, setSelectedItems] = usePersistentLocalStorage(localStorageKey);

  useEffect(() => {
    async function fetchWeapons() {
      const response = await fetch(withPrefix("/data/weapons.json"));
      const data = await response.json();
      const filtered = data.filter((weapon) => weapon.masterable === true);
      setWeapons(filtered);
    }

    fetchWeapons();
  }, []);

  // This function handles selection/deselection in the parent component
  const handleSelectionChange = (weaponName, isSelected) => {
    setSelectedItems((prev) => ({
      ...prev,
      [weaponName]: isSelected,
    }));
  };

  let filteredWeapons = weapons.filter((weapon) =>
    weapon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (hideSelected) {
    filteredWeapons = filteredWeapons.filter(
      (wf) => !selectedItems[wf.name]
    );
  }

  if (moveSelectedToEnd) {
    filteredWeapons.sort((a, b) => {
      const aSelected = selectedItems[a.name] || false;
      const bSelected = selectedItems[b.name] || false;

      if (aSelected !== bSelected) {
        return aSelected ? 1 : -1; // Unselected first
      }

      return 0; // Preserve original order
    });
  }

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
          <div key={weapon.uniqueName} style={{ maxWidth: "330px" }}>
            <ChecklistCard
              name={weapon.name}
              imageName={weapon.imageName}
              components={weapon.components}
              wiki={weapon.wikiaUrl}
              isSelected={selectedItems[weapon.name] || false} // Pass current selection state
              onSelectionChange={handleSelectionChange} // Pass the callback function to update the parent state
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponsTab;
