import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onFetchTododRed } from "../../../../Redux/features/fetchTodo";

export const useHomeFirstRightHook = () => {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const { redTodos } = useSelector((state) => state?.todos);
  const [filteredTodos, setFilteredTodos] = useState(redTodos); // State for filtered todos

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onFetchTododRed({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredTodos(redTodos);
  }, [redTodos]);

  const onSearchTodod = (value) => {
    setFilteredTodos(
      redTodos?.filter((todos) =>
        todos?.title?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };

  const onReadTodoFun = () => {
    setFilteredTodos(redTodos?.filter((todo) => todo?.isRead === true));
  };
  const onUnreadTodoFun = () => {
    setFilteredTodos(redTodos?.filter((todo) => todo?.isRead === false));
  };

  const onAllTodos = () => {
    setFilteredTodos(redTodos);
  };

  return {
    filteredTodos,
    onSearchTodod,
    onReadTodoFun,
    onUnreadTodoFun,
    onAllTodos,
  };
};
