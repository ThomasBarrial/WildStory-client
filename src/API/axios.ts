import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://wilderstory.herokuapp.com/api',
  withCredentials: false,
});

export default AXIOS;
