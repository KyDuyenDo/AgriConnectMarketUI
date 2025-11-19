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