import React, { useState, useEffect } from "react";
import ChecklistCard from "./checklistItem.js";

const ArchwingsTab = ({searchQuery}) => {
    const [archwings, setArchwings] = useState([]);

  useEffect(() => {
    async function fetchArchwings() {
      const response = await fetch("/data/archwing.json");
      const data = await response.json();
      setArchwings(data);
    }

    fetchArchwings();
  }, []);

  const filteredArchwings = archwings.filter((archwing) =>
    archwing.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          {filteredArchwings.map((archwing) => (
            <ChecklistCard
              key={archwing.uniqueName}
              name={archwing.name}
              imageName={archwing.imageName}
              components={archwing.components}
              wiki={archwing.wikiaUrl}
            />
          ))}
        </div>
    </div>
  );
}

export default ArchwingsTab;