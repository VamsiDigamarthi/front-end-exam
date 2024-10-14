import React from "react";
import "./AddTodo.css";
import { RxCross2 } from "react-icons/rx";
import { useAddTodoHook } from "../../utils/CustomHook/AddTodoHook";

const AddTodo = ({ handleOpenTodoModal }) => {
  const { handleInputChange, todo, onAddTodo, error } = useAddTodoHook({
    handleOpenTodoModal,
  });
  // console.log(error);
  return (
    <div className="all-modals">
      <div className="add-todo">
        <div className="add-todo-title">
          <h3>Add Todo</h3>
          <RxCross2 onClick={handleOpenTodoModal} size={25} />
        </div>
        <form onSubmit={onAddTodo} className="add-todo-form">
          <div className="add-todo-input-card">
            <span>Title:</span>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Titile"
              name="title"
              value={todo?.title}
            />
            {error?.title && <p className="error-message">{error.title}</p>}
          </div>
          <div className="add-todo-input-card">
            <span>Description:</span>
            <textarea
              name="description"
              onChange={handleInputChange}
              value={todo?.description}
            ></textarea>
            {error?.description && (
              <p className="error-message">{error.description}</p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
