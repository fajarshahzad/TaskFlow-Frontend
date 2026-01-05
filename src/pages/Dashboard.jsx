import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import DashboardChart from "../charts/DashBoardChart";
import "../styles.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const projRes = await axios.get("https://task-flow-backend-ashen.vercel.app/projects");
    const taskRes = await axios.get("https://task-flow-backend-ashen.vercel.app/tasks");
    setProjects(projRes.data);
    setTasks(taskRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{marginBottom:'20px'}}>Dashboard</h1>
        <div className="stats-container">
          <div className="stats-box">
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
          <div className="stats-box">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
        <DashboardChart projects={projects} tasks={tasks}/>
      </div>
    </>
  );
};

export default Dashboard;
