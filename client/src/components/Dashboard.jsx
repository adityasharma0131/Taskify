import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <DashHeader />
      <section className="section__height" id="home">
        <div className="dash_bgbox">
          <div className="dash_header">
            {Object?.keys(userData).length > 0 ? (
              <h1>Hey, {userData.displayName} </h1>
            ) : (
              <h1></h1> // Display loading message while waiting for user data
            )}

            <form
              action="/Dashboard/add"
              method="POST"
              className="position-relative"
            >
              <button type="submit" className="button">
                <span className="button__text">New Note</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    height="24"
                    fill="none"
                    className="svg"
                  >
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
