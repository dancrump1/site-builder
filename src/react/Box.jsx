import React, { memo } from "react";

const styles = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  cursor: "move",
};
export const Box = memo(function Box({ title, yellow, preview, children }) {
  const backgroundColor = yellow ? "yellow" : "white";
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {children}
    </div>
  );
});
