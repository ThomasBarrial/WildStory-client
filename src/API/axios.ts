import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export default AXIOS;
