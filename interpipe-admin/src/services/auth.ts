import axios from 'axios';
import type { User } from '../types';

// Fix URL construction - ensure we have proper URL formatting
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const API_PATH = import.meta.env.VITE_API_BASE_PATH ?? '/api';

export async function login(email: string, password: string) {
  // Ensure API_URL doesn't end with slash and API_PATH starts with slash
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const apiPath = API_PATH.startsWith('/') ? API_PATH : `/${API_PATH}`;
  
  const response = await axios.post(`${baseUrl}${apiPath}/auth/login`, {
    email,
    password,
  });

  const { token, user } = response.data;
  
  // Store token in localStorage
  localStorage.setItem('token', token);
  
  // Set default authorization header for all future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return { token, user };
}

export function logout() {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
}

export function getStoredToken() {
  return localStorage.getItem('token');
}

// Initialize auth state from localStorage
const storedToken = getStoredToken();
if (storedToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
} 