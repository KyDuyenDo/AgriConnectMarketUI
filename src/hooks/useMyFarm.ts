import { useQuery } from "@tanstack/react-query";
import FarmService from "@/services/farm.service";
import { useAuthStore } from "@/stores/auth";

export function useMyFarm() {
    const { accountId } = useAuthStore();

    return useQuery({
        queryKey: ["my-farm"],
        queryFn: FarmService.getFarmByMe,
        enabled: !!accountId,
    });
}
