import { LoginRequest } from "@/types";
import apiClient from "./config";


export const loginApi = async (loginRequest: LoginRequest) => {
    const response = await apiClient.post('/api/auth/login', loginRequest);
    return response.data;
}

export const registerApi = async (request: FormData) => {
    const response = await apiClient.post('/api/auth/register', request,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
}

export const register = async (formData: FormData) => {
    const response = await apiClient.post("/api/auth/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response.data;
}

export const verifyOtp = async (email: string, otp: string) => {
    const response = await apiClient.post('/api/auth/verify-otp', { email, otp });
    return response.data;
}

export const resetPassword = async (request: any) => {
    const response = await apiClient.post('/api/auth/reset-password', request);
    return response.data;
}
