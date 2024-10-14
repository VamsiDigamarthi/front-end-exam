import React from "react";
import { MdRefresh } from "react-icons/md";
import "./HomeFirstLeft.css";
import { useHomeLeftFirstHook } from "./HomeFirstLeftHook";

const HomeFirstLeft = () => {
  const { examDetails } = useHomeLeftFirstHook();
  return (
    <div className="home-first-left">
      <div className="header">
        <h3>Exam Details</h3>
        <MdRefresh size={30} className="refresh-icon" />
      </div>

      <div className="exam-details-container">
        {examDetails.map((detail, index) => (
          <div key={index} className="exam-detail">
            <h1>{detail.count}</h1>
            <h4>{detail.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFirstLeft;
