import React from "react";
import "./StudentFeedBacks.css";
import Header from "../../../../Header/Header";
import { FaChevronDown, FaDownload } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useStudentFeedBackHook } from "./StudentfeedBacks.hook";
import * as XLSX from "xlsx";

const StudentFeedBakcs = () => {
  const {
    profile,
    uniqueTestIds,
    onChangeTestIdHandle,
    singleTestData,
    setSingleTestIdToDisplayFeedbacks,
    singleTestIdToDisplayFeedbacks,
  } = useStudentFeedBackHook();
  console.log(singleTestData);

  const downloadExcel = (feedbackData) => {
    console.log(feedbackData);

    // Prepare the data for the Excel sheet
    const ws_data = [
      ["Batch Name", feedbackData[0]?.testId?.batchName],
      ["Course", feedbackData[0]?.testId?.courseName],
      ["Total Students", feedbackData.length],
      [], // Add empty row for separation
      // Column names for students
      ["Name", "Email", "Role", "Feedback Question", "Picked Option"],
    ];

    // Loop through each feedback entry to extract student and feedback details
    feedbackData.forEach((feedback) => {
      const studentInfo = feedback.head; // Get student info
      const feedbacks = feedback.feedBacks; // Get feedbacks

      // Check if there are feedbacks available
      if (feedbacks.length > 0) {
        // Loop through each feedback question
        feedbacks.forEach((fb, index) => {
          if (index === 0) {
            // For the first feedback question, include student info
            ws_data.push([
              studentInfo.name, // Student Name
              studentInfo.email, // Email
              studentInfo.role, // Role
              fb.feedbackquestion, // Feedback Question
              fb.pickedOption, // Picked Option
            ]);
          } else {
            // For subsequent feedback questions, only include feedback details
            ws_data.push([
              "", // Empty for Name
              "", // Empty for Email
              "", // Empty for Role
              fb.feedbackquestion, // Feedback Question
              fb.pickedOption, // Picked Option
            ]);
          }

          // If this is the last feedback question for the student, add an empty row for separation
          if (index === feedbacks.length - 1) {
            ws_data.push([]); // Add an empty row
          }
        });
      }
    });

    // Create a worksheet from the ws_data
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback Data");

    // Export the file
    XLSX.writeFile(workbook, "Feedback_Data.xlsx");
  };

  return (
    <div className="student-feedbacks">
      <Header name={profile?.name} email={profile?.email} />
      <div className="student-feedback-inner-card">
        <div className="student-feedback-select-card">
          <select onChange={onChangeTestIdHandle}>
            <option selected hidden disabled>
              SELECT TEST ID
            </option>
            {uniqueTestIds?.map((each) => (
              <option value={each}>{each}</option>
            ))}
          </select>
          <div>
            <FaDownload
              onClick={() => downloadExcel(singleTestData)}
              size={20}
              color="#fff"
            />
          </div>
        </div>
        <div className="student-feedback-list-show-parent">
          {singleTestData?.map((singleTest, testId) => (
            <div key={testId} className="student-feedback-list-single-parents">
              <div className="student-feedback-single-list-card">
                <h2>{singleTest?.head?.name}</h2>
                {singleTestIdToDisplayFeedbacks === singleTest?._id ? (
                  <FaChevronUp
                    onClick={() => setSingleTestIdToDisplayFeedbacks(null)}
                  />
                ) : (
                  <FaChevronDown
                    onClick={() =>
                      setSingleTestIdToDisplayFeedbacks(singleTest?._id)
                    }
                  />
                )}
              </div>
              <div
                style={{
                  display:
                    singleTestIdToDisplayFeedbacks === singleTest?._id
                      ? "block"
                      : "none",
                }}
                className="student-feedback-single-list-inner-card"
              >
                {singleTest?.feedBacks?.map((each, questionId) => (
                  <div
                    key={questionId}
                    className="student-feedback-single-list-question-new-card"
                  >
                    <h3>
                      {questionId + 1}, {each?.feedbackquestion}
                    </h3>
                    <div>
                      {each?.options?.map((opt, optId) => (
                        <span
                          style={{
                            color: each?.pickedOption === opt && "red",
                          }}
                          key={optId}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentFeedBakcs;
