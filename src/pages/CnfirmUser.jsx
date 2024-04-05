import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LOGO from "../assets/logo.png";
import datacontext from "../../context/datacontext";

const ConfirmUser = () => {
  const { handleConfirm, setResetToken } = useContext(datacontext);
  const { id } = useParams();
  useEffect(() => {
    setResetToken(id);
  });
  return (
    <div className="loggedout">
    <div className="row img_container">
    <img src={LOGO} alt=".." className="logo" />
    </div>
    <div className="body_container p-5 rounded text-center">
    <h3 className="text-center mb-4">
    Please click Below button to confirm Your account.
    </h3>
    <button onClick={handleConfirm} className="btn btn-success mb-4">
    Activate Account
    </button>
    <div className="text-center">
    <Link to="/" className="btn btn-success">cancel</Link>
    </div>
    </div>
    </div>
  );
};

export default ConfirmUser;
