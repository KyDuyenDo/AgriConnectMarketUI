import { LoginRequest } from "@/types";
import axios from "axios";

export const loginApi = async (loginRequest: LoginRequest) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, loginRequest);
    return response.data;
}

export const registerApi = async (request: FormData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, request,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
}