import React from "react";
import "./StudentMaterial.css";
import Header from "../../Header/Header";
import { useStundetMaterials } from "./StudentMaterial.hook";
import OpenPdf from "../../Admin/Material/Components/OpenPdf/OpenPdf";
const StudentMaterial = () => {
  const {
    profile,
    colors,
    onOpenModal,
    singleMaterial,
    filterMaterials,
    onShowPdf,
    setOnOpenModal,
  } = useStundetMaterials();
  return (
    <div className="all-materials">
      <Header name={profile?.name} email={profile?.email} />
      <div className="all-materials-main-card">
        <div className="all-materials-inner-card">
          <h2>Materials</h2>
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

export default StudentMaterial;
