import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-appointment-system-4x21.onrender.com/api",
});

export default API;