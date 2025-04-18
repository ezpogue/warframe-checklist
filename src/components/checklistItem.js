import React, { useState, useEffect } from "react";

const ChecklistCard = ({
  name,
  imageName,
  components = [],
  wiki = [],
  isSelected,
  onSelectionChange,
}) => {
  const [checkedComponents, setCheckedComponents] = useState({});
  const localStorageKey = `components-${name}`;
  const cardKey = `card-${name}`;

  const filteredComponents = ["Neurodes", "Detonite Injector", "Mutagen Mass", "Fieldron", "Thrax Plasm", 
    "Ferrite", "Entrati Lanthorn", "Fate Pearl", "Aggristone", "Kovnik", "Rune Marrow", "Silphsela", 
    "Cabochon Embolos", "Trapezium Xenorhast", "Efervon Sample", "HöLlvanian Pitchweave Fragment", 
    "Techrot Chitin", "Techrot Motherboard", "Maw Fang", "Saggen Pearl", "Yao Shrub", "Carbides", "Isos",
    "Nullstones", "Titanium", "Heart Noctrul", "Tepa Nodule", "Tromyzon Entroplasma", "Nitain Extract", 
    "Forma", "Ocular Stem-Root", "Scintillant", "Stellated Necrathene", "Connla Sprout", "Nacreous Pebble", 
    "Tasoma Extract", "Entrati Obols", "Necracoil", "Shrill Voca", "Repeller Systems", "Voidgel Orb", 
    "Voidplume Pinion", "Voidplume Quill", "Atmo Systems", "Echo Voca", "Auroxium Alloy", "Breath Of The Eidolon", 
    "Esher Devar", "Mawfish Bones", "Coprite Alloy", "Narmer Isoplast", "Radiant Zodian", 
    "Longwinder Lathe Coagulant", "Mytocardia Spore", "Star Amarast", "Fersteel Alloy", "Charamote Sagan Module", 
    "Thermal Sludge", "Venerdo Alloy", "Eidolon Shard", "Orokin Ducats", "Lua Thrax Plasm", "Intact Sentient Core", 
    "Gyromag Systems", "Devolved Namalon", "Parasitic Tethermaw", "Grokdrul", "Spinal Core Section", "Pathos Clamp", 
    "Cranial Foremount", "Dracroot", "Lamentus", "Eevani", "Hespazym Alloy", "Seriglass Shard", "Anomaly Shard", 
    "Exceptional Sentient Core", "Iradite", "Mortus Horn", "Purified Heciphron", "Tempered Bapholite", 
    "Eye-Eye Rotoblade", "Marquise Thyst", "Mirewinder Parallel Biode", "Sapcaddy Venedo Case", "Radian Sentirum", 
    "Recaster Neural Relay", "Star Crimzian", "Synathid Ecosynth Analyzer", "Gorgaricus Spore", "Goblite Tears", 
    "Travocyte Alloy", "Axidrol Alloy", "Scrap", "Smooth Phasmin", "Kriller Thermal Laser", "Marquise Veridos"
  ];

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setCheckedComponents(JSON.parse(saved));
    }
  }, [localStorageKey]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(checkedComponents));
  }, [checkedComponents, localStorageKey]);

  const handleCheckboxChange = (compName, event) => {
    event.stopPropagation();
    setCheckedComponents((prev) => ({
      ...prev,
      [compName]: !prev[compName],
    }));
  };

  const visibleComponents = components.filter(
    (c) => c.type !== "Resource" && !filteredComponents.includes(c.name)
  );

  const totalCheckboxes = visibleComponents.reduce(
    (sum, comp) => sum + comp.itemCount,
    0
  );

  const handleCardClick = () => {
    onSelectionChange(name, !isSelected); // Update the selected state in the parent
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        display: "flex",
        height: "75%",
        alignItems: "center",
        flex: "1 1 300px",
        maxWidth: "500px",
        minWidth: "300px",
        padding: "1rem",
        position: "relative",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        border: isSelected ? "3px solid #4caf50" : "3px solid #ccc",
        transition: "border 0.4s ease",
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "24px",
            color: "#4caf50",
            zIndex: 1,
          }}
        >
          ✔
        </div>
      )}
  
      {/* Inner Content Wrapper with grayscale + dim */}
      <div
        style={{
          display: "flex",
          filter: isSelected ? "grayscale(80%) brightness(85%)" : "none",
          transition: "filter 0.4s ease",
        }}
      >
        {/* Image Section */}
        <div style={{ flexShrink: 0, marginRight: "1rem" }}>
          <img
            src={`https://cdn.warframestat.us/img/${imageName}`}
            alt={name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </div>
  
        {/* Content Section */}
        <div>
          <h3
            style={{
              margin: "0 0 0.5rem",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <a
              href={wiki}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              {name}
            </a>
          </h3>
  
          {totalCheckboxes > 1 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {visibleComponents.map((comp, compIndex) => {
                const checkboxes = [];
                for (let i = 0; i < comp.itemCount; i++) {
                  const checkboxKey = `${comp.name}-${compIndex}-${i}`;
                  checkboxes.push(
                    <li key={checkboxKey}>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!checkedComponents[checkboxKey]}
                          onChange={(event) =>
                            handleCheckboxChange(checkboxKey, event)
                          }
                        />
                        <span style={{ marginLeft: "0.5rem" }}>{comp.name}</span>
                      </label>
                    </li>
                  );
                }
                return checkboxes;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );  
};

export default ChecklistCard;
