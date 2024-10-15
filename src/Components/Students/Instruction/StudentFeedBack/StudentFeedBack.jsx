import React from "react";
import "./StudentFeedBack.css";
import { useStudentFeedBackHook } from "./StudentFeedBack.hook";

const StudentFeedBack = ({ examId, userEmail }) => {
  const {
    storeFeedBack,
    onUserPickAnswer,
    storeUserAnswers,
    onFeedBackSubmited,
    alredyFeedbackExist,
  } = useStudentFeedBackHook({
    examId,
    userEmail,
  });

  //   console.log(onFeedBackSubmited)

  return (
    <>
      {alredyFeedbackExist ? (
        <div className="student-already-feedbacks">
          <h2>Thank You!</h2>
        </div>
      ) : (
        <div className="student-feed-back-main">
          <h1>Last, Tell Us how you really feel!</h1>
          <p>
            We want to know vibes! Pick any option that matches your mood and
            help us make your next visit even better. Let's finish with a smile.
          </p>
          {storeFeedBack?.feedbackQuestions ? (
            <div className="stuent-feed-back-question-display-main">
              {storeFeedBack?.feedbackQuestions?.map((singleFeedback, key) => {
                const selectedAnswer = storeUserAnswers.find(
                  (answer) =>
                    answer.feedbackquestion === singleFeedback.feedbackquestion
                );

                return (
                  <div
                    key={key}
                    className="student-feed-back-question-single-card"
                  >
                    <h2>
                      <span>{key + 1}</span>. {singleFeedback.feedbackquestion}
                    </h2>
                    <div>
                      {singleFeedback?.options?.map((option, index) => (
                        <div key={`${option}-${index}`}>
                          <input
                            type="radio"
                            name={singleFeedback.feedbackquestion}
                            checked={selectedAnswer?.pickedOption === option}
                            onClick={() =>
                              onUserPickAnswer({
                                feedbackquestion:
                                  singleFeedback.feedbackquestion,
                                options: singleFeedback.options,
                                pickedOption: option,
                              })
                            }
                            id={`${singleFeedback.feedbackquestion}-${index}`}
                          />
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="student-feed-back-textarea">
                <button onClick={onFeedBackSubmited}>Submit</button>
              </div>
            </div>
          ) : (
            <div className="student-already-feedbacks">
              <h2>Sorry, No FeedBack questions available for this exam.</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentFeedBack;
