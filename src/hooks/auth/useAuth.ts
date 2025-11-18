import { loginApi, registerApi } from "@/api/auth";
import { LoginRequest } from "@/types";
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => useMutation({
    mutationKey: ['login'],
    mutationFn: (loginRequest: LoginRequest) => loginApi(loginRequest)
});

export const useRegister = () => useMutation({
    mutationKey: ['register'],
    mutationFn: (registerRequest: FormData) => registerApi(registerRequest)
});
