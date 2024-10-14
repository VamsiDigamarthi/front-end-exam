import React from "react";
import "./CustomTable.css";

// Calculate the status of the exam based on date and time
const calculateStatus = (date, time) => {
  const currentDate = new Date();
  const examDate = new Date(`${date} ${time}`);

  if (examDate < currentDate) return "Completed";
  if (examDate.toDateString() === currentDate.toDateString())
    return "In Progress";
  return "Upcoming";
};

const TableHeader = ({ headers }) => (
  <div className="custom-table-header">
    {headers?.map((header, index) => (
      <span key={index} style={{ width: header.width }}>
        {header.title}
      </span>
    ))}
  </div>
);

const TableCell = ({ field, exam, examIndex, fieldIndex }) => {
  // Determine class based on exam difficulty level
  const spanClassName =
    exam[field.title] === "Easy"
      ? "easy-level"
      : exam[field.title] === "Medium"
      ? "medium-level"
      : "hard-level";

  // Determine cell content
  const content =
    field.title === "Status"
      ? calculateStatus(exam.date, exam.time)
      : exam[field.title];

  return (
    <span
      key={`cell-${examIndex}-${fieldIndex}`}
      className={field.title === "level" ? spanClassName : ""}
      style={{ width: field.width }}
    >
      {content}
    </span>
  );
};

// Component for a single row in the table
const TableRow = ({ exam, examBody, examIndex, clickSingleItem }) => {
  // Conditional handler
  const handleClick = () => {
    if (clickSingleItem) {
      clickSingleItem(exam._id);
    }
  };

  return (
    <div
      className="custom-table-single-card"
      onClick={handleClick}
      key={examIndex}
    >
      {examBody?.map((field, fieldIndex) => (
        <React.Fragment key={fieldIndex}>
          {!field.single ? (
            <div style={{ width: field.width }}>
              {field.list?.map((item, itemIndex) => (
                <span key={itemIndex}>{exam[item.title]}</span>
              ))}
            </div>
          ) : (
            <TableCell
              field={field}
              exam={exam}
              examIndex={examIndex}
              fieldIndex={fieldIndex}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Main CustomTable component
const CustomTable = ({
  tableTitle,
  headers,
  examData,
  examBody,
  clickSingleItem = () => {}, // Default to a no-op function
}) => {
  console.log(examData);
  console.log(examBody);
  return (
    <div className="custome-table-main">
      <div className="custom-t-f-c">
        <h3>{tableTitle}</h3>
      </div>
      <div className="custom-table-main">
        <TableHeader headers={headers} />
        <div className="custom-table-main-body">
          {examData?.map((exam, examIndex) => (
            <TableRow
              exam={exam}
              examBody={examBody}
              examIndex={examIndex}
              key={examIndex}
              clickSingleItem={clickSingleItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
