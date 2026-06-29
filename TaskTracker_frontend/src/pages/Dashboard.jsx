import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import ErrorAlert from '../components/ErrorAlert';
import taskService from '../services/taskService';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [filters, setFilters] = useState({
    status: 'ALL',
    priority: 'ALL',
    sort: '',
    page: 0,
    size: 5
  });

  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    number: 0
  });

  const fetchTasks = async (currentFilters) => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(currentFilters);
      
      // Handle paginated response { content: [], totalPages, number }
      if (Array.isArray(data)) {
        setTasks(data);
        setPageInfo({ totalPages: 1, number: 0 });
      } else {
        setTasks(data.content || []);
        setPageInfo({
          totalPages: data.totalPages || 0,
          number: data.number || 0
        });
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    // Reset to page 0 if filters like status, priority or sort change
    setFilters({ ...newFilters, page: 0 });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleResetFilters = () => {
    setFilters({ status: 'ALL', priority: 'ALL', sort: '', page: 0, size: 5 });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        // Refetch tasks after deletion to maintain pagination integrity
        fetchTasks(filters);
        
        setSuccessMessage('Task deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Failed to delete task:', err);
        setError(err);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      if (!taskToUpdate) return;
      
      const updatedTask = { ...taskToUpdate, status: 'DONE' };
      await taskService.updateTask(id, updatedTask);
      
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
      
      setSuccessMessage('Task marked as completed.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to complete task:', err);
      setError(err);
    }
  };

  return (
    <div className="dashboard page-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <FilterBar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onReset={handleResetFilters} 
      />
      
      <ErrorAlert error={error} onDismiss={() => setError(null)} />
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      ) : (
        <>
          <TaskList 
            tasks={tasks} 
            onDelete={handleDelete} 
            onComplete={handleComplete} 
          />
          <Pagination 
            currentPage={pageInfo.number} 
            totalPages={pageInfo.totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
