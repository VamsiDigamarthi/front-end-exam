import React, { useEffect } from "react";
import "./QuestionList.css";
import Header from "../../../Header/Header";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
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
  // console.log(reAllExamSections);

  const handleDownload = (examSection) => {
    // Prepare data to be converted into Excel format
    const formattedData = examSection.examsSections.map((section) => ({
      "Exam ID": examSection.examId, // Add Exam ID
      Course: examSection.courseName, // Add Course
      Topic: examSection.topic, // Add Topic
      Level: examSection.level, // Add Level
      Question: section.question, // Question
      "Correct Answer": section.CorrectAnswer, // Correct Answer
      "Difficulty Level": section.Difficulty_Level, // Difficulty Level
      "Default Marks": section.DefaultMarks, // Default Marks
      "Time to Solve (seconds)": section.DefaultTimeToSolve, // Time to Solve
      Answers: section.answers.join(",|||| "), // Combine the answers into a string
    }));

    // Create a new workbook and add the formatted data to the sheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");

    // Generate and download the Excel file
    XLSX.writeFile(
      workbook,
      `${examSection.courseName}_${examSection.examId}.xlsx`
    );
  };
  return (
    <div className="question-main-container">
      <Header name={profile?.name} email={profile?.email} />

      <div className="result-screen-container">
        <div className="result-screen-container-m new-question-list">
          <div className="result-screen-first-card">
            <div className="result-screen-first-first-card">
              <h3>Question List</h3>
            </div>
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
                      <FaDownload onClick={() => handleDownload(each)} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
