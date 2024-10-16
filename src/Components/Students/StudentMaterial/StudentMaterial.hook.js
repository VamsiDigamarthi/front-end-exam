import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../Core/urls";

export const useStundetMaterials = () => {
  const colors = [
    "#1C87C91A",
    "#211DE0",
    "#955252",
    "#FF7700",
    "#a8c489",
    "#c28aa9",
  ];
  const { profile } = useSelector((state) => state.profile);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const [singleMaterial, setSingleMaterial] = useState("");
  const [filterMaterials, setFilterMaterials] = useState([]);

  const onShowPdf = (pdf) => {
    console.log(pdf);
    setOnOpenModal(true);
    setSingleMaterial(pdf);
  };

  useEffect(() => {
    const onFetchMaterials = () => {
      API.get(`/student/materials/${profile?.course}`)
        .then((res) => {
          console.log(res.data);
          setFilterMaterials(res.data);
        })
        .catch((e) => {
          console.log(e?.response?.data?.message);
        });
    };

    profile && onFetchMaterials();
  }, [profile]);

  return {
    profile,
    colors,
    onOpenModal,
    singleMaterial,
    onShowPdf,
    filterMaterials,
    setOnOpenModal,
  };
};
