import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";

import { useHomeFirstRightHook } from "./HomeFirstRightHook";
import TodoList from "./TodoList/TodoList";
import Nodata from "../../../../utils/Components/Nodata/Nodata";

const HomeFirstRight = ({ handleOpenTodoModal }) => {
  const {
    filteredTodos,
    onSearchTodod,
    onReadTodoFun,
    onUnreadTodoFun,
    onAllTodos,
  } = useHomeFirstRightHook();

  return (
    <div className="home-first-right">
      <div className="todo-first">
        <h3>Todo-List</h3>
        <CiCirclePlus onClick={handleOpenTodoModal} size={25} />
        <span>D</span>
        <span>W</span>
        <span>M</span>
        <span>Y</span>
        <IoCalendarOutline size={25} />
      </div>
      <div className="todo-second">
        <div className="todo-second-search">
          <MdOutlineSearch size={25} color="grey" />
          <input
            onChange={(e) => onSearchTodod(e.target.value)}
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="todo-tabs">
          <span onClick={onAllTodos}>All</span>
          <span>
            <input
              onClick={onReadTodoFun}
              type="checkbox"
              name=""
              id=""
              checked
            />
          </span>
          <span>
            <input
              checked={false}
              onClick={onUnreadTodoFun}
              type="checkbox"
              name=""
              id=""
            />
          </span>
        </div>
      </div>
      <div className="todo-third">
        {filteredTodos?.length <= 0 ? (
          <Nodata data="No Item" width="100%" height="100%" />
        ) : (
          <TodoList filteredTodos={filteredTodos} />
        )}
      </div>
    </div>
  );
};

export default HomeFirstRight;
