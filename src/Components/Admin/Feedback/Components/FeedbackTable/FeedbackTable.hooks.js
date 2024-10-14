export const useFeedbackTable = () => {
  const onSaveFeedbackQuestionOneLocalStorage = (feedbackQuestionOne) => {
    localStorage.setItem(
      "feedbackQuestionOne",
      JSON.stringify(feedbackQuestionOne)
    );
    alert("Feedback Question One Local Storage Updated Success ");
  };

  return {
    onSaveFeedbackQuestionOneLocalStorage,
  };
};
