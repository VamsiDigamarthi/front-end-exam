import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useHomeLeftFirstHook = () => {
  const { reResultData } = useSelector((state) => state?.resultData);

  const { upcomingExams, completedExams } = useMemo(() => {
    const upcomingExams = [];
    const completedExams = [];
    const currentDateTime = new Date();

    if (reResultData && reResultData.length) {
      reResultData.forEach((exam) => {
        const examDateTime = new Date(`${exam.date}T${exam.time}`);
        if (examDateTime > currentDateTime) {
          upcomingExams.push(exam);
        } else {
          completedExams.push(exam);
        }
      });
    }

    return { upcomingExams, completedExams };
  }, [reResultData]);

  const totalExams = reResultData?.length || 0;

  const examDetails = useMemo(
    () => [
      { count: totalExams, label: "Total Exams" },
      { count: upcomingExams.length, label: "Upcoming Exams" },
      { count: 0, label: "Declined Exams" },
      { count: completedExams.length, label: "Completed Exams" },
    ],
    [totalExams, upcomingExams, completedExams]
  );

  return {
    examDetails,
  };
};
