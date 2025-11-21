import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};
