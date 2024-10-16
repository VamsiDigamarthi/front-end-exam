import { useEffect, useState } from "react";

export const useStartQuizeHook = () => {
  const [finalQuizeQuestions, setFinalQuizeQuestions] = useState([
    {
      _id: "670f9aefabbff513e3824948",
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      CorrectAnswer: "Paris",
      DefaultMarks: 1,
      DefaultTimeToSolve: 60,
      Difficulty_Level: "Easy",
      QuestionType: "MCQ",
      courseName: "Geography",
      examId: "exam1",
      level: "Beginner",
      topic: "Capitals",
      createdAt: "2024-10-16T10:52:31.339Z",
      updatedAt: "2024-10-16T10:52:31.339Z",
      __v: 0,
    },
    {
      _id: "670f9aefabbff513e3824949",
      question: "Which element is represented by the chemical symbol 'O'?",
      answers: ["Oxygen", "Gold", "Osmium", "Oganesson"],
      CorrectAnswer: "Oxygen",
      DefaultMarks: 1,
      DefaultTimeToSolve: 60,
      Difficulty_Level: "Easy",
      QuestionType: "MCQ",
      courseName: "Chemistry",
      examId: "exam2",
      level: "Beginner",
      topic: "Elements",
      createdAt: "2024-10-16T10:52:31.339Z",
      updatedAt: "2024-10-16T10:52:31.339Z",
      __v: 0,
    },
    {
      _id: "670f9aefabbff513e3824950",
      question: "Who wrote 'Pride and Prejudice'?",
      answers: [
        "Jane Austen",
        "Mark Twain",
        "George Orwell",
        "Charles Dickens",
      ],
      CorrectAnswer: "Jane Austen",
      DefaultMarks: 1,
      DefaultTimeToSolve: 60,
      Difficulty_Level: "Medium",
      QuestionType: "MCQ",
      courseName: "Literature",
      examId: "exam3",
      level: "Intermediate",
      topic: "Authors",
      createdAt: "2024-10-16T10:52:31.339Z",
      updatedAt: "2024-10-16T10:52:31.339Z",
      __v: 0,
    },
    {
      _id: "670f9aefabbff513e3824951",
      question: "What is the largest planet in our solar system?",
      answers: ["Earth", "Jupiter", "Mars", "Venus"],
      CorrectAnswer: "Jupiter",
      DefaultMarks: 1,
      DefaultTimeToSolve: 60,
      Difficulty_Level: "Easy",
      QuestionType: "MCQ",
      courseName: "Astronomy",
      examId: "exam4",
      level: "Beginner",
      topic: "Planets",
      createdAt: "2024-10-16T10:52:31.339Z",
      updatedAt: "2024-10-16T10:52:31.339Z",
      __v: 0,
    },
    {
      _id: "670f9aefabbff513e3824952",
      question: "In which year did World War II end?",
      answers: ["1945", "1939", "1918", "1950"],
      CorrectAnswer: "1945",
      DefaultMarks: 1,
      DefaultTimeToSolve: 60,
      Difficulty_Level: "Medium",
      QuestionType: "MCQ",
      courseName: "History",
      examId: "exam5",
      level: "Intermediate",
      topic: "World Wars",
      createdAt: "2024-10-16T10:52:31.339Z",
      updatedAt: "2024-10-16T10:52:31.339Z",
      __v: 0,
    },
  ]);

  const [mcqCount, setMcqCount] = useState(0);
  const [userAnswerState, setUserAnswerState] = useState(null);

  const [storeQuestionToChangeGreenColor, setStorequestionToChangeGreenColor] =
    useState([]);

  const [totalScore, setTotalScore] = useState(0);
  const [afterQuizeCompleted, setAfterQuizeCompleted] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [viewedQuestionsArray, setViewedQuestionsArray] = useState([]);
  const onCheckIssingleDigitOrNot = (digit) => {
    if (digit >= 0 && digit < 10) {
      return `0${digit}`;
    } else {
      return `${digit}`;
    }
  };

  const onRightSideClickAnyRandomNumber = (number) => setMcqCount(number);

  const userClickAnsweButton = (answer) => {
    if (answer !== null) {
      setStorequestionToChangeGreenColor([
        ...storeQuestionToChangeGreenColor,
        finalQuizeQuestions?.[mcqCount],
      ]);

      setTotalScore((prev) =>
        finalQuizeQuestions?.[mcqCount].CorrectAnswer === answer
          ? prev + finalQuizeQuestions?.[mcqCount].DefaultMarks
          : prev
      );
    } else {
      // setNotAttemptAnswerShowQuestion([
      //   ...notAttemptAnswerShowQuestion,
      //   initiallyStoreSectionData?.questions?.[mcqCount],
      // ]);
    }
  };

  const onAnswerClick = (asnwer) => {
    setUserAnswerState(asnwer);
    userClickAnsweButton(asnwer);
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [mcqCount]: asnwer,
    }));
    //  change color user previously check answer
  };

  const onHandelNextQuestion = () => {
    if (mcqCount < finalQuizeQuestions?.length - 1) {
      setMcqCount((pre) => pre + 1);
    }
  };

  const onSubmiteQuize = () => {
    setAfterQuizeCompleted(true);
  };

  return {
    finalQuizeQuestions,
    mcqCount,
    setMcqCount,
    onCheckIssingleDigitOrNot,
    onAnswerClick,
    selectedAnswers,
    userAnswerState,
    onHandelNextQuestion,
    storeQuestionToChangeGreenColor,
    setViewedQuestionsArray,
    viewedQuestionsArray,
    onRightSideClickAnyRandomNumber,
    onSubmiteQuize,
    totalScore,
    afterQuizeCompleted,
  };
};
