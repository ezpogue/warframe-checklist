import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";
import { withPrefix } from "gatsby";

const ArchwingsTab = ({ searchQuery, moveSelectedToEnd, hideSelected }) => {
  const [archwings, setArchwings] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const localStorageKey = "archwingsKey";

  useEffect(() => {
    async function fetchArchwings() {
      const response = await fetch(withPrefix("/data/archwing.json"));
      const data = await response.json();
      setArchwings(data);
    }

    fetchArchwings();
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

  const handleSelectionChange = (archwingName, isSelected) => {
    setSelectedItems((prev) => ({
      ...prev,
      [archwingName]: isSelected,
    }));
  };

  let filteredArchwings = archwings.filter((archwing) =>
    archwing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (hideSelected) {
    filteredArchwings = filteredArchwings.filter(
      (archwing) => !selectedItems[archwing.name]
    );
  }

  if (moveSelectedToEnd) {
    filteredArchwings.sort((a, b) => {
      const aSelected = selectedItems[a.name] || false;
      const bSelected = selectedItems[b.name] || false;

      if (aSelected !== bSelected) {
        return aSelected ? 1 : -1;
      }

      return 0;
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
        {filteredArchwings.map((archwing) => (
          <div key={archwing.uniqueName} style={{ maxWidth: "330px" }}>
            <ChecklistCard
              name={archwing.name}
              imageName={archwing.imageName}
              components={archwing.components}
              wiki={archwing.wikiaUrl}
              isSelected={selectedItems[archwing.name] || false}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchwingsTab;
