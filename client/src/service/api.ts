import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:6969/api",
  baseURL: "https://localhost/api",
});

export default api;
