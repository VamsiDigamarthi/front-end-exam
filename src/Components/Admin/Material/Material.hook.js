import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../Core/urls";

export const useMaterial = () => {
  const { profile } = useSelector((state) => state.profile);
  const [addMaterialState, setAddMaterialState] = useState({
    courseName: "",
    topic: "",
    passkey: "",
    selectType: "",
    availableOn: "",
    description: "",
    pdf: "",
  });

  const [uniqueCourseName, setUniqueCourseName] = useState([]);

  const [showErrorMsgToUploadPdf, setShowErrorMsgToUploadPdf] = useState({});

  const onAddMaterialFunc = (e) => {
    setAddMaterialState({
      ...addMaterialState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    API.get("/admin/all-course")
      .then((res) => {
        // console.log(res.data);
        setUniqueCourseName(res.data);
        // alert(res?.data?.message);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        // alert("Error: " + e.response.data.message);
      });
  }, []);

  const onClearData = (e) => {
    e.preventDefault();
    setAddMaterialState({
      courseName: "",
      topic: "",
      passkey: "",
      selectType: "",
      availableOn: "",
      description: "",
      pdf: "",
    });
    setShowErrorMsgToUploadPdf({});
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAddMaterialState({ ...addMaterialState, pdf: file });
    } else {
      // alert('Please select a PDF file.');
      e.target.value = null; // Clear the input
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.courseName) {
      errors.courseName = "Course Name is required!";
    }

    if (!values.pdf) {
      errors.pdf = "PDF file  is required!";
    }

    if (!values.topic) {
      errors.topic = "Please Give me any Topic Name";
    }

    if (!values.passkey) {
      errors.passkey = "Pass key is required!";
    }

    if (!values.selectType) {
      errors.selectType = "Select Type is required!";
    }
    if (!values.availableOn) {
      errors.availableOn = "Available-On is required!";
    }

    setShowErrorMsgToUploadPdf(errors);
    return Object.keys(errors).length === 0;
  };

  const onMaterialUploadFun = (e) => {
    e.preventDefault();
    if (validate(addMaterialState)) {
      const formData = new FormData();
      formData.append("courseName", addMaterialState.courseName);
      formData.append("topic", addMaterialState.topic);
      formData.append("passkey", addMaterialState.passkey);
      formData.append("selectType", addMaterialState.selectType);
      formData.append("availableOn", addMaterialState.availableOn);
      formData.append(
        "description",
        addMaterialState?.description ? addMaterialState?.description : ""
      );
      formData.append("pdf", addMaterialState.pdf);
      API.post("/admin/meterials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${auth_token}`,
        },
      })
        .then((res) => {
          console.log(res?.data?.message);
          // succesMsgApi(res?.data?.message);
          // alert(res?.data?.message);
          setAddMaterialState({
            courseName: "",
            topic: "",
            passkey: "",
            selectType: "",
            availableOn: "",
            description: "",
            pdf: "",
          });
        })
        .catch((e) => {
          console.log(e);
          // errorMsgApi(e?.response?.data?.message);
          alert(e?.response?.data?.message);
        });
    } else {
    }
  };

  return {
    profile,
    onAddMaterialFunc,
    addMaterialState,
    handleFile,
    onClearData,
    onMaterialUploadFun,
    showErrorMsgToUploadPdf,
    uniqueCourseName,
  };
};
