import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://wilderstory.herokuapp.com/api',
});

AXIOS.defaults.withCredentials = false;

export default AXIOS;
