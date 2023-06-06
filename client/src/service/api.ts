import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:6969/api",
  baseURL: "http://localhost/api",
});

export default api;
