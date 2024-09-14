import React, { useEffect, useState } from "react";
import "./AddStudent.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GiRapidshareArrow } from "react-icons/gi";
import { MdMapsHomeWork } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { API } from "../../../Core/urls";
import { useSelector } from "react-redux";
import Header from "../../Header/Header";

const AddStudent = () => {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const { profile } = useSelector((state) => state.profile);

  const [batchDetails, setBatchDetails] = useState({
    course: "",
    batchName: "",
    purpose: "",
  });
  const [batchEnter, setBatchEnter] = useState(false);
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    collegeName: "",
    course: "",
    // batch: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [studentDataExel, setStudentDataExel] = useState([]);

  const onChangeStudentData = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const onAddStudentData = () => {
    if (
      studentData.id.trim() === "" ||
      studentData.name.trim() === "" ||
      studentData.email.trim() === "" ||
      studentData.password.trim() === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (editIndex !== null) {
      // Update the existing user at the same index
      const updatedUsers = [...studentDataExel];
      updatedUsers[editIndex] = studentData;
      setStudentDataExel(updatedUsers);
      setEditIndex(null);
    } else {
      setStudentDataExel([
        ...studentDataExel,
        {
          ...studentData,
          course: batchDetails.course,
          batchName: batchDetails.batchName,
        },
      ]);
    }

    setStudentData({
      id: "",
      name: "",
      email: "",
      password: "",
      collegeName: "",
    });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = studentDataExel.filter((_, i) => i !== index);
    setStudentDataExel(updatedUsers);
  };

  const onEditStudent = (index) => {
    const userToEdit = studentDataExel[index];
    setStudentData(userToEdit);
    setEditIndex(index);
  };

  const onSaveDataFromLocalStorage = () => {
    localStorage.setItem("studentData", JSON.stringify(studentDataExel));
    alert("Data saved successfully");
  };
  //   get local storage data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentData"));
    const storedBatch = JSON.parse(localStorage.getItem("batchDetails"));
    if (storedData) {
      setStudentDataExel(storedData);
    }
    if (storedBatch) {
      setBatchDetails(storedBatch);
    }
  }, []);

  const onPostStudentData = () => {
    console.log(studentDataExel);
    API.post(
      "/admin/add-student",
      { studentDataExel },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        alert("Data posted successfully");
        setStudentDataExel([]);
        localStorage.removeItem("studentData");
        localStorage.removeItem("batchDetails");
        setBatchEnter(false);
        setStudentData({
          id: "",
          name: "",
          email: "",
          password: "",
          collegeName: "",
        });

        setBatchDetails({
          course: "",
          batchName: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeBatchData = (e) => {
    setBatchDetails({
      ...batchDetails,
      [e.target.name]: e.target.value?.toLowerCase(),
    });
  };

  const onBatchCourseSave = () => {
    localStorage.setItem("batchDetails", JSON.stringify(batchDetails));
    setBatchEnter(true);
  };

  // console.log(studentDataExel);

  return (
    <div className="addp-student-main-container">
      <Header name={profile?.name} email={profile.email} />

      <div className="add-student-main-container">
        <div className="add-students-first-card">
          <div className="add-student-excel-first-card">
            <span>ID</span>
            <span>Name</span>
            <span>Email</span>
            <span>Password</span>
            <span>College Name</span>
            <span>Action</span>
          </div>
          <div className="add-student-exel-table-body">
            {studentDataExel.map((each, index) => (
              <div className="add-student-exel-table-single-card" key={index}>
                <span>{each.id}</span>
                <span>{each.name}</span>
                <span>{each.email}</span>
                <span>{each.password}</span>
                <span>{each.collegeName}</span>
                <span>
                  <CiEdit size={20} onClick={() => onEditStudent(index)} />
                  <MdOutlineDelete
                    onClick={() => handleDeleteUser(index)}
                    size={20}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="add-student-first-btn-card">
            <button onClick={onSaveDataFromLocalStorage}>Save Data</button>
            <button onClick={onPostStudentData}>Post Data</button>
          </div>
        </div>
        {batchEnter ? (
          <div className="add-students-second-card">
            <div className="add-student-input-inner-card-div">
              <GiRapidshareArrow size={17} color="grey" />
              <input
                onChange={onChangeStudentData}
                type="text"
                placeholder="Student ID"
                name="id"
                value={studentData.id}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <FaRegUser size={17} color="grey" />
              <input
                onChange={onChangeStudentData}
                type="text"
                placeholder="Name"
                name="name"
                value={studentData.name}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <MdOutlineEmail size={17} color="grey" />
              <input
                onChange={onChangeStudentData}
                type="text"
                placeholder="Email"
                name="email"
                value={studentData.email}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <RiLockPasswordLine size={17} color="grey" />
              <input
                onChange={onChangeStudentData}
                type="text"
                placeholder="Password"
                name="password"
                value={studentData.password}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <MdMapsHomeWork size={17} color="grey" />
              <input
                onChange={onChangeStudentData}
                type="text"
                placeholder="College Name"
                name="collegeName"
                value={studentData.collegeName}
              />
            </div>
            <button onClick={onAddStudentData} className="add-student-btn">
              {editIndex !== null ? "Save Changes" : "Add"}
            </button>
          </div>
        ) : (
          <div className="add-students-second-card">
            <div className="add-student-input-inner-card-div">
              <FaRegUser size={17} color="grey" />
              <input
                onChange={onChangeBatchData}
                type="text"
                placeholder="Batch ID"
                name="course"
                value={batchDetails.course}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <FaRegUser size={17} color="grey" />
              <input
                onChange={onChangeBatchData}
                type="text"
                placeholder="Batch Name"
                name="batchName"
                value={batchDetails.batchName}
              />
            </div>
            <div className="add-student-input-inner-card-div">
              <FaRegUser size={17} color="grey" />
              <input
                onChange={onChangeBatchData}
                type="text"
                placeholder="purpose"
                name="purpose"
                value={batchDetails.purpose}
              />
            </div>
            <button onClick={onBatchCourseSave} className="add-course-btn">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
