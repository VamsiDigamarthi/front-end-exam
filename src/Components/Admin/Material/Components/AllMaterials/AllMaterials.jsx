import React from "react";
import "./AllMaterials.css";
import Header from "../../../../Header/Header";
import { useAllMaterialsHook } from "./AllMaterials.hook";
import OpenPdf from "../OpenPdf/OpenPdf";
const AllMaterials = () => {
  const {
    profile,
    colors,
    uniqueCourseName,
    filterMaterials,
    onFilterMaterialsBasedOnCourse,
    onShowPdf,
    onOpenModal,
    singleMaterial,
    setOnOpenModal,
  } = useAllMaterialsHook();
  //   console.log(allMaterials);
  return (
    <div className="all-materials">
      <Header name={profile?.name} email={profile?.email} />
      <div className="all-materials-main-card">
        <div className="all-materials-inner-card">
          <div className="all-materials-select-card">
            <select onChange={onFilterMaterialsBasedOnCourse} name="courseName">
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
          <div className="all-materials-inner-show-card">
            {filterMaterials?.map((material, index) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              const backgroundColor = colors[randomIndex];
              return (
                <div
                  key={index}
                  className="single-material-card"
                  style={{ backgroundColor: backgroundColor }}
                  onClick={() => onShowPdf(material)}
                >
                  <h5>{material.courseName}</h5>
                  <h4>{material.topic}</h4>
                  <div>
                    <h5>{material.selectType}</h5>
                    <h5>{material.availableOn}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {onOpenModal && (
        <OpenPdf
          material={singleMaterial}
          setAddTodoModalOpenState={setOnOpenModal}
        />
      )}
    </div>
  );
};

export default AllMaterials;
