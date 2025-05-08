import axios from 'axios';
import type { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
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