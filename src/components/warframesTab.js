import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";

const WarframesTab = ({searchQuery}) => {
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

  const filteredWarframes = warframes.filter((warframe) =>
    warframe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{margin: "0 auto" }}>
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
                <div key={warframe.uniqueName} style={{maxWidth: "340px"}}> 
                  <ChecklistCard
                    name={warframe.name}
                    imageName={warframe.imageName}
                    components={warframe.components}
                    wiki={warframe.wikiaUrl}
                  />
              </div>
              ))}
            </div>
    </div>
  );
}

export default WarframesTab;