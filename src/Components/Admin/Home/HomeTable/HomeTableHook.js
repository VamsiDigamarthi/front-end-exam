import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useHomeTableHook = () => {
  const examHeaders = [
    { title: "Test", width: "20%" },
    { title: "Topic", width: "20%" },
    { title: "Date & Time", width: "20%" },
    { title: "Purpose", width: "18%" },
    { title: "Level", width: "6%" },
    { title: "Status", width: "15%" },
  ];

  const examBody = [
    {
      single: false,
      width: "20%",
      list: [
        {
          title: "testId",
        },
        {
          title: "courseName",
        },
      ],
    },
    {
      single: true,
      width: "21%",
      title: "batchName",
    },
    {
      single: false,
      width: "20%",
      list: [
        {
          title: "date",
        },
        {
          title: "time",
        },
      ],
    },
    {
      single: true,
      title: "purpose",
      width: "18%",
    },
    {
      single: true,
      title: "level",
      width: "6%",
    },
    {
      single: true,
      title: "Status",
      width: "15%",
    },
  ];
  const { reResultData } = useSelector((state) => state?.resultData);

  const [singleExamSection, setSingleExamSection] = useState(null);

  useEffect(() => {
    reResultData && setSingleExamSection(reResultData[0]);
  }, [reResultData]);

  const filterSingleExamSection = (id) => {
    setSingleExamSection(reResultData?.filter((exam) => exam._id === id)[0]);
  };

  return {
    examHeaders,
    reResultData,
    examBody,
    singleExamSection,
    filterSingleExamSection,
  };
};
