import React, { useContext } from 'react';
import Header from './components/header/Header';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Capstone from './pages/Capstone/Capstone';
import Certificate from './pages/Certificate/Certificate';
import Dashboard from './pages/Dashboard/Dashboard';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Mock from './pages/Mock/Mock';
import Portfolio from './pages/Portfolio/Portfolio';
import Syllabus from './pages/Syllabus/Syllabus';
import Tasks from './pages/Tasks/Tasks';
import Webcode from './pages/Webcode/Webcode';
import Navbar from './components/navbar/Navbar';
import Roadmap from './pages/Roadmap/Roadmap';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import DataContext from './context/DataContext';
import LoggedOut from './pages/Loggedout/LoggedOut';
import Signup from './pages/Signup/Signup';
import Forgot from './pages/Forgot/Forgot';
import Reset from './pages/Reset/Reset';
import ConfirmUser from './pages/confirmUser/ConfirmUser';

function App() {

  const { loggedUser } = useContext(DataContext);

  return (
    <>
      {
        loggedUser && 
        <>
          <Header />
          <Navbar />
        </>
      }
      <Routes>
        {
          !loggedUser &&
          <>
            <Route path='/' element={<Login />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/reset/:id' element={<Reset />} />
            <Route path='/confirm/:id' element={<ConfirmUser />} />
            <Route path='/*' element={<LoggedOut />} />
          </>
        }
        {
          loggedUser && 
          <>
            <Route path='/' element={<Roadmap />} />
            <Route path='/class' element={<Roadmap />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/task' element={<Tasks />} />
            <Route path='/webcode' element={<Webcode />} />
            <Route path='/capstone' element={<Capstone />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/mock' element={<Mock />} />
            <Route path='/certificate' element={<Certificate />} />
            <Route path='/learderboard' element={<Leaderboard />} />
            <Route path='/syllabus' element={<Syllabus />} />
            <Route path='/profile' element={<Profile />} />
          </>
        }
      </Routes>
    </>
  )
}

export default App;
