import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app'
});

const AuthService = {
  login: async (correo: string, password: string) => {
    try {
      const response = await instance.post('/auth/login', {
        correo,
        password
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default AuthService;
