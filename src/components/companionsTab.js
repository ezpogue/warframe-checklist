import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import { withPrefix } from "gatsby";

const CompanionsTab = ({ searchQuery, moveSelectedToEnd, hideSelected }) => {
  const [companions, setCompanions] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const localStorageKey = "companionsKey";

  useEffect(() => {
    async function fetchCompanions() {
      const response = await fetch(withPrefix("/data/companions.json"));
      const data = await response.json();
      const filtered = data.filter((companion) => companion.masterable === true);
      setCompanions(filtered);
    }

    fetchCompanions();
  }, []);

  useEffect(() => {
        const saved = localStorage.getItem(localStorageKey);
        if (saved) {
          setSelectedItems(JSON.parse(saved));
        }
      }, [localStorageKey]);
  
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelectionChange = (companionName, isSelected) => {
    setSelectedItems((prev) => ({
      ...prev,
      [companionName]: isSelected,
    }));
  };

  let filteredCompanions = companions.filter((companion) =>
    companion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (hideSelected) {
    filteredCompanions = filteredCompanions.filter(
      (companion) => !selectedItems[companion.name]
    );
  }

  if (moveSelectedToEnd) {
    filteredCompanions.sort((a, b) => {
      const aSelected = selectedItems[a.name] || false;
      const bSelected = selectedItems[b.name] || false;

      if (aSelected !== bSelected) {
        return aSelected ? 1 : -1;
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
        {filteredCompanions.map((companion) => (
          <div key={companion.uniqueName} style={{ maxWidth: "330px" }}>
            <ChecklistCard
              name={companion.name}
              imageName={companion.imageName}
              components={companion.components}
              wiki={companion.wikiaUrl}
              isSelected={selectedItems[companion.name] || false}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanionsTab;
