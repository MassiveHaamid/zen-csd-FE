import React, { useContext } from "react";
import LOGO from "../assets/logo.png";
import BANNER from "../assets/banner.png";
import { Link } from "react-router-dom";
import datacontext from "../context/datacontext";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";

const validate = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { handleSignIn, isLoading } = useContext(datacontext);

  return (
      <div className="lgnPage">
      <div className='row m-0'>
      <div className='col-md-8'>
      <div className="row img_container">
      <img src={LOGO} alt=".." className="logo" />
      </div>
      <div className='row'>
      <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
      <div className='col-10 col-md-8 col-lg-6'>
      <Formik initialValues={{ 
        email: "", password: "",
      }}
      validationSchema={validate} onSubmit={(values) => {
      handleSignIn(values);
      }}
      >
      {(formik) => (
      <Form>
      <TextField label="Email" name="email" id="email" type="email" placeholder="Enter Register Email"/>
      <TextField label="Password" name="password" id="password" type="password" placeholder="Enter Password"/>
      <button type="submit" className="btn-block login_btn mb-3">
      {isLoading ? ( <span className="spinner-border text-warning"></span> ) : ( "Login" )}
      </button>
      </Form>
      )}
      </Formik>
      </div>
      <Link to="/forgot" className="btn forgot btn-outline-info mb-3">Forgot Password</Link>
      <Link to="/signup" className="btn forgot btn-outline-primary">Not Register? Sign up</Link>
      </div>
      </div>
      </div>
      <div className="col-md-4 text-right banner__right pr-0">
      <img src={BANNER} className="banner" alt=".." />
      </div>
      </div>
      <div className='modal' id='myModal'>
      <div className='modal-dialog'>
      <div className='modal-content'>
      <div className='modal-header'>
      <h4 className='modal-title'>Welcome to Zen Student Dashboard</h4>
      </div>
      <div className='modal-body'>
      for Student Login use below ID or create new one: <br />
      <span className='mx-5'> Email : reshma9298h@gmail.com</span> <br />
      <span className='mx-5'> password : rcaqhwgsrcbpjovh</span> <br />
      <hr />
      <span className='text-secondary text-justify'>
      Note: This Student Dashboard project includes features tailored
      for students, such as attending classes, submitting tasks,
      checking the dashboard.
      </span>
      </div>
      <div className='modal-footer'>
      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>
      </div>
  );
};

export default Login;
