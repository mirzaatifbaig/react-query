// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://6813b99f225ff1af16270430.mockapi.io", // Replace with your base URL
    headers: {
        "Content-Type": "application/json",
        // Add any default headers like Authorization if needed
    },
});

export default axiosInstance;
