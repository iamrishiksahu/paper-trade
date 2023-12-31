import axios from 'axios'
import { api_base_url } from '../app/constants';

export const axiosInstance = axios.create({
  baseURL: api_base_url,
});

export const axiosPrivate = axios.create({

  baseURL: api_base_url,
  headers: { 'Content-Type' : 'application/json' },
  withCredentials: true
});


