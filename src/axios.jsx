// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://68135e04129f6313e2110de7.mockapi.io", // Replace with your base URL
    headers: {
        "Content-Type": "application/json",
        // Add any default headers like Authorization if needed
    },
});

export default axiosInstance;
