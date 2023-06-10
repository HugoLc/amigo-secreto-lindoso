import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_ENVIROMENT === "prod"
      ? "/api"
      : "http://localhost:6969/api",
});

export default api;
