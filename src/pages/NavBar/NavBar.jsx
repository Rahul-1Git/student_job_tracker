import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <h1>Student Job Tracker</h1>

        <ul className="navBar_link">
          <li>
            <NavLink to="/">
              <button>Jobs</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add">
              <button>Add +</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
