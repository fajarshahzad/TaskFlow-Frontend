import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import TaskCard from "../components/TaskCard";
import "../styles.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks", config);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addOrEditTask = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/tasks/${editId}`, { title, description, status }, config);
        setEditId(null);
      } else {
        await axios.post("/tasks", { title, description, status }, config);
      }
      setTitle(""); setDescription(""); setStatus("Pending");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditId(task._id);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Tasks</h1>
        <form onSubmit={addOrEditTask} className="form-container">
  <input
    placeholder="Task Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
    required
  />

  <input
    placeholder="Task Description"
    value={description}
    onChange={e => setDescription(e.target.value)}
    required
  />

  <select value={status} onChange={e => setStatus(e.target.value)}>
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
  </select>

  <button className="btn-add" type="submit">
    {editId ? "Update Task" : "Add Task"}
  </button>
</form>


        <div className="grid">
          {tasks.map(t => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
