import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminResultData } from "../../Redux/features/ResultSection";

export const useOpenTodoModal = () => {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const { profile } = useSelector((state) => state.profile);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const handleOpenTodoModal = () => {
    setOpenTodoModal(!openTodoModal);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminResultData({ token }));
  }, [dispatch, token]);

  return {
    profile,
    openTodoModal,
    handleOpenTodoModal,
  };
};
