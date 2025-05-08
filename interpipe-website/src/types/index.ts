export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type Theme = 'light' | 'dark';

export interface ErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
} 