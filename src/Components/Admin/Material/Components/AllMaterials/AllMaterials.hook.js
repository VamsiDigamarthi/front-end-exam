import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../../../Core/urls";

export const useAllMaterialsHook = () => {
  const colors = [
    "#1C87C91A",
    "#211DE0",
    "#955252",
    "#FF7700",
    "#a8c489",
    "#c28aa9",
  ];
  const { profile } = useSelector((state) => state.profile);
  const [allMaterials, setAllMaterials] = useState([]);
  const [filterMaterials, setFilterMaterials] = useState([]);
  const [uniqueCourseName, setUniqueCourseName] = useState([]);

  const [onOpenModal, setOnOpenModal] = useState(false);
  const [singleMaterial, setSingleMaterial] = useState("");
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

  useEffect(() => {
    API.get("/admin/fetch-materials")
      .then((res) => {
        console.log(res.data);
        setAllMaterials(res.data);
        setFilterMaterials(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onFilterMaterialsBasedOnCourse = (e) => {
    setFilterMaterials(
      allMaterials?.filter((material) => material.courseName === e.target.value)
    );
  };

  const onShowPdf = (pdf) => {
    console.log(pdf);
    setOnOpenModal(true);
    setSingleMaterial(pdf);
  };

  return {
    profile,
    colors,
    uniqueCourseName,
    filterMaterials,
    onFilterMaterialsBasedOnCourse,
    onShowPdf,
    onOpenModal,
    singleMaterial,
    setOnOpenModal,
  };
};
