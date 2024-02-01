import React, { useContext } from 'react';
import Logo from "../assets/logo.png";
import { navBarLink } from '../data';
import { NavLink } from 'react-router-dom';
import DataContext from '../context/datacontext';

const Navbar = () => {
  const { handleHead, toggle, setToggle } = useContext(DataContext);
  return (
        <nav className={`navbar_side ${toggle ? "active" : ""}`}>
        <div className="nav_header">
        <img src={Logo} alt=".." className='img' />
        <h2 className='user'>Student</h2>
        </div>
        <div className='nav_link'>
        {
        navBarLink.map((nav) => {
        return (
        <li key={nav.id} onClick={() => handleHead(nav.name)}>
        <NavLink to={nav.link} className={({ isActive }) =>
        isActive ? "nav_item nav_active" : "nav_item text-secondary"}>
        <span className='nav_icon'>{nav.icon}</span>
        <span className='nav_title'>{nav.name}</span>
        </NavLink>
        </li>
        )
        })
        }
        </div>
        <div className={`nav_toggle ${toggle ? "active" : ""}`} onClick={() => setToggle(!toggle)}>
        <div className={`toggle_menu ${toggle ? "active" : ""}`}></div>
        </div>
        </nav>
  )
}


export default Navbar;
