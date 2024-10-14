import React from "react";
import { useTodoMarkHook } from "./TodoMarkHook";

const TodoList = ({ filteredTodos }) => {
  const { markTodo } = useTodoMarkHook();
  return (
    <>
      {filteredTodos?.map((todo) => (
        <div key={todo._id}>
          <input
            onChange={() => markTodo(todo._id)}
            type="checkbox"
            checked={todo.isRead}
          />
          <div>
            <h4>{todo.title}</h4>
            <span>{todo.description}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
