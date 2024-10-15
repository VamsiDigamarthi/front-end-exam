import React, { useEffect, useRef, useState } from "react";
import "./AddQuestion.css";
import { MdMergeType, MdOutlineDelete } from "react-icons/md";
import { MdOutlineQuestionMark } from "react-icons/md";
import { PiOptionLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API } from "../../../Core/urls";
import { errorMsgApi, successfully } from "../../../Core/tosts";
import { useSelector } from "react-redux";
import Header from "../../Header/Header";

// import {  useSelector } from "react-redux";
const AddQuestion = () => {
  const { profile } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state?.tokenWithUserRole);

  const [courseName, setCourseName] = useState({
    courseName: "",
    examId: "",
    topic: "",
    level: "",
  });
  const [courseNameError, setCourseNameError] = useState({});
  const [onCourseSave, setOnCourseSave] = useState(false);
  const [singleQuestions, setSingleQuestions] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    CorrectAnswer: "",
    DefaultMarks: "",
    DefaultTimeToSolve: "",
    Difficulty_Level: "",
    QuestionType: "",
  });
  const qu = useRef(null);
  const [completeQuestion, setCompleteQuestion] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const onChangeSingleQuestion = (e) => {
    setSingleQuestions({
      ...singleQuestions,
      [e.target.name]: e.target.value,
    });
  };

  const onAddQuestion = () => {
    if (
      !singleQuestions.question ||
      !singleQuestions.option1 ||
      !singleQuestions.option2 ||
      !singleQuestions.option3 ||
      !singleQuestions.CorrectAnswer ||
      !singleQuestions.DefaultMarks
    ) {
      alert("Please fill all the required fields");
      return;
    }

    if (editIndex !== null) {
      const updatedQuestions = [...completeQuestion];
      updatedQuestions[editIndex] = singleQuestions;
      setCompleteQuestion(updatedQuestions);
      setEditIndex(null);
    } else {
      setCompleteQuestion([
        ...completeQuestion,
        { ...singleQuestions, ...courseName },
      ]);
    }
    setSingleQuestions({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      CorrectAnswer: "",
      DefaultMarks: "",
      DefaultTimeToSolve: "",
      Difficulty_Level: "",
      QuestionType: "",
    });
  };

  const handleDeleteQuestion = (question) => {
    const updatedQuestions = completeQuestion.filter(
      (q) => q.question !== question
    );
    setCompleteQuestion(updatedQuestions);
  };

  const onEditQuestion = (index) => {
    const userToEdit = completeQuestion[index];
    setSingleQuestions(userToEdit);
    setEditIndex(index);
  };

  const onSaveDataFromLocalStorage = () => {
    localStorage.setItem("question", JSON.stringify(completeQuestion));
    alert("Data saved successfully");
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("question"));
    const questionWiseCourseName = JSON.parse(
      localStorage.getItem("questionWiseCourseName")
    );

    if (storedData) {
      setCompleteQuestion(storedData);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
    if (questionWiseCourseName) {
      setCourseName(questionWiseCourseName);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qu.current?.scrollIntoView({ behavior: "smooth" });
  }, [completeQuestion]);

  const onSubmitedPost = () => {
    API.post(
      "/admin/add-question",
      { completeQuestion },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer Y${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res?.data);
        successfully(res?.data?.message);
        setCompleteQuestion([]);
        localStorage.removeItem("question");
        localStorage.removeItem("questionWiseCourseName");
        setOnCourseSave(true);
        setSingleQuestions({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          CorrectAnswer: "",
          DefaultMarks: "",
          DefaultTimeToSolve: "",
          Difficulty_Level: "",
          QuestionType: "",
        });
      })
      .catch((e) => {
        console.log(e);
        errorMsgApi(e?.response?.data?.message);
      });
  };

  const onChangeSingleCourseName = (e) => {
    // setCourseName(e.target.value.toLowerCase());
    setCourseName({ ...courseName, [e.target.name]: e.target.value });
  };

  const addQuestionValidation = (values) => {
    const errors = {};
    if (!values.examId) {
      errors.examId = "ExamId is required";
    }
    if (!values.courseName) {
      errors.courseName = "Course Name is required";
    }
    if (!values.topic) {
      errors.topic = "Topic is required";
    }
    if (!values.level) {
      errors.level = "Level is required";
    }

    setCourseNameError(errors);
    return Object.keys(errors).length === 0;
  };

  const onCourseAddFun = () => {
    if (addQuestionValidation(courseName)) {
      localStorage.setItem(
        "questionWiseCourseName",
        JSON.stringify(courseName)
      );

      setOnCourseSave(true);
    }
  };

  return (
    <div className="addp-student-main-card">
      <Header name={profile?.name} email={profile?.email} />

      <div className="add-student-main-card">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          id="tosts"
        />
        <div className="add-question-edfgb">
          <div className="add-question-first-card">
            <div className="add-question-table-header">
              <span>Action</span>
              <span>QuestionType</span>
              <span>Question</span>
              <span>Option1</span>
              <span>Option2</span>
              <span>Option3</span>
              <span>Option4</span>
              <span>CorrectAnswer</span>
              <span>DefaultMarks</span>
              <span>DefaultTimeToSolve</span>
              <span>Difficulty_Level</span>
            </div>
            <div className="add-question-table-body-card">
              {completeQuestion?.map((each, index) => (
                <div ref={qu} className="add-questiontable-single-card">
                  <span>
                    <CiEdit size={20} onClick={() => onEditQuestion(index)} />
                    <MdOutlineDelete
                      onClick={() => handleDeleteQuestion(each.question)}
                      size={20}
                    />
                  </span>
                  <span>{each.QuestionType}</span>
                  <span>{each.question}</span>
                  <span>{each.option1}</span>
                  <span>{each.option2}</span>
                  <span>{each.option3}</span>
                  <span>{each.option4}</span>
                  <span>{each.CorrectAnswer}</span>
                  <span>{each.DefaultMarks}</span>
                  <span>{each.DefaultTimeToSolve}</span>
                  <span>{each.Difficulty_Level}</span>
                </div>
              ))}
            </div>
            <div className="add-question-multi-btn-card">
              <button onClick={onSaveDataFromLocalStorage}>Save</button>
              <button onClick={onSubmitedPost}>Post</button>
            </div>
          </div>
        </div>
        {onCourseSave ? (
          <div className="add-question-second-card">
            <div className="add-question-inner-card">
              <div className="add-question-input-card">
                <MdMergeType size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Question Type"
                  name="QuestionType"
                  value={singleQuestions.QuestionType}
                />
              </div>
              <div className="add-question-input-card">
                <MdOutlineQuestionMark size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Question"
                  name="question"
                  value={singleQuestions.question}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Option - 1"
                  name="option1"
                  value={singleQuestions.option1}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Option - 2"
                  name="option2"
                  value={singleQuestions.option2}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Option - 3"
                  name="option3"
                  value={singleQuestions.option3}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Option - 4"
                  name="option4"
                  value={singleQuestions.option4}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Correct Answer"
                  name="CorrectAnswer"
                  value={singleQuestions.CorrectAnswer}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Default Marks"
                  name="DefaultMarks"
                  value={singleQuestions.DefaultMarks}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Default Time To Solve in Seconds"
                  name="DefaultTimeToSolve"
                  value={singleQuestions.DefaultTimeToSolve}
                />
              </div>
              <div className="add-question-input-card">
                <PiOptionLight size={20} color="grey" />
                <input
                  onChange={onChangeSingleQuestion}
                  type="text"
                  placeholder="Difficulty_Level"
                  name="Difficulty_Level"
                  value={singleQuestions.Difficulty_Level}
                />
              </div>
              <button onClick={onAddQuestion} className="add-question-btn-card">
                Add
              </button>
            </div>
          </div>
        ) : (
          <div
            className="add-question-second-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
              gap: "2rem",
            }}
          >
            <div
              className={`add-question-input-card ${
                courseNameError?.examId?.length > 0 && "validation-error"
              }`}
            >
              <PiOptionLight size={20} color="grey" />
              <input
                onChange={onChangeSingleCourseName}
                type="text"
                placeholder="Please Enter Exam ID"
                name="examId"
                value={courseName.examId}
              />
            </div>
            <div
              className={`add-question-input-card ${
                courseNameError?.courseName?.length > 0 && "validation-error"
              }`}
            >
              <PiOptionLight size={20} color="grey" />
              <input
                onChange={onChangeSingleCourseName}
                type="text"
                placeholder="Please Enter Course Name "
                name="courseName"
                value={courseName.courseName}
              />
            </div>
            <div
              className={`add-question-input-card ${
                courseNameError?.topic?.length > 0 && "validation-error"
              }`}
            >
              <PiOptionLight size={20} color="grey" />
              <input
                onChange={onChangeSingleCourseName}
                type="text"
                placeholder="Please Enter Topic "
                name="topic"
                value={courseName.topic}
              />
            </div>
            <div
              className={`add-question-input-card ${
                courseNameError?.level?.length > 0 && "validation-error"
              }`}
            >
              <PiOptionLight size={20} color="grey" />
              <input
                onChange={onChangeSingleCourseName}
                type="text"
                placeholder="Please Enter Level "
                name="level"
                value={courseName.level}
              />
            </div>
            <button
              className="add-question-btn-card"
              style={{
                cursor:
                  Object.keys(courseNameError)?.length > 0 && "not-allowed",
              }}
              onClick={onCourseAddFun}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
