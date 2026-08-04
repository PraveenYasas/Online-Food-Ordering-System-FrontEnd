import axios from 'axios';

// The main URL of the backend API server. This is where all the requests will be sent to.
const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

// Every request will go through this before being sent.
api.interceptors.request.use(
  (config) => {
    // Check if there is a token in LocalStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If there is a token, add it to the 'Authorization' header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;