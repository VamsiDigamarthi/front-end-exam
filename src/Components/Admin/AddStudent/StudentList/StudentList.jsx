import React, { useEffect, useState } from "react";
import "./StudentList.css";
import Header from "../../../Header/Header";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { MdRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminBatchWiseStudent } from "../../../../Redux/features/BatchWiseStudentData";
const StudentList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenWithUserRole);
  const { profile } = useSelector((state) => state.profile);

  const { restudents } = useSelector((state) => state.batchWiseStudent);
  const [initialBatch, setInitialBatch] = useState([]);
  useEffect(() => {
    dispatch(adminBatchWiseStudent({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    restudents && setInitialBatch(restudents[0]);
  }, [restudents]);

  // console.log(restudents);

  const onSingleBatck = (batch) => {
    console.log(batch);
    const filterBatch = restudents?.filter((each) => each.batchName === batch);
    console.log(filterBatch);
    setInitialBatch(filterBatch?.[0]);
  };

  return (
    <div className="resultp-screen-container">
      <Header name={profile?.name} email={profile.email} />

      <div className="result-screen-container">
        <div className="result-screen-first-card">
          <div className="result-screen-first-first-card">
            <h3>Student List</h3>
            {/* <div>
              <div>
                <input type="text" placeholder="search here" />
                <BiSearchAlt2 size={25} />
              </div>
              <MdRefresh size={25} />
            </div> */}
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
                onClick={() => onSingleBatck(each.batchName)}
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
        <div className="result-screen-second-card">
          <div className="result-screen-second-first-card">
            <h4>{initialBatch?.batchName}</h4>
            <h4>{initialBatch?.course}</h4>
            <span>{initialBatch?.purpose}</span>
            {/* <span>{initiallyData?.description}</span> */}
          </div>
          <div className="result-screen-second-second-card">
            <div className="result-screen-second-second-first-card">
              <span>Students</span>
              <div>{initialBatch?.users?.length}</div>
            </div>
            <div className="result-screen-second-second-second-card">
              {initialBatch?.users?.map((each) => (
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

export default StudentList;
