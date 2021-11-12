import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://wilderstory.herokuapp.com/api',
});

export default AXIOS;
