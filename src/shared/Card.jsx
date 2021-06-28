import React from "react";

export default function Card({ entry }) {
  return (
    <div>
      {Object.keys(entry).map((key) => (
        <p key={key}>
          {key}: {entry[key]}
        </p>
      ))}
    </div>
  );
}
