import React, { useRef } from "react";
import "./FeedbackTable.css";
import { useFeedbackTable } from "./FeedbackTable.hooks";
const FeedbackTable = ({ feedback, onPostFeedbackQuestions }) => {
  const { onSaveFeedbackQuestionOneLocalStorage } = useFeedbackTable();
  const qu = useRef(null);
  return (
    <div className="feed-back-tables">
      <div className="feed-back-header">
        <span>Question</span>
        <span>Option-1</span>
        <span>Option-2</span>
        <span>Option-3</span>
        <span>Option-4</span>
      </div>
      <div className="feeback-table-body">
        {feedback?.map((singleFeedback) => (
          <div ref={qu} className="feedback-table-sinble-card">
            <span>{singleFeedback.feedbackquestion}</span>
            <span>{singleFeedback.feedbackoptionone}</span>
            <span>{singleFeedback.feedbackoptionsecond}</span>
            <span>{singleFeedback.feedbackoptionthird}</span>
            <span>{singleFeedback.feedbackoptionfouth}</span>
          </div>
        ))}
        <div className="feedback-table-btn-card">
          <button
            onClick={() => onSaveFeedbackQuestionOneLocalStorage(feedback)}
          >
            Save
          </button>
          <button onClick={onPostFeedbackQuestions}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTable;
