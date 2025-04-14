import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('spotify_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
  
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration, e.g., redirect to login
      sessionStorage.removeItem('spotify_access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;