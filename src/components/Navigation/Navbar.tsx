import React from 'react';
import { NavLink } from "react-router-dom";
import "./styles.css";
import Avatar from '@mui/material/Avatar';

export function Navbar () {
    return (
    <>
      <div className="nav-page">
        <nav className="navbar-expand">
          <li className="nav-item">
            <NavLink to="/" className="nav-brand">
            Tuf-form
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/question" className="nav-link">
              Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/courses" className="nav-link">
              Courses
            </NavLink>
          </li>
          {/* <li className="nav-item search-bar">
            <input type="text" placeholder="Search" />
            </li>
          </li> */}
          <li className="nav-item">
            <NavLink to="/help" className="nav-about-link">
              About
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/profile" className="nav-profile-link">
              Profile
            </NavLink>
          </li> 
          {/* <li className="nav-item">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </li> */}
        </nav>
      </div>
    </>
  );
}
