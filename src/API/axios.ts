import axios from 'axios';
import { headers } from './setAuthHeader';

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers,
});

export default AXIOS;
