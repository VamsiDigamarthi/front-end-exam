import React from "react";
import "./StudentFeedBacks.css";
import Header from "../../../../Header/Header";
import { useStudentFeedBackHook } from "./StudentfeedBacks.hook";
const StudentFeedBakcs = () => {
  const { profile } = useStudentFeedBackHook();
  return (
    <div className="student-feedbacks">
      <Header name={profile?.name} email={profile?.email} />
    </div>
  );
};

export default StudentFeedBakcs;
