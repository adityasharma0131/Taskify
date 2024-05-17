import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import DashHeader from "./DashHeader";
import axios from "axios";
import "../App.css";

const Profile = () => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const navigate = useNavigate(); // Initialize useNavigate

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("https://taskify-gamma-opal.vercel.app/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (error) {
      navigate("*"); // Use navigate for navigation
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://taskify-gamma-opal.vercel.app/update-profile", userData, {
        withCredentials: true,
      });
      // Navigate back to /Dashboard upon successful update
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <DashHeader />
      <section className="section__height" id="home">
        <div className="dash_bgbox">
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/Dashboard" className="navigate">
                  Tasks /{" "}
                </NavLink>{" "}
                Profile
              </li>
            </ul>
          </nav>
          <div className="profile_header">
            <h1>Profile</h1>
            {Object.keys(userData).length > 0 ? (
              <>
                <img
                  className="profile_img"
                  src={userData.profileImage}
                  alt=""
                  />
                <form onSubmit={handleFormSubmit}>
                  <label className="label">
                    <div className="name_sec">
                      <input
                        type="text"
                        className="input"
                        value={userData.firstName}
                        placeholder="First name"
                        autoComplete="off"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            firstName: e.target.value,
                          })
                        }
                      />

                      <input
                        type="text"
                        className="input"
                        value={userData.lastName}
                        placeholder="Last Name"
                        autoComplete="off"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <input
                      type="email"
                      className="input"
                      value={userData.email}
                      placeholder="Email Address"
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="input"
                      defaultValue={formatDate(userData.createdAt)}
                      placeholder="Last Name"
                      autoComplete="off"
                      disabled
                    />
                    <button type="submit" className="prof_sub">
                      Save Changes
                    </button>
                  </label>
                </form>
              </>
            ) : (
              <h1></h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
