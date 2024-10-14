import React from "react";
import "./AddExam.css";

import { useAddExam } from "../../../utils/CustomHook/AdminAddExam";
import Header from "../../Header/Header";
const AddExam = () => {
  const {
    mainTestData,
    handleInputChange,
    onBatchNameChange,
    restudents,
    reAllExamSections,
    sections,
    addMoreSections,
    onDeleteSingleSection,
    handleSectionChange,
    handleSubmit,
    setMainTestData,
    profile,
  } = useAddExam();
  return (
    <div className="addp-exam-container">
      <Header name={profile?.name} email={profile?.email} />
      <div className="add-exam-container">
        <div className="test-id-card">
          <div className="test-id-inner-crad">
            <span>Test-Id</span>
            <span>{mainTestData?.testId}</span>
          </div>
        </div>
        <div className="add-exam-all-form-card">
          <div className="add-exam-first-form-card">
            <div className="add-exam-first-form-inner-card">
              <div className="add-exam-first-form-inner-input-card">
                <label>Batch Name</label>
                <select name="batchName" onChange={onBatchNameChange}>
                  <option disabled hidden selected>
                    SELECT BATCH NAME
                  </option>
                  {restudents?.map((each, index) => (
                    <option key={index} value={each.batchName}>
                      {each.batchName}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-exam-first-form-inner-input-card">
                <label>Course</label>
                <input
                  type=""
                  value={mainTestData.courseName}
                  placeholder="Course"
                  readOnly
                />
              </div>
              <div className="add-exam-first-form-inner-input-card">
                <label>Passkey</label>
                <input
                  name="passKey"
                  value={mainTestData.passKey}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Passkey"
                />
              </div>
            </div>
            <div className="add-exam-first-form-inner-card">
              <div className="add-exam-first-form-inner-input-card">
                <label>Purpose</label>
                <input
                  name="purpose"
                  value={mainTestData.purpose}
                  onChange={handleInputChange}
                  placeholder="Enter Purpose"
                  type="text"
                />
              </div>
              <div className="add-exam-first-form-inner-input-card">
                <label>Date</label>
                <input
                  name="date"
                  value={mainTestData.date}
                  onChange={handleInputChange}
                  type="date"
                  placeholder="Course"
                />
              </div>
              <div className="add-exam-first-form-inner-input-card">
                <label>Time</label>
                <input
                  value={mainTestData.time}
                  onChange={handleInputChange}
                  name="time"
                  type="time"
                  placeholder="Passkey"
                />
              </div>
            </div>
            <div className="add-exam-first-form-inner-card">
              <div className="add-exam-first-form-inner-input-card">
                <label>ResultType</label>
                <select name="resultType" onChange={handleInputChange}>
                  <option disabled hidden selected>
                    SELECT RESULT TYPE
                  </option>
                  {/* {initiallyStoreAllExamsDetails?.map((exam, key) => ( */}
                  <option value="hidden">Hidden</option>
                  <option value="display">Display</option>
                </select>

                {/* ))} */}
              </div>
              <div className="add-exam-first-form-inner-input-card">
                <label>Levels</label>
                <select name="level" onChange={handleInputChange}>
                  <option disabled hidden selected>
                    SELECT EXAM LEVEL
                  </option>
                  {/* {initiallyStoreAllExamsDetails?.map((exam, key) => ( */}
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
          <h3>Exam Section</h3>
          {sections.map((_, index) => (
            <Section
              key={index}
              index={index}
              lastElement={sections.length}
              sectionData={mainTestData.examsSections?.[index] || {}}
              // handleSectionChange={handleSectionChange}
              addMoreSections={addMoreSections}
              handleSectionChange={handleSectionChange}
              initiallyStoreAllExamsDetails={reAllExamSections}
              onDeleteSingleSection={(e) => onDeleteSingleSection(index, e)}
            />
          ))}
          {/*  */}
          <div className="add-exam-description-card">
            <textarea
              value={mainTestData.description}
              onChange={handleInputChange}
              placeholder="Enter Any Description"
              name="description"
            ></textarea>
          </div>
          <div className="add-exam-upload-btn-card">
            <button onClick={handleSubmit}>Upload </button>
            <button onClick={() => setMainTestData({})}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  index,
  addMoreSections,
  lastElement,
  onDeleteSingleSection,
  initiallyStoreAllExamsDetails,
  handleSectionChange,
  sectionData,
}) => {
  const addMore = (index) => {
    addMoreSections(index);
  };
  return (
    <div className="add-exam-first-form-card">
      <h2>Section {index + 1}</h2>
      <div className="add-exam-first-form-inner-card">
        <div className="add-exam-first-form-inner-input-card">
          <label>Exam Id</label>
          <select name="examId" onChange={(e) => handleSectionChange(index, e)}>
            <option disabled hidden selected>
              SELECT EXAM ID
            </option>
            {initiallyStoreAllExamsDetails?.map((exam, key) => (
              <option key={key} value={exam.examId}>
                {exam.examId} - {exam.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="add-exam-first-form-inner-input-card">
          <label>Language</label>
          <input
            type="text"
            value={sectionData.courseName || ""}
            readOnly
            placeholder="123"
          />
        </div>
        <div className="add-exam-first-form-inner-input-card">
          <label>Topic</label>
          <input
            type="text"
            value={sectionData.topic || ""}
            readOnly
            name="topic"
            placeholder="Topic"
          />
        </div>
      </div>
      <div className="add-exam-first-form-inner-card">
        <div className="add-exam-first-form-inner-input-card">
          <label>Total Mark</label>
          <input
            type="text"
            name="totalMarks"
            value={sectionData.totalMarks || ""}
            onChange={(e) => handleSectionChange(index, e)}
            placeholder="123"
          />
        </div>
        <div className="add-exam-first-form-inner-input-card">
          <label>Cut-Off Marks</label>
          <input
            name="cutOff"
            value={sectionData.cutOff || ""}
            onChange={(e) => handleSectionChange(index, e)}
            type="text"
            placeholder="Cut-Off Marks"
          />
        </div>
      </div>
      <div className="add-exam-each-section-btn-card">
        <button onClick={() => addMore(index)}>Add More Section</button>
        {lastElement !== 1 && (
          <>
            {index === lastElement - 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  onDeleteSingleSection(e);
                }}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddExam;
