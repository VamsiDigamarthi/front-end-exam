import React from "react";
import "./SelectTestId.css";
const SelectTestId = ({
  setTestId,
  reResultData,
  handleToggleFeedbackForm,
}) => {
  const onChangeTestId = (e) => {
    const selectedTest = reResultData.find(
      (singleTest) => singleTest._id === e.target.value
    );
    if (!selectedTest) return;
    const { _id: testUniqueId, testId, courseName: course } = selectedTest;
    setTestId({ testUniqueId, testId, course });
  };

  return (
    <div className="selected-testid-main">
      <select onChange={onChangeTestId} name="testId">
        <option disabled hidden selected>
          SELECT TEST ID
        </option>
        {reResultData?.map((each) => (
          <option value={each._id}>{each.testId}</option>
        ))}
      </select>
      <button onClick={handleToggleFeedbackForm}>Save</button>
    </div>
  );
};

export default SelectTestId;
