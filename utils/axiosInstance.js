import axios from "axios"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = `${process.env.BaseURL}`
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
