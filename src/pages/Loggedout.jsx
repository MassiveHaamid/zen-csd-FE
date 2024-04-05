import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { useContext } from "react";
import datacontext from "../../context/datacontext";

const Loggedout = () => {
  const { handleLogout } = useContext(datacontext);
  return (
      <div className="loggedout">
      <div className="row img_container">
      <img src={LOGO} alt=".." className="logo" />
      </div>
      <div className="body_container p-5 rounded">
      <h3 className="text-center mb-5">
      User has beed logged out. Kindly go to Login page
      </h3>
      <div className="text-center">
      <Link to="/" onClick={handleLogout} className="btn btn-success">Go To Login</Link>
      </div>
      </div>
      </div>
  );
};

export default Loggedout;
