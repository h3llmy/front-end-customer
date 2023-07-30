import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const fetchApi = axios.create({
  baseURL: publicRuntimeConfig.BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    "ngrok-skip-browser-warning": "any",
  },
});
