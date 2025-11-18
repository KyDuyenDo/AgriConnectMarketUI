import axios from "axios"

const baseURL = process.env.REACT_APP_API_BASE_URL

const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;