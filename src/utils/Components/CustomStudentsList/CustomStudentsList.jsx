import React from "react";
import "./CustomStudentsList.css";
const CustomStudentsList = ({
  batchName,
  course,
  purpose,
  date,
  time,
  description,
  students,
}) => {
  return (
    <div className="c-student-list">
      <div className="c-student-first-card">
        <h2>{batchName}</h2>
        <div>
          <span>{course}</span>
          <span>{purpose}</span>
        </div>
        <div>
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <span>{description}</span>
      </div>
      <div className="c-student-second-card">
        <div className="c-student-second-first">
          <h3>Students</h3>
          <h3>{students?.length}</h3>
        </div>
        <div className="c-student-second-second">
          {students?.map((each) => (
            <div className="c-student-second-single-card" key={each.studentId}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
              />
              <div>
                <h5>{each.name}</h5>
                <p>{each.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomStudentsList;
