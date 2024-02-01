import React, { useEffect } from "react";
import LOGO from "../assets/logo.png";
import BANNER from "../assets/banner.png";
import { Link, useParams } from "react-router-dom";
import datacontext from "../context/datacontext";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";

const Reset = () => {
  const { handleReset, setResetToken, isLoading } = useContext(datacontext);

  const { id } = useParams();

  useEffect(() => {
    setResetToken(id);
  });

  const validate = Yup.object({
    password: Yup.string()
        .max(15, "Must be less than 15 Characters")
        .min(6, "Must be at least 6 Characters")
        .required("Required"),
    cPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password Must Match")
        .required("Required"),
})

  return (
      <div className="lgnPage">
      <div>
      <div>
      <div className="row img_container">
      <img src={LOGO} alt=".." className="logo" />
      </div>
      <div className="row">
      <div>
      <div>
      <Formik initialValues={{
      password: "",
      cPassword: "",
      }}
      validationSchema={validate} onSubmit={(values, { resetForm }) => {
      handleReset(values);
      resetForm({ values: "" });
      }}
      >
      {(formik) => (
      <Form>
      <TextField label="New Password" name="password" id="password" type="password" placeholder="Enter New Password"/>
      <TextField label="Confirm Password" name="cPassword" id="cPassword" type="password" placeholder="Confirm New Password"/>
      <button type="submit" className="btn-block login_btn">
      {isLoading ? ( <span className="spinner-border text-warning"></span> ) : ( "Update Password" )}
      </button>
      </Form>
      )}
      </Formik>
      </div>
      <Link to="/" className="btn forgot btn-outline-success ">Go to Login</Link>
      </div>
      </div>
      </div>
      <div className="col-md-4 text-right banner__right pr-0">
      <img src={BANNER} className="banner" alt=".." />
      </div>
      </div>
      </div>
  );
};

export default Reset;
