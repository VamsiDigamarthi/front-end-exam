import React, { useEffect, useState } from "react";
import "./Result.css";
import { FaDownload } from "react-icons/fa";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { adminResultData } from "../../../Redux/features/ResultSection";
import * as XLSX from "xlsx";

const Result = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const { reResultData } = useSelector((state) => state?.resultData);
  const [initiallyData, setInitiallyData] = useState([]);
  const [storePassStudentIds, setStorePassStudentIds] = useState([]);

  useEffect(() => {
    dispatch(adminResultData({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    if (reResultData && reResultData.length > 0) {
      setInitiallyData(reResultData[0]);
    }
  }, [reResultData]);

  // Separate the logic for calculating passed students into useEffect
  useEffect(() => {
    if (initiallyData) {
      const passStudent = [];
      const passedOutStudents = calculatePassoutStudents(
        initiallyData,
        passStudent
      );
      setStorePassStudentIds(passStudent); // Set passed student IDs in state
    }
  }, [initiallyData]);

  // Helper function to calculate passed out students
  const calculatePassoutStudents = (singleTest, passStudent) => {
    let passedOutStudents = 0;
    singleTest?.students?.forEach((each) => {
      let oneStudent = 0;
      if (each?.afterWritingExams) {
        for (let afterExam of each?.afterWritingExams) {
          for (let singleExam of singleTest?.examsSections) {
            if (singleExam?._id === afterExam?._id) {
              if (afterExam?.totalMarks >= parseInt(singleExam?.cutOff)) {
                oneStudent++;
              }
            }
          }
        }
      }
      if (oneStudent >= singleTest?.examsSections?.length) {
        passedOutStudents++;
        passStudent.push(each?.studentId);
      }
    });
    return passedOutStudents;
  };

  const singleResult = (single) => {
    const singleFilter = reResultData?.filter(
      (each) => each._id === single._id
    );
    setInitiallyData(singleFilter?.[0]);
  };

  const downloadExcel = (batch) => {
    const ws_data = [
      ["Batch Name", batch?.batchName],
      ["Course", batch?.courseName],
      ["Total Students", batch?.students?.length],
      [],
      ["Name", "Email"],
    ];
    batch?.students?.forEach((student) => {
      ws_data.push([student.name || "N/A", student.email || "N/A"]);
    });
    ws_data.push([]);
    ws_data.push(["Course Name", "Cut Off", "Exam ID", "Topic", "Total Marks"]);
    batch?.examsSections?.forEach((examSection) => {
      ws_data.push([
        examSection?.courseName || "N/A",
        examSection?.cutOff || "N/A",
        examSection?._id || "N/A",
        examSection?.topic || "N/A",
        examSection?.totalMarks || "N/A",
      ]);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Details");
    XLSX.writeFile(workbook, `${batch.batchName}_Details.xlsx`);
  };

  return (
    <div className="resultp-screen-container">
      <Header name={profile?.name} email={profile?.email} />
      <div className="result-screen-container">
        <div className="result-screen-container-m">
          <div className="result-screen-first-card">
            <div className="result-screen-first-first-card">
              <h3>Results</h3>
            </div>
            <div className="result-screen-first-second-card">
              <span>Test ID</span>
              <span>Course</span>
              <span>Date</span>
              <span>Time</span>
              <span>Purpose</span>
              <span>Total Students</span>
              <span>Passedout</span>
              <span>Action</span>
            </div>
            <div className="result-screen-first-table-body-card">
              {reResultData?.map((each) => (
                <div
                  onClick={() => singleResult(each)}
                  className="result-screen-first-table-single-card"
                >
                  <span>{each.testId}</span>
                  <span>{each.courseName}</span>
                  <span>{each.date}</span>
                  <span>{each.time}</span>
                  <span>{each.purpose}</span>
                  <span>{each.students?.length}</span>
                  <span>{calculatePassoutStudents(each, [])}</span>
                  <span>
                    <FaDownload onClick={() => downloadExcel(each)} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="result-screen-second-card">
          <div className="result-screen-second-first-card">
            <h4>{initiallyData?.testId}</h4>
            <h4>{initiallyData?.courseName}</h4>
            <span>{initiallyData?.purpose}</span>
            <span>{initiallyData?.description}</span>
          </div>
          <div className="result-screen-second-second-card">
            <div className="result-screen-second-second-first-card">
              <span>Students</span>
              <div>{initiallyData?.students?.length}</div>
            </div>
            <div className="result-screen-second-second-second-card">
              {initiallyData?.students?.map((each) => (
                <div key={each.studentId}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="profile"
                  />
                  <div className="pass-failed-card-parent">
                    <h5>{each.name}</h5>
                    <p>{each.email}</p>
                    <p
                      className={`pass-failed-card ${
                        storePassStudentIds?.includes(each?.studentId)
                          ? "pass"
                          : "fail"
                      }`}
                    >
                      {storePassStudentIds?.includes(each?.studentId)
                        ? "P"
                        : "F"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
