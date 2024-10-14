import React from "react";
import "./Nodata.css";
const Nodata = ({ data, width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
      }}
    >
      <h3>{data}</h3>
    </div>
  );
};

export default Nodata;
