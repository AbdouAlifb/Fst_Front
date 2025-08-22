import axios from 'axios';
import { API_BASE_URL } from './config';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: false, // set true if you use cookie auth
});

// Basic response normalization & error surfacing
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Optional: toast on client, or just rethrow
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      'Network/Server error';
    // console.error('[API Error]', msg);
    return Promise.reject(err);
  }
);

export default http;
