import { useLocation } from "react-router-dom";

const useExamSections = () => {
  const location = useLocation();

  const sections = location.state?.sData?.sections;

  if (!sections) {
    console.warn("No sections data found in location.state");
  }

  return sections;
};

export default useExamSections;
