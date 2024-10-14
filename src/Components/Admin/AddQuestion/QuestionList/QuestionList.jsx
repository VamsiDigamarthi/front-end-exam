import React, { useEffect } from "react";
import "./QuestionList.css";
import Header from "../../../Header/Header";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminAllExamSections } from "../../../../Redux/features/allExamSection";
const QuestionList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenWithUserRole);
  const { profile } = useSelector((state) => state.profile);

  const { reAllExamSections } = useSelector((state) => state.allExamSection);
  // console.log(reAllExamSections);
  useEffect(() => {
    dispatch(adminAllExamSections({ token }));
  }, [dispatch, token]);
  return (
    <div className="question-main-container">
      <Header name={profile?.name} email={profile?.email} />

      <div className="question-second-main-card">
        <div className="question-main-inner-card">
          <div className="question-main-inner-table-header">
            <span>Exam ID</span>
            <span>Course</span>
            <span>Topic</span>
            <span>Level</span>
            <span>Action</span>
          </div>
          <div className="question-main-inner-table-body-card">
            {reAllExamSections?.map((each) => (
              <div className="question-main-inner-table-single-card">
                <span>{each.examId}</span>
                <span>{each.courseName}</span>
                <span>{each.topic}</span>
                <span>{each.level}</span>
                <span>
                  {" "}
                  <FaDownload />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
