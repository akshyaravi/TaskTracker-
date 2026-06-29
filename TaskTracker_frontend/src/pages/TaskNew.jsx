import React from 'react';
import TaskForm from '../components/TaskForm';

function TaskNew() {
  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2>Create New Task</h2>
      </div>
      <TaskForm />
    </div>
  );
}

export default TaskNew;
