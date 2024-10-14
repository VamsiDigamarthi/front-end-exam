import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../../Core/urls";
import { onFetchTododRed } from "../../../../../Redux/features/fetchTodo";

export const useTodoMarkHook = () => {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const dispatch = useDispatch();

  const markTodo = (id) => {
    API.patch(`/todo/mark/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(onFetchTododRed({ token }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    markTodo,
  };
};
