import React from "react";
import { useStartQuizeRight } from "./StartQuizeRight.hook";

const StartQuizeRight = ({
  finalQuizeQuestions,
  onCheckIssingleDigitOrNot,
  storeQuestionToChangeGreenColor,
  mcqCount,
  viewedQuestionsArray,
  setViewedQuestionsArray,
  onRightSideClickAnyRandomNumber,
  onSubmiteQuize,
}) => {
  const { hours, minutes, seconds } = useStartQuizeRight({
    finalQuizeQuestions,
    onSubmiteQuize,
  });
  return (
    <div className="start-quize-right">
      <div className="student-exam-second-card-time-card">
        <div>
          <h4>Time</h4>
          {/* <MdMoreTime size={30} /> */}
        </div>
        <div>
          <h1>{hours}</h1>
          <h1>:</h1>
          <h1>{minutes}</h1>
          <h1>:</h1>
          <h1>{seconds}</h1>
        </div>
        <div>
          <h4>Hour</h4>
          <h4>Minute</h4>
          <h4>Seconds</h4>
        </div>
      </div>
      <div className="student-exam-question-number-card">
        <div className="">
          {finalQuizeQuestions?.map((each, key) => (
            <span
              style={{
                background: storeQuestionToChangeGreenColor?.includes(each)
                  ? "green"
                  : mcqCount + 1 === key + 1
                  ? "#de0085"
                  : viewedQuestionsArray.includes(key + 1) && "#ff5900",
              }}
              onClick={() => {
                setViewedQuestionsArray([
                  ...viewedQuestionsArray,
                  mcqCount + 1,
                ]);
                onRightSideClickAnyRandomNumber(key);
                //   onCheckPreviousAnswer(each);
              }}
            >
              {onCheckIssingleDigitOrNot(key + 1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartQuizeRight;
