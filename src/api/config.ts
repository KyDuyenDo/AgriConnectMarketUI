import axios from "axios"
import { Platform } from "react-native";
import { useAuthStore } from "@/stores/auth";


import Constants from "expo-constants";

export const getBackendURL = (): string => {
    // 1. Web environment
    if (Platform.OS === "web") {
        return process.env.REACT_APP_API_BASE_URL || "http://localhost:5170";
    }

    // 2. Running on physical device (via Expo Go or Development Build)
    // Constants.expoConfig.hostUri contains the IP of the machine running Metro
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
        // hostUri is like "192.168.1.6:8081" -> we want "192.168.1.6"
        const ip = hostUri.split(":")[0];
        return `http://${ip}:5170`;
    }

    // 3. Android Emulator (AVD) specific alias
    if (Platform.OS === "android") {
        return "http://10.0.2.2:5170";
    }

    // 4. iOS Simulator (localhost works)
    if (Platform.OS === "ios") {
        return "http://localhost:5170";
    }

    // Fallback
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
        console.log(JSON.stringify(response.data, null, 2));
        return response;
    },
    error => {
        //console.dir(error.response, { depth: null });
        if (error.response && error.response.status === 400 && error.response.data.message === "User not authenticated!") {
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
