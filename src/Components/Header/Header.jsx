import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
const Header = ({ name, email }) => {
  const [onMobileOpen, setOnMobileOpen] = useState(false);

  return (
    <div className="header-container new-header">
      <NavLink activeClassName="active" to="/">
        <img
          className="header-container-img"
          src="/images/logo.png"
          alt="Logo"
        />
      </NavLink>
      <div className="header-icons">
        {onMobileOpen ? (
          <RxCross1 onClick={() => setOnMobileOpen(false)} size={30} />
        ) : (
          <RxHamburgerMenu onClick={() => setOnMobileOpen(true)} size={30} />
        )}
      </div>
      {/* desk apps */}
      <div className="header-second-card">
        <div className="header-second-single-card">
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
          <span>
            <NavLink activeClassName="active" to="/results">
              Results
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/feedback">
              FeedBack
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" to="/student-feedback">
              Student Feedbacks
            </NavLink>
          </span>
        </div>
        <div className="header-second-card-second-card">
          <span>{name}</span>
          <span>{email}</span>
        </div>
      </div>
      {/* mobile views */}
      {onMobileOpen && (
        <div className="mobile-view-card">
          <span>
            <NavLink
              activeClassName="active "
              className="new-cls"
              to="/add-students"
            >
              Add Students
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/students-list"
            >
              Students-List
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/add-question"
            >
              Add Question
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/question-list"
            >
              Question-list
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/add-exam"
            >
              Add Exams
            </NavLink>
          </span>
          <span>
            <NavLink activeClassName="active" className="new-cls" to="/results">
              Results
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/feedback"
            >
              FeedBack
            </NavLink>
          </span>
          <span>
            <NavLink
              activeClassName="active"
              className="new-cls"
              to="/student-feedback"
            >
              Student Feedbacks
            </NavLink>
          </span>
          <div className="mobile-view-first">
            <span>{name}</span>
            <span>{email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
