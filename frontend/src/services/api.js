import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://personal-expense-tracker-5nma.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Expense API calls
export const expenseAPI = {
  // Get all expenses with filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.month) params.append('month', filters.month);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    
    const response = await api.get(`/expenses?${params.toString()}`);
    return response.data;
  },

  // Get single expense
  getById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Create expense
  create: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  update: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  delete: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  // Get summary stats
  getSummary: async () => {
    const response = await api.get('/expenses/summary/stats');
    return response.data;
  }
};

export default api;
