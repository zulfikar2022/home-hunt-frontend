import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL, // Automatically prepends this to all requests
  withCredentials: true, // If using authentication cookies
});
