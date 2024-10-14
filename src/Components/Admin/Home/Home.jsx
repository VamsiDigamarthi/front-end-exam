import React from "react";
import Header from "../../Header/Header";
import "./Home.css";
import { useOpenTodoModal } from "../../../utils/CustomHook/OpenAddTodoModalHook";
import AddTodo from "../../../Modals/AddTodo/AddTodo";
import HomeFirstLeft from "./HomeFirstLeft/HomeFirstLeft";
import HomeFirstRight from "./HomeFirstRight/HomeFirstRight";
import HomeTable from "./HomeTable/HomeTable";

const Home = () => {
  const { profile, openTodoModal, handleOpenTodoModal } = useOpenTodoModal();
  return (
    <div className="home-main">
      <div>
        <Header name={profile?.name} email={profile?.email} />
        <div className="home-first">
          <HomeFirstLeft />
          <HomeFirstRight handleOpenTodoModal={handleOpenTodoModal} />
        </div>
        <HomeTable />
        {openTodoModal && <AddTodo handleOpenTodoModal={handleOpenTodoModal} />}
      </div>
    </div>
  );
};

export default Home;
