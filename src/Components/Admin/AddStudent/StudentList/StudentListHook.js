import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminBatchWiseStudent } from "../../../../Redux/features/BatchWiseStudentData";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
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

  const handleDownload = (batch) => {
    // Create a worksheet with batch and users data
    const ws_data = [
      ["Batch Name", batch.batchName],
      ["Course", batch.course],
      ["Total Students", batch.users.length],
      [], // Add empty row for separation
      ["Student ID", "Name", "Email", "College Name"],
    ];

    // Add each user's data to the worksheet
    batch.users.forEach((user) => {
      ws_data.push([user.studentId, user.name, user.email, user.collegeName]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data); // Convert the array of arrays to a worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Student List"); // Append the worksheet

    // Generate and download the Excel file
    XLSX.writeFile(wb, `${batch.batchName}_${batch.course}_StudentList.xlsx`);
  };

  return {
    initialBatch,
    restudents,
    profile,
    studentHeaders,
    studentBody,
    handleDownload,
  };
};
