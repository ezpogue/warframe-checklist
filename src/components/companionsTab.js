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
    <div style={{ padding: "2rem", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
          {filteredCompanions.map((companion) => (
            <ChecklistCard
              key={companion.uniqueName}
              name={companion.name}
              imageName={companion.imageName}
              components={companion.components}
              wiki={companion.wikiaUrl}
            />
          ))}
        </div>
    </div>
  );
}

export default CompanionsTab;