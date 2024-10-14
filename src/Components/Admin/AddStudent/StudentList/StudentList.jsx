import React from "react";
import "./StudentList.css";
import Header from "../../../Header/Header";
import { FaDownload } from "react-icons/fa";
import CustomStudentsList from "../../../../utils/Components/CustomStudentsList/CustomStudentsList";
import { useStudentList } from "./StudentListHook";
const StudentList = () => {
  const { initialBatch, restudents, profile } = useStudentList();

  return (
    <div className="resultp-screen-container">
      <Header name={profile?.name} email={profile?.email} />

      <div className="result-screen-container">
        <div className="result-screen-first-card">
          <div className="result-screen-first-first-card">
            <h3>Student List</h3>
          </div>
          <div className="student-list-screen-first-second-card">
            <span>Batch ID</span>
            <span>Course</span>
            <span>Purpose</span>
            <span>TotalStudent</span>

            <span>Action</span>
          </div>
          <div className="result-screen-first-table-body-card">
            {restudents?.map((each) => (
              <div
                // onClick={() => onSingleBatck(each.batchName)}
                className="student-list-screen-first-table-single-card"
              >
                <span>{each.batchName}</span>
                <span>{each.course}</span>
                <span>{each?.purpose}</span>

                <span>{each?.users?.length}</span>

                <span>
                  <FaDownload />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="student-n-list-card">
          <CustomStudentsList
            batchName={initialBatch?.batchName}
            course={initialBatch?.course}
            purpose={initialBatch?.purpose}
            date={initialBatch?.date}
            time={initialBatch?.time}
            description={initialBatch?.description}
            students={initialBatch?.users}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentList;
