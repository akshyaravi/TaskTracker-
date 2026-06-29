import React from 'react';
import { Link } from 'react-router-dom';

function TaskCard({ task, onDelete, onComplete }) {
  // Add fallback for missing data
  const {
    id,
    title = 'Untitled Task',
    description = 'No description provided.',
    status = 'TODO',
    priority = 'MEDIUM',
    dueDate,
    projectName = 'N/A'
  } = task;

  const formattedDate = dueDate ? new Date(dueDate).toLocaleDateString() : 'No date set';

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{title}</h3>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <p className="task-desc">{description}</p>
      <div className="task-details">
        <div className="detail-item">
          <strong>Priority:</strong> <span className={`priority-${priority.toLowerCase()}`}>{priority}</span>
        </div>
        <div className="detail-item">
          <strong>Due Date:</strong> <span>{formattedDate}</span>
        </div>
        <div className="detail-item">
          <strong>Project:</strong> <span>{projectName}</span>
        </div>
      </div>
      <div className="task-actions">
        <Link to={`/tasks/edit/${id}`} className="btn btn-edit">Edit</Link>
        <button 
          onClick={() => onComplete(id)} 
          className="btn btn-complete"
          disabled={status === 'DONE'}
        >
          {status === 'DONE' ? 'Done' : 'Complete'}
        </button>
        <button onClick={() => onDelete(id)} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
