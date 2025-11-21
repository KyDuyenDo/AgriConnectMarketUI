import axios from "axios"
import { Platform } from "react-native";
import { useAuthStore } from "@/stores/auth";


export const getBackendURL = (): string => {
    if (Platform.OS === "web") {
        return process.env.REACT_APP_API_BASE_URL || "http://192.168.1.6:5170";
    }

    if (Platform.OS === "ios") {
        return "http://192.168.1.6:5170";
    }

    return "http://192.168.1.6:5170";
};

const baseURL = getBackendURL();

const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.response.use(
    response => {
        // console.log('Response:', response);
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use(
    config => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;