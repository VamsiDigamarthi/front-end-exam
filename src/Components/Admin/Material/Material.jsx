import React from "react";
import "./Material.css";
import Header from "../../Header/Header";
import { useMaterial } from "./Material.hook";
const Material = () => {
  const {
    profile,
    onAddMaterialFunc,
    addMaterialState,
    handleFile,
    onClearData,
    onMaterialUploadFun,
    showErrorMsgToUploadPdf,
    uniqueCourseName,
  } = useMaterial();
  console.log(uniqueCourseName);
  return (
    <div className="material-main">
      <Header name={profile?.name} email={profile?.email} />
      <div className="add-material-main-card">
        <div className="add-material-inner-card">
          <h2>Add Materials</h2>
          <div className="add-material-input-card">
            <div className="add-materisl-single-input-card">
              <select
                id={`${
                  showErrorMsgToUploadPdf?.courseName && "validation-error"
                }`}
                name="courseName"
                onChange={onAddMaterialFunc}
              >
                <option disabled hidden selected>
                  SELECT COURSE NAME
                </option>
                {uniqueCourseName?.map((course, key) => (
                  <option key={key} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-materisl-single-input-card">
              <input
                id={`${showErrorMsgToUploadPdf?.topic && "validation-error"}`}
                type="text"
                value={addMaterialState.topic}
                name="topic"
                onChange={onAddMaterialFunc}
                placeholder="Enter Topic Name"
              />
            </div>
            <div className="add-materisl-single-input-card">
              <input
                id={`${showErrorMsgToUploadPdf?.passkey && "validation-error"}`}
                value={addMaterialState.passkey}
                name="passkey"
                onChange={onAddMaterialFunc}
                placeholder="Enter Passkey"
                type="text"
              />
            </div>
          </div>
          <div className="add-material-input-card">
            <div className="add-materisl-single-input-card">
              <input
                id={`${showErrorMsgToUploadPdf?.pdf && "validation-error"}`}
                className="custom-file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFile}
              />
            </div>
            <div className="add-materisl-single-input-card">
              <select
                id={`${
                  showErrorMsgToUploadPdf?.selectType && "validation-error"
                }`}
                name="selectType"
                onChange={onAddMaterialFunc}
              >
                <option disabled hidden selected>
                  SELECT TYPE OF MATERIALS
                </option>
                <option>Material</option>
                <option>Note Book</option>
              </select>
            </div>
            <div className="add-materisl-single-input-card">
              <input
                id={`${
                  showErrorMsgToUploadPdf?.availableOn && "validation-error"
                }`}
                value={addMaterialState.availableOn}
                name="availableOn"
                onChange={onAddMaterialFunc}
                placeholder="Enter Passkey"
                className="date-input"
                type="date"
              />
            </div>
          </div>
          <div className="add-material-input-card">
            <textarea
              name="description"
              value={addMaterialState.description}
              onChange={onAddMaterialFunc}
              placeholder="Enter Description"
            ></textarea>
          </div>
          <div className="material-add-form-btn-card">
            <button onClick={onMaterialUploadFun}>Upload</button>
            <button onClick={onClearData}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Material;
