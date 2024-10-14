import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Core/urls";
import { onFetchTododRed } from "../../Redux/features/fetchTodo";

export const useAddTodoHook = ({ handleOpenTodoModal }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    title: "",
    description: "",
  });
  const handleInputChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const newError = { title: "", description: "" };

    if (!todo.title.trim()) {
      newError.title = "Title is required";
      isValid = false;
    }

    if (!todo.description.trim()) {
      newError.description = "Description is required";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const onAddTodo = (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop submission if validation fails
    }
    API.post("/todo/add", todo, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        setTodo({ title: "", description: "" });
        dispatch(onFetchTododRed({ token }));
        handleOpenTodoModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return {
    todo,
    handleInputChange,
    onAddTodo,
    error,
  };
};
