import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../Core/urls";
import { useNavigate } from "react-router-dom";

export const useQuizeNewHook = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const [initiallyStoreAllQuize, setInitiallyStoreAllQuize] = useState([]);
  const [storeUserSelectCourseName, setStoreUserSelectCourseName] =
    useState("");
  const [storeUserSelectTopicName, setStoreUserSelectTopicName] = useState("");
  const [storeUniqueCourseValue, setStoreUniqueCourseValue] = useState([]);
  const [storeUniqueTopicValue, setStoreUniqueTopicValue] = useState([]);
  const [startQuize, setStartQuize] = useState(false);
  const [finalQuizeQuestions, setFinalQuizeQuestions] = useState([]);

  useEffect(() => {
    API.get(`/quiz/all-quize/${profile?.course}`)
      .then((res) => {
        console.log(res.data);
        setInitiallyStoreAllQuize(res.data);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  }, [profile]);

  //   find unique course Names

  useEffect(() => {
    const uniqueCourseValue = () => {
      const unique = [
        ...new Set(initiallyStoreAllQuize.map((item) => item.courseName)),
      ];
      setStoreUniqueCourseValue(unique);
    };
    initiallyStoreAllQuize && uniqueCourseValue();
  }, [initiallyStoreAllQuize]);

  const onUserSelectCourseName = (e) => {
    setStoreUserSelectCourseName(e.target.value);
    let filterCourseWiseData = initiallyStoreAllQuize?.filter(
      (singleData) => singleData.courseName === e.target.value
    );
    const unique = [...new Set(filterCourseWiseData.map((item) => item.topic))];
    setStoreUniqueTopicValue(unique);
    setStoreUserSelectTopicName("");
  };

  const onUserSelectTopicName = (e) => {
    setStoreUserSelectTopicName(e.target.value);
  };

  const onQuizeStatedFun = () => {
    if (storeUserSelectCourseName && storeUserSelectTopicName) {
      const onFilterQuestion = initiallyStoreAllQuize?.filter(
        (each) =>
          each.courseName === storeUserSelectCourseName &&
          each.topic === storeUserSelectTopicName
      );
      console.log(onFilterQuestion);
      setStartQuize(true);
      setFinalQuizeQuestions(onFilterQuestion);
      //   return true;
    } else {
      alert("Please select a Course and Topic");
    }
  };

  return {
    profile,
    storeUniqueCourseValue,
    onUserSelectCourseName,
    onUserSelectTopicName,
    storeUniqueTopicValue, //  STORE ALL UNIQUE TOPIC VALUES
    onQuizeStatedFun,
    initiallyStoreAllQuize, // this check for if quize question not provided
    startQuize, // check start quize or not
    finalQuizeQuestions, // final quize questions to be shown to user after start button clicked.
  };
};
