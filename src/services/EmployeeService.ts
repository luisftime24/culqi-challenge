// EmployeeService.ts

import axios from 'axios';
import { useSessionStore } from '../store/session';

const instance = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app',
});

const EmployeeService = {
  getEmployees: async (limit: number) => {
    try {
      const sessionStore = useSessionStore();
      const token = sessionStore.user.data.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await instance.get(`/empleados?limit=${limit}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default EmployeeService;
