import React, { useEffect, useState } from "react";
import "./Result.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { adminResultData } from "../../../Redux/features/ResultSection";
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
    console.log(single);
    const singleFilter = reResultData?.filter(
      (each) => each._id === single._id
    );
    setInitiallyData(singleFilter?.[0]);
  };
  return (
    <div className="resultp-screen-container">
      <Header name={profile?.name} email={profile.email} />

      <div className="result-screen-container">
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
                  <FaDownload />
                </span>
              </div>
            ))}
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
