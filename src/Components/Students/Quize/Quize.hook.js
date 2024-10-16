import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../Core/urls";

export const useQuize = () => {
  const { profile } = useSelector((state) => state.profile);

  const [initiallyStoreAllQuizeData, setInitiallyStoreSectionData] = useState(
    []
  );
  console.log(profile);
  useEffect(() => {
    // API.get(`/all-quize/${profile?.}`)
  }, [profile]);
};
