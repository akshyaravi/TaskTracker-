import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Create an Axios instance with basic configuration
const taskApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for centralized error handling
taskApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // If no response, it's likely a network error
    if (!error.response) {
      const networkError = { message: 'Network Error' };
      console.error('API Error details:', networkError);
      return Promise.reject(networkError);
    }
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const customError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    
    console.error('API Error details:', customError);
    return Promise.reject(customError);
  }
);

export default taskApi;
