import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-appointment-system-1-1euy.onrender.com/api",
});

export default API;