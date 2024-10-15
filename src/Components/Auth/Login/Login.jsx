import React, { useState } from "react";
import "./Login.css";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/features/LoginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.tokenWithUserRole);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  console.log(loading, error);
  const onSubmitedLogin = () => {
    dispatch(loginUser({ userData: userData, navigate }));
  };
  return (
    <div className="login-container">
      <div>
        <label>User Name</label>
        <div className="login-inner-input-container">
          <MdOutlineMail color="grey" size={20} />
          <input
            value={userData.email}
            onChange={handleInputChange}
            type="text"
            placeholder="Email"
            name="email"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div className="login-inner-input-container">
          <RiLockPasswordLine color="grey" size={20} />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Password"
            name="password"
            value={userData.password}
          />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={onSubmitedLogin}>Login</button>
      {/* <p>
        Forgot UserName/Password <span>Click Here</span>
      </p>
      <p>
        Do Not have Account <span>Register</span>
      </p> */}
    </div>
  );
};

export default Login;
