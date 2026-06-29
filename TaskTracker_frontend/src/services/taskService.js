import taskApi from '../api/taskApi';

const taskService = {
  getTasks: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters.priority && filters.priority !== 'ALL') params.append('priority', filters.priority);
      if (filters.sort) params.append('sort', filters.sort);
      
      params.append('page', filters.page || 0);
      params.append('size', filters.size || 5);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
      const response = await taskApi.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks in taskService:', error);
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await taskApi.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id} in taskService:`, error);
      throw error;
    }
  },

  formatPayload: (task) => {
    const payload = { ...task };
    // Date is sent as YYYY-MM-DD which matches LocalDate on backend
    // Send both flat ID and nested object to satisfy different backend relationship mappings
    if (payload.projectId) {
      const idNum = parseInt(payload.projectId, 10);
      payload.projectId = idNum;
      payload.project = { id: idNum };
    }
    return payload;
  },

  createTask: async (task) => {
    try {
      const payload = taskService.formatPayload(task);
      const response = await taskApi.post('/tasks', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating task in taskService:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const payload = taskService.formatPayload(task);
      const response = await taskApi.put(`/tasks/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id} in taskService:`, error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await taskApi.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task ${id} in taskService:`, error);
      throw error;
    }
  },

  getProjects: async () => {
    try {
      const response = await taskApi.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects in taskService:', error);
      throw error;
    }
  },
};

export default taskService;
