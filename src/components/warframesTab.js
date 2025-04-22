import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import { withPrefix } from "gatsby";
import usePersistentLocalStorage from "../hooks/usePersistentLocalStorage.js"

const WarframesTab = ({ searchQuery, moveSelectedToEnd, hideSelected }) => {
  const localStorageKey = "warframesKey";
  const [warframes, setWarframes] = useState([]);
  const [selectedItems, setSelectedItems] = usePersistentLocalStorage(localStorageKey);

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
