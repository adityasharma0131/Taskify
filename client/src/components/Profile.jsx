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
          <div className="profile_header">
            <h1>Profile</h1>
            {Object.keys(userData).length > 0 ? (
              <>
                <img
                  className="profile_img"
                  src={userData.profileImage}
                  alt=""
                />
                <h1>
                  {userData.firstName} {userData.lastName}
                </h1>
                <label className="label">
                  <div className="name_sec">
                    <input
                      type="text"
                      className="input"
                      value={userData.firstName}
                      placeholder="First name"
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                    />

                    <input
                      type="text"
                      className="input"
                      value={userData.lastName}
                      placeholder="Last Name"
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                    />
                  </div>
                </label>
              </>
            ) : (
              <h1></h1> // Display loading message while waiting for user data
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
