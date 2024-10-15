import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { afterStudentGiveFeedBackAdminFetch } from "../../../../../Redux/features/adminFetchFeedbackAfterStudentGive";
import * as XLSX from "xlsx";
export const useStudentFeedBackHook = () => {
  const { profile } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.tokenWithUserRole);
  const { afterStudentGiveAdminFetchFeedback } = useSelector(
    (state) => state.adminStudentFeedbacks
  );

  // store unique test ids of entire api data
  const [uniqueTestIds, setUniqueTestIds] = useState([]);

  // store filter data based on test id and initially store first test id objects
  const [singleTestData, setSingleTestData] = useState([]);

  // store single test id to display which feedbacks display
  const [singleTestIdToDisplayFeedbacks, setSingleTestIdToDisplayFeedbacks] =
    useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(afterStudentGiveFeedBackAdminFetch({ token }));
  }, [dispatch, token]);

  // FILTER UNIQUE TEST ID
  useEffect(() => {
    const getUniqueTestIds = () => {
      const uniqueTestIds = new Set();

      afterStudentGiveAdminFetchFeedback?.forEach((feedback) => {
        if (feedback.testId && feedback.testId.testId) {
          uniqueTestIds.add(feedback.testId.testId);
        }
      });

      setUniqueTestIds(Array.from(uniqueTestIds));
    };
    afterStudentGiveAdminFetchFeedback && getUniqueTestIds();
    afterStudentGiveAdminFetchFeedback &&
      setSingleTestData(afterStudentGiveAdminFetchFeedback);
  }, [afterStudentGiveAdminFetchFeedback]);

  /*
      user select testId to filter testId related documents
  */
  const onChangeTestIdHandle = (event) => {
    const testId = event.target.value;

    setSingleTestData(
      afterStudentGiveAdminFetchFeedback?.filter(
        (singleTest) => singleTest?.testId?.testId === testId
      )
    );
  };

  return {
    profile,
    uniqueTestIds,
    onChangeTestIdHandle,
    singleTestData,
    setSingleTestIdToDisplayFeedbacks,
    singleTestIdToDisplayFeedbacks,
  };
};
