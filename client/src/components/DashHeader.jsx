import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../App.css";

const UserHeader = () => {
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Passing an empty array as the second argument to useEffect ensures that it only runs once after the initial render

  const logout = () => {
    window.open("http://localhost:3000/logout", "_self");
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          TASKIFY
        </a>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/Dashboard" className="nav__link">
                <i className="fa-solid fa-house nav__icon"></i>
                <span className="nav__name">Tasks</span>
              </NavLink>
            </li>

            {/* <li className="nav__item">
              <a href="#about" className="nav__link">
              <i className="fa-brands fa-slack nav__icon"></i>
              <span className="nav__name">About</span>
              </a>
              </li>
              
              <li className="nav__item">
              <a href="#skills" className="nav__link">
              <i className="fa-solid fa-book nav__icon"></i>
              <span className="nav__name">Skills</span>
              </a>
              </li>
              
              <li className="nav__item">
              <a href="#portfolio" className="nav__link">
                <i className="fa-solid fa-city nav__icon"></i>
                <span className="nav__name">Companies</span>
                </a>
              </li> */}

            <li className="nav__item">
            <NavLink to="/Dashboard/Profile" className="nav__link">
                <i className="fa-regular fa-comment-dots nav__icon"></i>
                <span className="nav__name">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <ul>
                <li className="nav__item">
                <NavLink onClick={logout} className="nav__link">
              <i className="fa-solid fa-lock nav__icon"></i>
              <span className="nav__name">Logout</span>
            </NavLink>
              {Object.keys(userData).length > 0 ? (
                <img className="img" src={userData.profileImage} alt="" />
              ) : (
                <h1></h1> // Display loading message while waiting for user data
              )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserHeader;
