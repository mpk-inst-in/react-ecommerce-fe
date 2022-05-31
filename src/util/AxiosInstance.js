import axios from 'axios';

// axios global settings

const API_BASE_URL = 'https://ecommce-be.herokuapp.com/ecomm/api/v1/'

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})