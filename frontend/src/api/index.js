import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Designs
export const getDesigns = (category) =>
  API.get('/designs', { params: category ? { category } : {} });
export const getDesignById = (id) => API.get(`/designs/${id}`);
export const createDesign = (data) => API.post('/designs', data);
export const updateDesign = (id, data) => API.put(`/designs/${id}`, data);
export const deleteDesign = (id) => API.delete(`/designs/${id}`);

// Enquiries
export const submitEnquiry = (data) => API.post('/enquiries', data);
export const getEnquiries = () => API.get('/enquiries');
export const updateEnquiryStatus = (id, status) => API.put(`/enquiries/${id}`, { status });
export const deleteEnquiry = (id) => API.delete(`/enquiries/${id}`);

export default API;
