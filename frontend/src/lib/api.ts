import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: {
    studentId: string;
    name: string;
    email: string;
    password: string;
    year: number;
    major: string;
  }) => api.post('/auth/register', data),
};

// Courses API
export const coursesAPI = {
  getAllCourses: (params?: {
    semester?: string;
    year?: number;
    department?: string;
    search?: string;
  }) => api.get('/courses', { params }),
  
  getCourse: (id: string) => api.get(`/courses/${id}`),
  
  getDepartments: () => api.get('/courses/meta/departments'),
};

// Registrations API
export const registrationsAPI = {
  getMyCourses: () => api.get('/registrations/my-courses'),
  
  registerForCourse: (courseId: string) =>
    api.post('/registrations/register', { courseId }),
  
  dropCourse: (courseId: string) =>
    api.delete(`/registrations/drop/${courseId}`),
};

export default api;
