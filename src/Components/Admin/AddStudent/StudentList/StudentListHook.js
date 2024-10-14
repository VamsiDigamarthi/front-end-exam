import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminBatchWiseStudent } from "../../../../Redux/features/BatchWiseStudentData";
import { FaDownload } from "react-icons/fa";

export const useStudentList = () => {
  const studentHeaders = [
    { title: "Batch ID", width: "25%" },
    { title: "Course", width: "25%" },
    { title: "Purpose", width: "25%" },
    { title: "TotalStudent", width: "20%" },
    { title: "Action", width: "7%" },
  ];

  const studentBody = [
    {
      single: true,
      width: "25%",
      title: "batchName",
    },
    {
      single: true,
      width: "25%",
      title: "courseName",
    },
    {
      single: true,
      width: "25%",
      title: "purpose",
    },
    {
      single: true,
      width: "20%",
      title: "totalStudent",
    },
    {
      single: true,
      width: "7%",
      title: "Action",
      icons: <FaDownload />,
    },
  ];

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenWithUserRole);
  const { profile } = useSelector((state) => state.profile);

  const { restudents } = useSelector((state) => state.batchWiseStudent);
  const [initialBatch, setInitialBatch] = useState([]);

  useEffect(() => {
    dispatch(adminBatchWiseStudent({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    restudents && setInitialBatch(restudents[0]);
  }, [restudents]);

  return {
    initialBatch,
    restudents,
    profile,
    studentHeaders,
    studentBody,
  };
};
