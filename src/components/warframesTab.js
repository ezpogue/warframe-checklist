import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";

const WarframesTab = () => {
    const [warframes, setWarframes] = useState([]);

  useEffect(() => {
    async function fetchWarframes() {
      const response = await fetch("/data/warframes.json");
      const data = await response.json();
      const excluded = ["Helminth", "Excalibur Prime", "Excalibur Umbra"]
      const filtered = data.filter(
        (warframe) => !excluded.includes(warframe.name)
      );
      setWarframes(filtered);
    }

    fetchWarframes();
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
          {warframes.map((warframe) => (
            <ChecklistCard
              key={warframe.uniqueName}
              name={warframe.name}
              imageName={warframe.imageName}
              components={warframe.components}
            />
          ))}
        </div>
    </div>
  );
}

export default WarframesTab;