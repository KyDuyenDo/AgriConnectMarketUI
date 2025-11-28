import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";

export const AuthListener = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            // Clear all queries when user logs out
            queryClient.removeQueries();
            // Also invalidate to ensure any active queries refetch if they are still mounted (though typically navigation changes)
            queryClient.invalidateQueries();
        }
    }, [isAuthenticated, queryClient]);

    return <>{children}</>;
};
