import { useEffect, useState } from "react";

export const useStartQuizeRight = ({ finalQuizeQuestions, onSubmiteQuize }) => {
  const [totalTime, setTotalTime] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    // handleFullScreen();
    if (finalQuizeQuestions) {
      // store single section when user navigate one section to another section

      let time = 0;
      finalQuizeQuestions?.forEach((each) => {
        // console.log(question.DefaultTimeToSolve);
        time += each?.DefaultTimeToSolve || 0;
      });
      setTotalTime(time);
      setTime(time);
    }
  }, [finalQuizeQuestions]);

  useEffect(() => {
    const onTimeGHN = () => {
      const timerClre = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerClre);
            console.log("time out");
            onSubmiteQuize();
            // onCompleteExam();
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      return () => clearInterval(timerClre); // Cleanup the interval on unmount
    };
    totalTime && onTimeGHN();
  }, [totalTime]);

  const hours = Math.floor(time / 3600);
  // console.log(hours);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};
