import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import DashHeader from "./DashHeader";
import axios from "axios";
import "../index.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      getTasks(response.data.user._id); // Fetch tasks associated with the user
    } catch (error) {
      navigate("*"); // Navigate to error page
    }
  };

  const getTasks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/${userId}`);
      console.log("Fetched tasks:", response.data); // Log fetched tasks
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/tasks", {
        task: inputValue,
        id: userData._id,
      });
      console.log("Task submitted:", response.data);
      setInputValue("");
      getTasks(userData._id); // After submitting task, fetch updated task list
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "true" ? "false" : "true";
      await axios.post("http://localhost:3000/tasks/update-status", {
        taskId,
        newStatus,
      });
      getTasks(userData._id); // Refresh tasks after status update
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      getTasks(userData._id); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <DashHeader />
      <section className="section__height" id="home">
        <div className="dash_bgbox">
          <div className="dash_header">
            {Object.keys(userData).length > 0 ? (
              <h1>Hey, {userData.firstName}</h1>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>

          <div className="profile_header">
            <label className="label">
              <div className="create_sec">
                <input
                  type="text"
                  className="input_dash"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Write new task !"
                  autoComplete="off"
                />

                <button className="create" onClick={handleSubmit}>
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

            <div className="num_sec">
              <div>
                <p>
                  Created tasks <span>{tasks.length}</span>
                </p>
              </div>
              <div>
                <p>
                  Completed tasks{" "}
                  <span>
                    {tasks.filter((task) => task.status === "true").length}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="tasks_coll">
            <div className="task_bar">
              <ul>
                {tasks.map((task) => (
                  <li className="task_list" key={task._id} draggable>
                    <button
                      className="checkContainer"
                      onClick={() => toggleTaskStatus(task._id, task.status)}
                    >
                      {task.status === "true" ? (
                        <FaCheckSquare className="FaCheckSquare" />
                      ) : (
                        <FaSquare className="FaSquare" />
                      )}
                    </button>
                    <p>{task.task}</p>
                    <button
                      className="deleteButton"
                      onClick={() => deleteTask(task._id)}
                    >
                      <RxCross2 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

