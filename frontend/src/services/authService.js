import axios from 'axios';

const API_URL ='http://localhost:5000/api/auth';

// Set up Axios with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const signup = async (name, email, password) => {
  const response = await api.post('/signup', { name, email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
