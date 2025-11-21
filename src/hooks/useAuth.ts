import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService, { AuthResponse } from "@/services/auth.service";
import { LoginRequest, RegisterRequest, UserData } from "@/types";

// Query Keys
const AUTH_QUERY_KEYS = {
    currentUser: ["auth", "currentUser"] as const,
};

// ======================================================
// 1️⃣ LOGIN
// ======================================================
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),

        onSuccess: (data: AuthResponse) => {
            // Cache user data after successful login
            queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, data.user);
        },
    });
};

// ======================================================
// 2️⃣ REGISTER
// ======================================================
export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: RegisterRequest) => AuthService.register(userData),

        onSuccess: (data: AuthResponse) => {
            // Cache user data after successful registration
            queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, data.user);
        },
    });
};

// ======================================================
// 3️⃣ LOGOUT
// ======================================================
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => AuthService.logout(),

        onSuccess: () => {
            // Clear user data from cache
            queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
        },
    });
};

// ======================================================
// 4️⃣ GET CURRENT USER
// ======================================================
export const useCurrentUser = () => {
    return useQuery<UserData>({
        queryKey: AUTH_QUERY_KEYS.currentUser,
        queryFn: () => AuthService.getCurrentUser(),
    });
};
