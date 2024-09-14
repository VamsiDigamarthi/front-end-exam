import React from "react";
import "./ExamList.css";
import Header from "../../../Header/Header";
import { useSelector } from "react-redux";
const ExamList = () => {
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="exam-main-list-container">
      <Header name={profile?.name} email={profile.email} />
      <div className="exam-main-inner-card">
        <div className="exam-main-inner-container"></div>
      </div>
    </div>
  );
};

export default ExamList;
