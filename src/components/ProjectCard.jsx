import React from "react";

const ProjectCard = ({ project, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h3 className="card-title">{project.title}</h3>
      <p className="card-desc">{project.description}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(project)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(project._id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default ProjectCard;
