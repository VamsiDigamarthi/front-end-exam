import React from "react";
import "./Feedback.css";
import Header from "../../Header/Header";
import { useFeedbackHook } from "./Feedbackhook";
import AddFeedBackFrom from "./Components/AddFeebBackFrom/AddFeedBackFrom";
import SelectTestId from "./Components/SelectTestId/SelectTestId";
import FeedbackTable from "./Components/FeedbackTable/FeedbackTable";
const Feedback = () => {
  const {
    profile,
    reResultData,
    setTestDetails,
    testDetails,
    showFeedbackForm,
    handleToggleFeedbackForm,
    onChangeFeedbackFrom,
    feedbackQuestion,
    onAddFeedBackQuestion,
    feedback,
    onPostFeedbackQuestions,
  } = useFeedbackHook();
  return (
    <div className="feedback">
      <Header name={profile?.name} email={profile?.email} />
      <div className="feedback-main">
        <div className="feebdack-left">
          <FeedbackTable
            feedback={feedback}
            onPostFeedbackQuestions={onPostFeedbackQuestions}
          />
        </div>
        <div className="feedback-right">
          {showFeedbackForm ? (
            <AddFeedBackFrom
              feedbackQuestion={feedbackQuestion}
              onChangeFeedbackFrom={onChangeFeedbackFrom}
              onAddFeedBackQuestion={onAddFeedBackQuestion}
              testId={testDetails}
            />
          ) : (
            <SelectTestId
              setTestId={setTestDetails}
              reResultData={reResultData}
              handleToggleFeedbackForm={handleToggleFeedbackForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
