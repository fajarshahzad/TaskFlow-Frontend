import React from "react";
import "../styles.css";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusClass = (s) => 
    s === "Completed" ? "priority-high" : s === "In Progress" ? "priority-medium" : "priority-low";

  return (
    <div className="card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p className={getStatusClass(task.status)}>Status: {task.status}</p>
      <button className="btn-edit" onClick={()=>onEdit(task)}>Edit</button>
      <button className="btn-delete" onClick={()=>onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
