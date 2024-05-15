import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import "../index.css";

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
              <h1>Hey, {userData.firstName}</h1>
            ) : (
              <h1></h1> // Display loading message while waiting for user data
            )}
          </div>

          <div className="profile_header">
            <label className="label">
              <div className="create_sec">
                <input
                  type="text"
                  className="input_dash"
                  placeholder="Write new task !"
                  autoComplete="off"
                />

                <button className="create">
                  <span className="create_span">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                      ></path>
                    </svg>
                    Create
                  </span>
                </button>
              </div>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
