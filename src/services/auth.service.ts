import apiClient from "@/api/config";
import { LoginRequest, RegisterRequest, UserData } from "@/types";

const BASE_URL = "/auth";

export interface AuthResponse {
    token: string;
    user: UserData;
}

export const AuthService = {
    /**
     * Đăng nhập (POST /auth/login)
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        try {
            const res = await apiClient.post<AuthResponse>(`${BASE_URL}/login`, credentials);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi đăng nhập:", error);
            throw error;
        }
    },

    /**
     * Đăng ký tài khoản mới (POST /auth/register)
     */
    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        try {
            const formData = new FormData();
            formData.append("Username", userData.Username);
            formData.append("Password", userData.Password);
            formData.append("Email", userData.Email);
            formData.append("FullName", userData.FullName);
            formData.append("Phone", userData.Phone);
            formData.append("IsFarmer", String(userData.IsFarmer));

            if (userData.Avatar) {
                formData.append("Avatar", userData.Avatar);
            }

            const res = await apiClient.post<AuthResponse>(`${BASE_URL}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi đăng ký:", error);
            throw error;
        }
    },

    /**
     * Đăng xuất (POST /auth/logout)
     */
    logout: async (): Promise<void> => {
        try {
            await apiClient.post(`${BASE_URL}/logout`);
        } catch (error) {
            console.error("❌ Lỗi đăng xuất:", error);
            throw error;
        }
    },

    /**
     * Lấy thông tin người dùng hiện tại (GET /auth/me)
     */
    getCurrentUser: async (): Promise<UserData> => {
        try {
            const res = await apiClient.get<UserData>(`${BASE_URL}/me`);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy thông tin người dùng:", error);
            throw error;
        }
    },
};

export default AuthService;
