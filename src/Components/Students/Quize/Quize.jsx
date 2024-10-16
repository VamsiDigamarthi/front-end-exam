import React from "react";
import "./Quize.css";

import { useQuizeNewHook } from "./QuizeNew.hook";
import Header from "../../Header/Header";
import StartQuize from "./Components/StartQuize/StartQuize";
const Quize = () => {
  const {
    profile,
    storeUniqueCourseValue,
    onUserSelectCourseName,
    onUserSelectTopicName,
    storeUniqueTopicValue,
    onQuizeStatedFun,
    initiallyStoreAllQuize,
    startQuize,
    finalQuizeQuestions,
  } = useQuizeNewHook();
  return (
    <div className="quize-main">
      <Header name={profile?.name} email={profile?.email} />
      <div className="quize-inner-card">
        {startQuize ? (
          <div className="start-quize">
            <StartQuize finalQuizeQuestions={finalQuizeQuestions} />
          </div>
        ) : (
          <>
            {initiallyStoreAllQuize?.length <= 0 ? (
              <div>
                <h2>Quize Qustion Not Provided in Your Course</h2>
              </div>
            ) : (
              <div className="quize-selected-card">
                <select onChange={onUserSelectCourseName}>
                  <option value="" selected hidden disabled>
                    SELECT COURSE
                  </option>
                  {storeUniqueCourseValue?.map((each) => (
                    <option>{each}</option>
                  ))}
                </select>
                <select onChange={onUserSelectTopicName}>
                  <option value="" selected hidden disabled>
                    SELECT TOPIC
                  </option>
                  {storeUniqueTopicValue?.map((each) => (
                    <option>{each}</option>
                  ))}
                </select>
                <button onClick={onQuizeStatedFun}>Start Quize</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quize;
