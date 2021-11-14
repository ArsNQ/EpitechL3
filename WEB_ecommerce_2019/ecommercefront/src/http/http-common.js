import axios from "axios";
import config from './config'

const HTTP = axios.create({
  baseURL: config.api_url
});

HTTP.interceptors.request.use(config => {
  // config.headers["Content-Type"] = "application/json";
  config.headers["Authorization"] = localStorage.getItem('access_token');
  return config;
});

HTTP.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export { HTTP };