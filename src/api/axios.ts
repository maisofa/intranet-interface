import axios from "axios";

const baseUrl = "http://localhost:3001/";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});