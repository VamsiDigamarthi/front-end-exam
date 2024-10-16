import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminBatchWiseStudent } from "../../Redux/features/BatchWiseStudentData";
import { adminAllExamSections } from "../../Redux/features/allExamSection";
import { convertTo12HourFormat } from "../timeconvertion";
import { API } from "../../Core/urls";
// import { adminBatchWiseStudent } from "../../../Redux/features/BatchWiseStudentData";
// import { adminAllExamSections } from "../../../Redux/features/allExamSection";
// import { convertTo12HourFormat } from "../../../utils/timeconvertion";

export const useAddExam = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenWithUserRole);
  const { restudents } = useSelector((state) => state.batchWiseStudent);
  const { profile } = useSelector((state) => state.profile);

  const [sections, setSections] = useState([{ index: 0 }]);
  const { reAllExamSections } = useSelector((state) => state.allExamSection);

  const [mainTestData, setMainTestData] = useState({
    testId: "",
    courseName: "",
    date: "",
    time: "",
    passKey: "",
    purpose: "",
    description: "",
    resultType: "",
    level: "",
    examsSections: [
      {
        examuniqueId: "",
        examId: "",
        totalMarks: "",
        cutOff: "",
        courseName: "",
        topic: "",
      },
    ],
    students: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!mainTestData.courseName) {
      newErrors.courseName = "Batch ID is required.";
    }
    if (!mainTestData.date) {
      newErrors.date = "Date is required.";
    }
    if (!mainTestData.time) {
      newErrors.time = "Time is required.";
    }
    if (!mainTestData.passKey) {
      newErrors.passKey = "Pass Key is required.";
    }
    if (!mainTestData.purpose) {
      newErrors.purpose = "Purpose is required.";
    }
    if (!mainTestData.resultType) {
      newErrors.resultType = "Result Type is required.";
    }
    if (!mainTestData.level) {
      newErrors.level = "Level is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  useEffect(() => {
    dispatch(adminBatchWiseStudent({ token }));
    dispatch(adminAllExamSections({ token }));
  }, [dispatch, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === "time") {
    //   const formattedTime = convertTo12HourFormat(value);
    //   setMainTestData((prevData) => ({
    //     ...prevData,
    //     [name]: formattedTime,
    //   }));
    // } else {
    setMainTestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // }
  };

  const onBatchNameChange = (e) => {
    const filterBatchWiseStudent = restudents?.filter(
      (batchWiseStudent) => batchWiseStudent.batchName === e.target.value
    );
    setMainTestData((prevData) => ({
      ...prevData,
      testId: e.target.value + " " + Math.floor(Math.random() * 90) + 10,
      // students: filterBatchWiseStudent?.[0]?.users,
      batchName: e.target.value,
      courseName: filterBatchWiseStudent?.[0]?.course,
      students: filterBatchWiseStudent[0]?.users?.map((student) => {
        return {
          ...student,
          studentId: student._id, // Add studentId field with the value of _id
        };
      }),
    }));
  };

  const addSectionData = () => {
    setMainTestData({
      ...mainTestData,
      examsSections: [
        ...mainTestData.examsSections,
        {
          examuniqueId: "",
          examId: "",
          totalMarks: "",
          cutOff: "",
          resultType: "",
          courseName: "",
          topic: "",
        },
      ],
    });
  };

  const addMoreSections = (index) => {
    console.log("add more sections");
    // console.log(sections[0]?.index);
    // if (sections[0]?.index < 3) {
    setSections([...sections, { index: index + 1 }]);
    addSectionData();
    // }
  };

  const onDeleteSingleSection = (indexToDelete, e) => {
    // console.log(indexToDelete);
    e.preventDefault(); // Prevent form submission
    const updatedSections = mainTestData.examsSections.filter(
      (section, index) => index !== indexToDelete
    );
    // console.log(sections);
    let newArray = sections.filter((each) => each.index !== indexToDelete);
    // console.log(newArray);
    setSections(newArray);

    setMainTestData({
      ...mainTestData,
      examsSections: updatedSections,
    });
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSections = mainTestData.examsSections.map((section, i) => {
      if (i === index) {
        if (name === "examId") {
          const selectedExam = reAllExamSections.find(
            (exam) => exam.examId === value
          );
          return {
            ...section,
            examId: value,
            examuniqueId: selectedExam?._id || "",
            courseName: selectedExam?.courseName || "",
            topic: selectedExam?.topic || "",
            level: selectedExam?.level || "",
          };
        }
        return { ...section, [name]: value };
      }
      return section;
    });

    setMainTestData({ ...mainTestData, examsSections: updatedSections });
  };

  // post data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      API.post("/admin/add-exams", mainTestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          alert("Test added successfully");
        })
        .catch((e) => {
          console.log(e);
          alert(e?.response?.data?.message);
        });
    } else {
      console.log("validation fialed");
    }
  };

  return {
    mainTestData,
    handleInputChange,
    onBatchNameChange,
    restudents,
    reAllExamSections,
    sections,
    setSections,
    addMoreSections,
    onDeleteSingleSection,
    handleSectionChange,
    handleSubmit,
    setMainTestData,
    profile,
    errors,
  };
};
