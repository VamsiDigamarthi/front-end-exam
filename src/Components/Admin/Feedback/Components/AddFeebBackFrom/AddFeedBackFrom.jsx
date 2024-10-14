import React from "react";
import "./AddFeedBackFrom.css";

const AddFeedBackForm = ({
  onChangeFeedbackFrom,
  feedbackQuestion,
  onAddFeedBackQuestion,
  testId,
}) => (
  <div className="add-feedback-form-card">
    <div>
      <h3>{testId?.testId}</h3>
      <h3>{testId?.course}</h3>
    </div>
    {[
      "feedbackquestion",
      "feedbackoptionone",
      "feedbackoptionsecond",
      "feedbackoptionthird",
      "feedbackoptionfouth",
    ].map((name, index) => (
      <input
        key={name}
        type="text"
        name={name}
        placeholder={`Enter ${
          index === 0 ? "Your First Question" : `Option ${index}`
        }`}
        onChange={onChangeFeedbackFrom}
        value={feedbackQuestion?.[name]}
      />
    ))}
    <button onClick={onAddFeedBackQuestion}>Save</button>
  </div>
);

export default AddFeedBackForm;
