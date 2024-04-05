import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import datacontext from "./context/datacontext";
import Capstone from './pages/Capstone';
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Mock from './pages/Mock';
import Profile from "./pages/Profile";
import Webcode from './pages/Webcode';
import Login from "./pages/Login";
import Loggedout from "./pages/Loggedout";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import CnfirmUser from "./pages/CnfirmUser";
import './App.css';

function App() {
  const { loggedUser } = useContext(datacontext);

  return (
    <>
      {loggedUser && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <Routes>
        {!loggedUser && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset/:id" element={<Reset />} />
            <Route path="/cnfirm/:id" element={<CnfirmUser />} />
            <Route path="/*" element={<Loggedout />} />
          </>
        )}
        {loggedUser && (
          <>
            <Route path="/" element={<Roadmap />} />
            <Route path="/class" element={<Roadmap />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/webcode' element={<Webcode />} />
            <Route path='/capstone' element={<Capstone />} />
            <Route path='/mock' element={<Mock />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App;
