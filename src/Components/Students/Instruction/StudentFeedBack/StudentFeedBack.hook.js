import { useEffect, useState } from "react";
import { API } from "../../../../Core/urls";

export const useStudentFeedBackHook = ({ examId, userEmail }) => {
  const [storeFeedBack, setStoreFeedBack] = useState([]); // Store feedback questions and options
  const [storeUserAnswers, setStoreUserAnswers] = useState([]); // Store user answers

  const [alredyFeedbackExist, setAlreadyFeedbackExist] = useState(false);

  const firstCheckFeedBackPostOrNot = () => {
    API.get(`/feedback/${examId}/${userEmail}`)
      .then((res) => {
        if (res.data?.length > 0) {
          setAlreadyFeedbackExist(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    firstCheckFeedBackPostOrNot();
    API.get(`/feedback/${examId}`)
      .then((res) => {
        setStoreFeedBack(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [examId, userEmail]);

  const onUserPickAnswer = (data) => {
    const updatedUserAnswers = storeUserAnswers.map((answer) => {
      if (answer.feedbackquestion === data.feedbackquestion) {
        // Update existing answer
        return { ...answer, pickedOption: data.pickedOption };
      }
      return answer;
    });

    // Check if question already exists in the state
    const isQuestionAnswered = storeUserAnswers.some(
      (answer) => answer.feedbackquestion === data.feedbackquestion
    );

    if (!isQuestionAnswered) {
      // Add new answer if the question hasn't been answered yet
      setStoreUserAnswers([...storeUserAnswers, data]);
    } else {
      // Update existing answers
      setStoreUserAnswers(updatedUserAnswers);
    }
  };

  const onFeedBackSubmited = (e) => {
    e.preventDefault();
    API.post("/feedback/added", {
      testId: examId,
      email: userEmail,
      feedBacks: storeUserAnswers,
    })
      .then((res) => {
        console.log(res.data);
        setAlreadyFeedbackExist(true);
        alert("Feedback submitted successfully!");
      })
      .catch((e) => {
        console.error(e);
        alert("Failed to submit feedback.");
      });
  };

  return {
    storeFeedBack,
    onUserPickAnswer,
    storeUserAnswers,
    onFeedBackSubmited,
    alredyFeedbackExist,
  };
};
