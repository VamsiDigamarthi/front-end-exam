import React from "react";
import "./HomeTable.css";
import CustomTable from "../../../../utils/Components/CustomTable/CustomTable";
import { useHomeTableHook } from "./HomeTableHook";
import CustomStudentsList from "../../../../utils/Components/CustomStudentsList/CustomStudentsList";
const HomeTable = () => {
  const {
    examHeaders,
    reResultData,
    examBody,
    singleExamSection,
    filterSingleExamSection,
  } = useHomeTableHook();
  console.log(reResultData);
  return (
    <div className="home-table-main">
      <div className="home-table-first">
        <CustomTable
          tableTitle="Exam Sections"
          headers={examHeaders}
          examBody={examBody}
          examData={reResultData}
          clickSingleItem={filterSingleExamSection}
        />
      </div>
      <div className="home-table-second">
        <CustomStudentsList
          batchName={singleExamSection?.batchName}
          course={singleExamSection?.courseName}
          purpose={singleExamSection?.purpose}
          date={singleExamSection?.date}
          time={singleExamSection?.time}
          description={singleExamSection?.description}
          students={singleExamSection?.students}
        />
      </div>
    </div>
  );
};

export default HomeTable;
