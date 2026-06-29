import React from 'react';
import TaskForm from '../components/TaskForm';

function TaskEdit() {
  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2>Edit Task</h2>
      </div>
      <TaskForm />
    </div>
  );
}

export default TaskEdit;
