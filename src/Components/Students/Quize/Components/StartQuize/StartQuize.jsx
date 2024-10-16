import React from "react";
import "./StartQuize.css";
import { useStartQuizeHook } from "./StartQuize.hook";
import StartQuizeRight from "../StartQuizeRight/StartQuizeRight";
const StartQuize = () => {
  //   console.log(finalQuizeQuestions);
  const {
    finalQuizeQuestions,
    mcqCount,
    onCheckIssingleDigitOrNot,
    onAnswerClick,
    selectedAnswers,
    onHandelNextQuestion,
    storeQuestionToChangeGreenColor,
    setViewedQuestionsArray,
    viewedQuestionsArray,
    onRightSideClickAnyRandomNumber,
    onSubmiteQuize,
    totalScore,
    afterQuizeCompleted,
  } = useStartQuizeHook();
  return (
    <>
      {afterQuizeCompleted ? (
        <div className="after-quize-completed">
          <h3>Your Score is</h3>
          <h1>{totalScore}</h1>
        </div>
      ) : (
        <div className="start-quize-main">
          <div className="start-quize-left">
            <div className="student-exam-main-first-inner-first-card">
              <h3
                style={{
                  color:
                    finalQuizeQuestions?.[mcqCount]?.Difficulty_Level === "Easy"
                      ? "rgb(55, 226, 55)"
                      : finalQuizeQuestions?.[mcqCount]?.Difficulty_Level ===
                        "Medium"
                      ? "yellow"
                      : "red",
                }}
                className="student-exam-main-leveltext"
              >
                {finalQuizeQuestions?.[mcqCount]?.Difficulty_Level}
              </h3>
              <h3>{finalQuizeQuestions?.[mcqCount]?.courseName}</h3>
            </div>
            <div className="studet-exam-question-card">
              <span>{onCheckIssingleDigitOrNot(mcqCount + 1)}</span>
              <h3>{finalQuizeQuestions?.[mcqCount]?.question}</h3>
            </div>
            <div className="student-exam-answer-card">
              {finalQuizeQuestions?.[mcqCount]?.answers?.map((each) => (
                <div className="student-exam-single-answer">
                  <input
                    onChange={() => onAnswerClick(each)}
                    type="radio"
                    name="easy-python-question-1"
                    checked={selectedAnswers[mcqCount] === each}
                  />
                  <span>{each}</span>
                </div>
              ))}
            </div>
            <div className="student-exam-answer-btn-card">
              {finalQuizeQuestions?.length - 1 !== mcqCount && (
                <button
                  onClick={() => {
                    setViewedQuestionsArray([
                      ...viewedQuestionsArray,
                      mcqCount + 1,
                    ]);
                    onHandelNextQuestion();
                  }}
                >
                  Next
                </button>
              )}
              <button onClick={onSubmiteQuize}>Submit Quize</button>
            </div>
          </div>
          <StartQuizeRight
            storeQuestionToChangeGreenColor={storeQuestionToChangeGreenColor}
            finalQuizeQuestions={finalQuizeQuestions}
            onCheckIssingleDigitOrNot={onCheckIssingleDigitOrNot}
            mcqCount={mcqCount}
            setViewedQuestionsArray={setViewedQuestionsArray}
            viewedQuestionsArray={viewedQuestionsArray}
            onRightSideClickAnyRandomNumber={onRightSideClickAnyRandomNumber}
            onSubmiteQuize={onSubmiteQuize}
          />
        </div>
      )}
    </>
  );
};

export default StartQuize;
