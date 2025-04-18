import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";

const CompanionsTab = ({searchQuery}) => {
    const [companions, setCompanions] = useState([]);

  useEffect(() => {
    async function fetchCompanions() {
      const response = await fetch("/data/companions.json");
      const data = await response.json();
      const filtered = data.filter(
        (companions) => companions.masterable === true
      );
      setCompanions(filtered);
    }

    fetchCompanions();
  }, []);

  const filteredCompanions = companions.filter((companion) =>
    companion.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          {filteredCompanions.map((companion) => (
          <div key={companion.uniqueName} style={{maxWidth: "330px"}}>
            <ChecklistCard
              name={companion.name}
              imageName={companion.imageName}
              components={companion.components}
              wiki={companion.wikiaUrl}
            />
          </div>
          ))}
        </div>
    </div>
  );
}

export default CompanionsTab;