import axios from 'axios';

const api = axios.create({
  baseURL: 'https://zoo-api-2ivv.onrender.com/api/v1/',
});
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/v1/',
 
// });


// Request interceptor to add token to headers
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle response data and errors
api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default api;