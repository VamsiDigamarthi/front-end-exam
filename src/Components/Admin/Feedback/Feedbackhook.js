import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminResultData } from "../../../Redux/features/ResultSection";
import { API } from "../../../Core/urls";

export const useFeedbackHook = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const { reResultData } = useSelector((state) => state?.resultData);
  // initially which form display
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // store which test this feedback added
  const [testDetails, setTestDetails] = useState({
    testId: "",
    course: "",
    testUniqueId: "",
  });

  // main state store testIds with feedbackQuestions
  const [feedback, setFeedback] = useState([]);

  // store feedback wuestions
  const [feedbackQuestion, setFeedbackQuestion] = useState({
    feedbackquestion: "",
    feedbackoptionone: "",
    feedbackoptionsecond: "",
    feedbackoptionthird: "",
    feedbackoptionfouth: "",
  });

  const onChangeFeedbackFrom = (e) => {
    setFeedbackQuestion({
      ...feedbackQuestion,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(adminResultData({ token }));
  }, [dispatch, token]);

  // fetch if any data store in local storage
  useEffect(() => {
    let testId = JSON.parse(localStorage.getItem("feedbackTestid"));
    let feedbackLocalStoreQuestion = JSON.parse(
      localStorage.getItem("feedbackQuestionOne")
    );

    if (testId) {
      setTestDetails(testId);
      setShowFeedbackForm(true);
    }
    if (feedbackLocalStoreQuestion) {
      setFeedback(feedbackLocalStoreQuestion);
    }
  }, []);

  // store test id in local store and change forms this storage fetch event page reload
  const handleToggleFeedbackForm = (e) => {
    setShowFeedbackForm(!showFeedbackForm);
    localStorage.setItem("feedbackTestid", JSON.stringify(testDetails));
  };

  // feedback form save button click this func call

  const onAddFeedBackQuestion = () => {
    if (feedbackQuestion?.feedbackquestion === "") {
      alert("Please Enter a feedback question to add");
    }
    setFeedback([
      ...feedback,
      {
        ...feedbackQuestion,
      },
    ]);
    setFeedbackQuestion({
      feedbackquestion: "",
      feedbackoptionone: "",
      feedbackoptionsecond: "",
      feedbackoptionthird: "",
      feedbackoptionfouth: "",
    });
  };

  // post feedback questions

  const onPostFeedbackQuestions = () => {
    const body = {
      testId: testDetails.testId,
      course: testDetails.course,
      testUniqueId: testDetails.testUniqueId,
      feedbackQuestions: feedback,
    };
    API.post("/admin/feed-backs", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("feedbackTestid");
        localStorage.removeItem("feedbackQuestionOne");
        setShowFeedbackForm(false);
        setFeedback([]);
        setTestDetails({
          testId: "",
          course: "",
          testUniqueId: "",
        });
        alert("Feedback questions added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add feedback questions");
      });
  };

  return {
    profile,
    reResultData,
    setTestDetails,
    testDetails,
    showFeedbackForm,
    handleToggleFeedbackForm,
    onChangeFeedbackFrom,
    feedbackQuestion,
    onAddFeedBackQuestion, // feedback form save btn function
    feedback, // store all feedback data to display table
    onPostFeedbackQuestions, // finally store the feedback data to database
  };
};
