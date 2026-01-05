import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">TaskFlow</div>

      <nav className="sidebar-links">
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/projects">📁 Projects</Link>
        <Link to="/tasks">✅ Tasks</Link>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default Navbar;
