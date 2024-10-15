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
  useEffect(() => {
    dispatch(adminResultData({ token }));
  }, [dispatch, token]);

  // console.log(reResultData);

  useEffect(() => {
    reResultData && setInitiallyData(reResultData[0]);
  }, [reResultData]);
  // console.log(initiallyData);

  const onCalcuatePassoutFun = (singleTest) => {
    let passedOutStudents = 0;
    singleTest?.students?.forEach((each) => {
      let oneStudent = 0;
      for (let afterExam of each?.afterWritingExams) {
        //   console.log(afterExam)
        for (let singleExam of singleTest?.examsSections) {
          // console.log(singleExam)
          if (singleExam?._id === afterExam?._id) {
            if (afterExam?.totalMarks >= parseInt(singleExam?.cutOff)) {
              oneStudent++;
            }
          }
        }
      }
      if (oneStudent >= singleTest?.examsSections?.length) {
        passedOutStudents++;
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
    console.log(batch);

    // Prepare the data for the Excel sheet
    const ws_data = [
      ["Batch Name", batch?.batchName],
      ["Course", batch?.courseName],
      ["Total Students", batch?.students?.length],
      [], // Add empty row for separation
      // Column names for students
      ["Name", "Email"],
    ];

    // Add each student to the ws_data array
    batch?.students?.forEach((student) => {
      ws_data.push([
        student.name || "N/A", // Default value if undefined
        student.email || "N/A", // Default value if undefined
      ]);
    });

    // Add empty row for separation between students and exams
    ws_data.push([]);

    // Column names for exam sections
    ws_data.push(["Course Name", "Cut Off", "Exam ID", "Topic", "Total Marks"]);

    // Add each exam section to the ws_data array
    batch?.examsSections?.forEach((examSection) => {
      ws_data.push([
        examSection?.courseName || "N/A", // Default value if undefined
        examSection?.cutOff || "N/A", // Default value if undefined
        examSection?._id || "N/A", // Default value if undefined
        examSection?.topic || "N/A", // Default value if undefined
        examSection?.totalMarks || "N/A", // Default value if undefined
      ]);
    });

    // Create a worksheet from the ws_data
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Details");

    // Export the file
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
              {/* <div>
              <div>
                <input type="text" placeholder="search here" />
                <BiSearchAlt2 size={25} />
              </div>
              <MdRefresh size={25} />
            </div> */}
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
                  <span>{onCalcuatePassoutFun(each)}</span>
                  {/* <span>2</span> */}
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
                <div>
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
      </div>
    </div>
  );
};

export default Result;
