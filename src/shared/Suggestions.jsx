import React from "react";
import "./Suggestions.css";

const wrapperStyle = {
  padding: "8px",
  margin: "16px auto",
  background: "khaki",
  width: "400px",
  borderRadius: 40,
};

const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "4px",
};

const descriptionStyle = {
  padding: "4px",
  fontSize: "1rem",
};

export default function Suggestions({ entries, handleClick }) {
  return entries.map((entry) => (
    <div key={entry.Link} style={wrapperStyle}>
      <div
        className="suggestion"
        onClick={() => handleClick(entry)}
        styles={titleStyle}
      >
        Title: {entry.API}
      </div>
      <div style={descriptionStyle}> Description : {entry.Description}</div>
    </div>
  ));
}
