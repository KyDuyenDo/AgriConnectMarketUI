import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import PreOrderService from "@/services/preorder.service"
import type { PreOrder, Batch } from "@/types"

export const useMyPreOrders = () => {
  return useQuery<PreOrder[]>({
    queryKey: ["preorders", "me"],
    queryFn: PreOrderService.getMyPreOrders,
  })
}

export const useFarmPreOrders = (farmId?: string) => {
  return useQuery<PreOrder[]>({
    queryKey: ["preorders", "farm", farmId],
    queryFn: () => (farmId ? PreOrderService.getFarmPreOrders(farmId) : Promise.resolve([])),
    enabled: !!farmId,
  })
}

export const useAvailableBatchesByProduct = (productId?: string) => {
  return useQuery<Batch[]>({
    queryKey: ["batches", "product", productId],
    queryFn: () => (productId ? PreOrderService.getAvailableBatchesByProduct(productId) : Promise.resolve([])),
    enabled: !!productId,
  })
}

export const useLinkOrderToPreOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ preOrderId, orderId }: { preOrderId: string; orderId: string }) =>
      PreOrderService.linkOrderToPreOrder(preOrderId, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preorders"] })
    },
  })
}
