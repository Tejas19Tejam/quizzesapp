import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_DOMAIN}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
