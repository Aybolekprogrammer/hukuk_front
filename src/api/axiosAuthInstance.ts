import axios from 'axios';
import { getToken, removeToken } from '../utils/auth'

const axiosAuthInstance = axios.create({
  baseURL: 'https://hukuk.com.tm/api',
  timeout: 10000,
});

axiosAuthInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Token nädogry bolsa — awtomatik çykarmak we login sahypasyna ugratmak
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?redirect=/test';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
