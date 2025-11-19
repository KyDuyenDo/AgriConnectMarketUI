import axios from "axios"
import { Platform } from "react-native";


export const getBackendURL = (): string => {
  if (Platform.OS === "web") {
    return process.env.REACT_APP_API_BASE_URL || "http://localhost:5170";
  }

  if (Platform.OS === "ios") {
    return "http://localhost:5170";
  }

  return "http://192.168.30.177:5170";
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
        console.log('Response:', response);
        return response;
    },
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