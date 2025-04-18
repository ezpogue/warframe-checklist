import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import { withPrefix } from "gatsby";

const WarframesTab = ({ searchQuery, moveSelectedToEnd, hideSelected }) => {
  const [warframes, setWarframes] = useState([]);
  const [selectedItems, setSelectedItems] = useState({}); // To store selected cards

  const localStorageKey = "warframesKey";

  useEffect(() => {
    async function fetchWarframes() {
      const response = await fetch(withPrefix("/data/warframes.json"));
      const data = await response.json();
      const excluded = ["Helminth", "Excalibur Prime", "Excalibur Umbra"];
      const filtered = data.filter(
        (warframe) => !excluded.includes(warframe.name)
      );
      setWarframes(filtered);
    }

    fetchWarframes();
  }, []);

  useEffect(() => {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        setSelectedItems(JSON.parse(saved));
      }
    }, [localStorageKey]);

  // Update selected items in localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelectionChange = (warframeName, isSelected) => {
    setSelectedItems((prev) => ({
      ...prev,
      [warframeName]: isSelected,
    }));
  };

  let filteredWarframes = warframes.filter((warframe) =>
    warframe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (hideSelected) {
    filteredWarframes = filteredWarframes.filter(
      (wf) => !selectedItems[wf.name]
    );
  }

  if (moveSelectedToEnd) {
    filteredWarframes.sort((a, b) => {
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
        {filteredWarframes.map((warframe) => (
          <div key={warframe.uniqueName} style={{ maxWidth: "340px" }}>
            <ChecklistCard
              name={warframe.name}
              imageName={warframe.imageName}
              components={warframe.components}
              wiki={warframe.wikiaUrl}
              isSelected={selectedItems[warframe.name] || false}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarframesTab;
