import React, { useContext } from "react";
import LOGO from "../assets/logo.png";
import BANNER from "../assets/banner.png";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import datacontext from "../context/datacontext";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";

const Forgot = () => {
  const { handleForgot, isLoading } = useContext(datacontext);

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Required"),
  });

  return (
    <div className="lgnPage">
      <div className="row m-0">
        <div className="col-md-8">
          <div className="row img_container">
            <img src={LOGO} alt=".." className="logo" />
          </div>
          <div className="row">
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
              <div className="col-10 col-md-8 col-lg-6">
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={validate}
                  onSubmit={(values, { resetForm }) => {
                    handleForgot(values);
                    resetForm({ values: "" });
                  }}
                >
                  {(formik) => (
                    <Form>
                      <TextField
                        label="Registered Email"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter Register Email Id"
                      />
                      <button
                        type="submit"
                        className="col-12 btn btn-lg btn-block login_btn mt-4 mb-4 d-flex justify-content-center"
                      >
                        {isLoading ? (
                          <span className="spinner-border text-warning"></span>
                        ) : (
                          "Send Reset Link"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <Link to="/" className="btn forgot btn-outline-success ">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-right banner__right pr-0">
          <img src={BANNER} className="banner" alt=".." />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Forgot;
