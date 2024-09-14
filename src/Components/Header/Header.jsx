import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = ({ name, email }) => {
  return (
    <div className="header-container new-header">
      <NavLink activeClassName="active" to="/">
        <img
          className="header-container-img"
          src="/images/logo.png"
          alt="Logo"
        />
      </NavLink>
      <div className="header-second-card">
        <div className="header-second-single-card">
          {/* <span>Dashboard</span>
          <span>Project</span> */}
          <span>
            <NavLink activeClassName="active" to="/add-students">
              Add Students
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/students-list">
              Students-List
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/add-question">
              Add Question
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/question-list">
              Question-list
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/add-exam">
              Add Exams
            </NavLink>
          </span>
        </div>
        <div className="header-second-card-second-card">
          <span>{name}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
