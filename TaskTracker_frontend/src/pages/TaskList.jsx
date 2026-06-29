import React from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
  return (
    <div className="page-container">
      <h2>Task List</h2>
      <p>This is the Task List placeholder.</p>
      <Link to="/tasks/edit/1" className="btn">Edit Task 1 (Example)</Link>
    </div>
  );
}

export default TaskList;
