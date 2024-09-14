import React, { useEffect, useRef, useState } from "react";
import "./Exam.css";
// import { MdMoreTime } from "react-icons/md";
import { useLocation } from "react-router-dom";
const Exam = () => {
  const location = useLocation();
  // console.log(location.state?.sData);
  // console.log(location.state?.sData?.sections);
  const [mainQuestionData, setMainQuestionData] = useState(null);
  console.log(location.state?.sData?.sections);
  // store time values
  const [totalTime, setTotalTime] = useState(null);
  const [time, setTime] = useState(null);

  const [sectionNumber, setSectionNumber] = useState(1); // store what section present user in

  // single question taken
  const [mcqCount, setMcqCount] = useState(0);
  const [initiallyStoreSectionData, setInitiallyStoreSectionData] =
    useState(null);

  //   store single section values when user navigate to one section to another section store that id with courseName
  const [storeSectionUserClickValue, setStoreSectionUserClickValue] = useState(
    {}
  );
  // store ids user see the question but not attempt any asnwer like ""orange"" color
  const [notAttemptAnswerShowQuestion, setNotAttemptAnswerShowQuestion] =
    useState([]);

  //   store section value and corresponding users answer also ******************************

  const [storeSectionWiseUserAnswer, setStoreSectionWiseUserAnswer] = useState(
    []
  );

  const [viewedQuestionsArray, setViewedQuestionsArray] = useState([]);

  // store questions when user attempt question to change color
  const [storeQuestionToChangeGreenColor, setStorequestionToChangeGreenColor] =
    useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Helper function to shuffle an array
  // Helper function to shuffle an array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  function distributeQuestions(questions, totalMarks) {
    // Filter questions based on marks
    const oneMarkQuestions = questions.filter((q) => q.DefaultMarks === 1);
    const twoMarkQuestions = questions.filter((q) => q.DefaultMarks === 2);

    // Calculate the number of questions to take for each category
    const oneMarkTarget = Math.floor(totalMarks * 0.7); // 70% one-mark questions
    const twoMarkTarget = Math.ceil((totalMarks * 0.3) / 2); // 30% two-mark questions

    // Shuffle the arrays
    const shuffledOneMark = shuffleArray(oneMarkQuestions);
    const shuffledTwoMark = shuffleArray(twoMarkQuestions);

    // Initialize variables to keep track of selected questions and their total marks
    let selectedQuestions = [];
    let currentMarks = 0;

    // First, try to take the required number of two-mark questions
    let twoMarkCount = 0;
    while (
      twoMarkCount < twoMarkTarget &&
      shuffledTwoMark.length > 0 &&
      currentMarks + 2 <= totalMarks
    ) {
      selectedQuestions.push(shuffledTwoMark.shift()); // Take from the beginning of the shuffled array
      currentMarks += 2;
      twoMarkCount++;
    }

    // Calculate the remaining marks needed
    const remainingMarks = totalMarks - currentMarks;
    const remainingOneMarkTarget = Math.min(remainingMarks, oneMarkTarget);

    // Now, take the required number of one-mark questions
    let oneMarkCount = 0;
    while (
      oneMarkCount < remainingOneMarkTarget &&
      shuffledOneMark.length > 0 &&
      currentMarks + 1 <= totalMarks
    ) {
      selectedQuestions.push(shuffledOneMark.shift()); // Take from the beginning of the shuffled array
      currentMarks += 1;
      oneMarkCount++;
    }

    // Ensure total marks match the required totalMarks
    if (currentMarks < totalMarks) {
      const additionalQuestionsNeeded = totalMarks - currentMarks;
      // Try to add additional one-mark questions if needed
      while (additionalQuestionsNeeded > 0 && shuffledOneMark.length > 0) {
        selectedQuestions.push(shuffledOneMark.shift());
        currentMarks += 1;
        additionalQuestionsNeeded--;
      }
    }

    // Shuffle the selected questions again to avoid bias
    return shuffleArray(selectedQuestions);
  }

  // Main function to process the exam sections
  function processExamData(examData) {
    return examData.map((section) => {
      const totalMarks = parseInt(section.totalMarks, 10);
      const shuffledQuestions = distributeQuestions(
        section.questions,
        totalMarks
      );

      // Create a new section with shuffled questions
      return {
        ...section,
        questions: shuffledQuestions,
      };
    });
  }

  useEffect(() => {
    console.log("dfghjkl;'");
    console.log(document.fullscreenElement);
    const handleFullscreenChange = () => {
      console.log("fun call");
      if (!document.fullscreenElement) {
        console.log("User exited full screen");
        // Call the function to submit exam or notify the user
        // Example: completedExam();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const processedExamData = processExamData(location.state?.sData?.sections);
    // console.log(processedExamData);
    setMainQuestionData(processedExamData);
  }, [location.state?.sData?.sections]);

  useEffect(() => {
    // handleFullScreen();
    if (mainQuestionData) {
      setInitiallyStoreSectionData(mainQuestionData?.[0]); // store initially one section like first section
      setStoreSectionUserClickValue({
        _id: mainQuestionData?.[0]?._id,
        courseName: mainQuestionData?.[0].courseName,
      }); // store single section when user navigate one section to another section

      setStoreSectionWiseUserAnswer([
        ...storeSectionWiseUserAnswer,
        {
          _id: mainQuestionData?.[0]?._id,
          courseName: mainQuestionData?.[0].courseName,
          // topic: storeAllThirthySeventyMarksData[0]?.examsSections?.[0].topic,
          answers: [],
        },
      ]);

      let time = 0;
      mainQuestionData?.forEach((each) => {
        each?.questions?.forEach((question) => {
          // console.log(question.DefaultTimeToSolve);
          time += question?.DefaultTimeToSolve || 0;
        });
      });
      setTotalTime(time);
      setTime(time);
    }
  }, [mainQuestionData]);

  // useEffect(() => {
  //   const timerClre = setInterval(() => {
  //     setTime((prevTime) => {
  //       if (prevTime <= 0) {
  //         clearInterval(timerClre);
  //         console.log("time out");
  //         // setScoreModal(true);
  //         // completedExam();
  //         return 0;
  //       } else {
  //         return prevTime - 1;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(timerClre); // Cleanup the interval on unmount
  // }, [totalTime]);

  const hours = Math.floor(time / 3600);
  // console.log(hours);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  // console.log(initiallyStoreSectionData);
  const onCheckIssingleDigitOrNot = (digit) => {
    if (digit >= 0 && digit < 10) {
      return `0${digit}`;
    } else {
      return `${digit}`;
    }
  };

  // user click answer

  const updateAnswerWithId = (
    answer,
    correctAnswer,
    defaultMarks,
    question
  ) => {
    // console.log("updated answer");
    setStoreSectionWiseUserAnswer((prevAnswers) => {
      console.log(prevAnswers);
      return prevAnswers?.map((section) => {
        if (section._id === storeSectionUserClickValue._id) {
          console.log(section._id, storeSectionUserClickValue._id);
          const updatedAnswers = section?.answers?.map((ans, index) => {
            if (index === mcqCount) {
              return {
                answer,
                correctAnswer,
                defaultMarks,
                question,
                correctMarks: answer === correctAnswer ? defaultMarks : 0,
              };
            }
            return ans;
          });
          console.log(updatedAnswers);
          if (updatedAnswers.length <= mcqCount) {
            updatedAnswers.push({
              answer,
              correctAnswer,
              defaultMarks,
              question,
              correctMarks: answer === correctAnswer ? defaultMarks : 0,
            });
          }
          return { ...section, answers: updatedAnswers };
        }
        return section;
      });
    });
  };

  const userClickAnsweButton = (answer) => {
    if (answer !== null) {
      updateAnswerWithId(
        answer,
        initiallyStoreSectionData?.questions?.[mcqCount]?.CorrectAnswer,
        initiallyStoreSectionData?.questions?.[mcqCount]?.DefaultMarks,
        initiallyStoreSectionData?.questions?.[mcqCount] // entire question
      );
      setStorequestionToChangeGreenColor([
        ...storeQuestionToChangeGreenColor,
        initiallyStoreSectionData?.questions?.[mcqCount],
      ]);
    } else {
      // setNotAttemptAnswerShowQuestion([
      //   ...notAttemptAnswerShowQuestion,
      //   initiallyStoreSectionData?.questions?.[mcqCount],
      // ]);
    }
  };
  const onAnswerClick = (asnwer) => {
    userClickAnsweButton(asnwer);
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [mcqCount]: asnwer,
    }));
  };

  const onHandelNextQuestion = () => {
    if (mcqCount < initiallyStoreSectionData?.questions?.length - 1) {
      setMcqCount((pre) => pre + 1);
    }
  };

  const onSelectSectionStoreIDWithCourseName = (value, key) => {
    console.log(value);
    setSectionNumber(key + 1);
    // onUserSelecetSectionNavigateMcqs({
    //   _id: value._id,
    //   courseName: value.courseName,
    //   topic: value.topic,
    // });

    const existingSection = storeSectionWiseUserAnswer?.find(
      (section) => section._id === value._id
    );

    if (!existingSection) {
      setStoreSectionWiseUserAnswer((prevAnswers) => [
        ...prevAnswers,
        {
          _id: value._id,
          courseName: value.courseName,
          topic: value.topic,
          answers: [],
        },
      ]);
    }

    setStoreSectionUserClickValue(value);
    const newSection = mainQuestionData?.filter(
      (each) => each._id === value._id
    );
    console.log(newSection);
    setInitiallyStoreSectionData(newSection?.[0]);
    setMcqCount(0);
  };

  const onRightSideClickAnyRandomNumber = (number) => setMcqCount(number);

  // console.log(mainQuestionData);
  // console.log(storeSectionUserClickValue);
  // console.log(storeSectionWiseUserAnswer);
  // console.log(storeQuestionToChangeGreenColor);
  // console.log(viewedQuestionsArray);

  return (
    <div className="student-exam-containe">
      <div className="student-exam-company-name-display-card">
        <span> NUHVIN GLOBAL SERVICES AND PRIVATE LIMITED</span>
      </div>
      <div className="student-exam-main-section">
        <div className="student-exam-main-first-card">
          <div className="student-exam-main-first-inner-first-card">
            <h3
              style={{
                color:
                  initiallyStoreSectionData?.questions?.[mcqCount]
                    ?.Difficulty_Level === "Easy"
                    ? "rgb(55, 226, 55)"
                    : initiallyStoreSectionData?.questions?.[mcqCount]
                        ?.Difficulty_Level === "Medium"
                    ? "yellow"
                    : "red",
              }}
              className="student-exam-main-leveltext"
            >
              {
                initiallyStoreSectionData?.questions?.[mcqCount]
                  ?.Difficulty_Level
              }
            </h3>
            <h3>{initiallyStoreSectionData?.courseName}</h3>
          </div>
          <div className="studet-exam-question-card">
            <span>{onCheckIssingleDigitOrNot(mcqCount + 1)}</span>
            <h3>
              {initiallyStoreSectionData?.questions?.[mcqCount]?.question}
            </h3>
          </div>
          <div className="student-exam-answer-card">
            {initiallyStoreSectionData?.questions?.[mcqCount]?.answers?.map(
              (each) => (
                <div className="student-exam-single-answer">
                  <input
                    onChange={() => onAnswerClick(each)}
                    type="radio"
                    name="easy-python-question-1"
                    checked={selectedAnswers[mcqCount] === each}
                  />{" "}
                  <span>{each}</span>
                </div>
              )
            )}
          </div>
          <div className="student-exam-answer-btn-card">
            {/* <button>Save</button> */}
            <button
              onClick={() => {
                setViewedQuestionsArray([
                  ...viewedQuestionsArray,
                  mcqCount + 1,
                ]);
                onHandelNextQuestion();
              }}
            >
              Next
            </button>
            <button>Submit Exam</button>
            {/* <button onClick={handleFullScreen}>Submit Exam</button> */}
          </div>
        </div>
        <div className="student-exam-main-second-card">
          <div className="student-exam-second-card-time-card">
            <div>
              <h4>Time</h4>
              {/* <MdMoreTime size={30} /> */}
            </div>
            <div>
              <h1>{hours}</h1>
              <h1>:</h1>
              <h1>{minutes}</h1>
              <h1>:</h1>
              <h1>{seconds}</h1>
            </div>
            <div>
              <h4>Hour</h4>
              <h4>Minute</h4>
              <h4>Seconds</h4>
            </div>
          </div>
          <div className="student-exam-question-number-card">
            <div className="student-exam-question-section-data">
              {mainQuestionData?.map((each, key) => (
                <p
                  style={{
                    background:
                      key === 0
                        ? "rgb(55, 226, 55)"
                        : key === 1
                        ? "lightblue"
                        : "brown",
                  }}
                  onClick={() =>
                    onSelectSectionStoreIDWithCourseName(each, key)
                  }
                >
                  {each?.courseName}
                </p>
              ))}
            </div>
            <div className="">
              {initiallyStoreSectionData?.questions?.map((each, key) => (
                <span
                  style={{
                    background: storeQuestionToChangeGreenColor?.includes(each)
                      ? "green"
                      : mcqCount + 1 === key + 1
                      ? "#de0085"
                      : viewedQuestionsArray.includes(key + 1) && "#ff5900",
                  }}
                  onClick={() => {
                    setViewedQuestionsArray([
                      ...viewedQuestionsArray,
                      mcqCount + 1,
                    ]);
                    onRightSideClickAnyRandomNumber(key);
                  }}
                >
                  {onCheckIssingleDigitOrNot(key + 1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;