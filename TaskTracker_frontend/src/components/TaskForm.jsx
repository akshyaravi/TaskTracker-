import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import ErrorAlert from '../components/ErrorAlert';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '', 
    projectId: ''
  });

  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingTask, setFetchingTask] = useState(isEditing);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch projects concurrently if needed, or sequentially
        const projectsData = await taskService.getProjects();
        setProjects(projectsData || []);

        if (isEditing) {
          const taskData = await taskService.getTaskById(id);
          setFormData({
            title: taskData.title || '',
            description: taskData.description || '',
            status: taskData.status || 'TODO',
            priority: taskData.priority || 'MEDIUM',
            dueDate: taskData.dueDate ? taskData.dueDate.split('T')[0] : '',
            projectId: taskData.projectId || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        setErrors({ fetch: error });
      } finally {
        setFetchingTask(false);
      }
    };
    fetchInitialData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.projectId) newErrors.projectId = 'Project is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await taskService.updateTask(id, formData);
      } else {
        await taskService.createTask(formData);
      }
      navigate('/'); // Redirect back to dashboard after success
    } catch (error) {
      console.error('Form submission failed', error);
      setErrors({ submit: error });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (fetchingTask) {
    return <div className="loading-state" style={{textAlign: 'center', padding: '3rem'}}>Loading task details...</div>;
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <ErrorAlert 
        error={errors.fetch || errors.submit} 
        onDismiss={() => setErrors(prev => ({ ...prev, fetch: null, submit: null }))} 
      />
      
      <div className="form-group">
        <label htmlFor="title">Title <span className="required">*</span></label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className={errors.title ? 'error-input' : ''}
          placeholder="Enter task title"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows="4"
          placeholder="Enter task description"
        />
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="TODO">To Do</option>
            <option value="DOING">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="form-group half-width">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="dueDate">Due Date <span className="required">*</span></label>
          <input 
            type="date" 
            id="dueDate" 
            name="dueDate" 
            value={formData.dueDate} 
            onChange={handleChange}
            className={errors.dueDate ? 'error-input' : ''}
          />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="projectId">Project <span className="required">*</span></label>
          <select 
            id="projectId" 
            name="projectId" 
            value={formData.projectId} 
            onChange={handleChange}
            className={errors.projectId ? 'error-input' : ''}
          >
            <option value="">Select a Project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.projectId && <span className="error-text">{errors.projectId}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task')}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
