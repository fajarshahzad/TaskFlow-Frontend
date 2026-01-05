import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import ProjectCard from "../components/ProjectCard";
import "../styles.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://task-flow-backend-ashen.vercel.app/projects", config);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // Add or edit project
  const addOrEditProject = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill title and description");

    try {
      if (editId) {
        await axios.put(`https://task-flow-backend-ashen.vercel.app/projects/${editId}`, { title, description }, config);
        setEditId(null);
      } else {
        await axios.post("https://task-flow-backend-ashen.vercel.app/projects", { title, description }, config);
      }
      setTitle(""); setDescription("");
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err.response?.data?.message || err.message);
      alert("Failed to save project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://task-flow-backend-ashen.vercel.app/projects/${id}`, config);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err.response?.data?.message || err.message);
      alert("Failed to delete project");
    }
  };

  const editProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setEditId(project._id);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">Projects</h1>

        {/* Form */}
        <form onSubmit={addOrEditProject} className="form-container">
          <input
            placeholder="Project Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="btn-add">
            {editId ? "Update Project" : "Add Project"}
          </button>
        </form>

        {/* Projects Grid */}
        <div className="grid">
          {projects.length === 0 ? (
            <p>No projects yet. Add your first project!</p>
          ) : (
            projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={deleteProject}
                onEdit={editProject}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
