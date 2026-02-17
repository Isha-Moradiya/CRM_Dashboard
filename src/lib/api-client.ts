import axios from "axios";
import { env } from "../config/env";
import { InternalAxiosRequestConfig } from "axios";

const STATIC_TOKEN = env.STATIC_TOKEN; 

// Create Axios instance
export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (STATIC_TOKEN) {
    config.headers.Authorization = `Bearer ${STATIC_TOKEN}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
