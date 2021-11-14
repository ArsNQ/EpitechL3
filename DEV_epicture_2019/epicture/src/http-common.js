import axios from 'axios';

const API_URL = 'https://api.imgur.com/3/';

const HTTP = axios.create({
  baseURL: API_URL,
});

HTTP.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  config.headers['Authorization'] = 'Client-ID 49f02dc10a47476';
  return config;
});

HTTP.interceptors.response.use(
  response => response,
  error => {
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  },
);

export {HTTP};
