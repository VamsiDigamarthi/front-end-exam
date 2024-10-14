import { useSelector } from "react-redux";

export const useStudentFeedBackHook = () => {
  const { profile } = useSelector((state) => state.profile);

  return { profile };
};
