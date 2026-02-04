import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService, type AddToCartRequest, type UpdateCartItemRequest } from "@/services/cart.service"
import { CART_QUERY_KEYS } from "@/constants/queryKeys"

export { CART_QUERY_KEYS }

export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.all,
    queryFn: async () => {
      const cart = await cartService.getCart()
      return cart
    },
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (item: AddToCartRequest) => cartService.addToCart(item.cartId, item.batchId, item.quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all })
    },
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCartItemRequest) => cartService.updateCartItem(data.cartId, data.batchId, data.quantity),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEYS.all })

      const previousCart = queryClient.getQueryData(CART_QUERY_KEYS.all)

      queryClient.setQueryData(CART_QUERY_KEYS.all, (old: any) => {
        if (!old) return old

        const newCart = { ...old }

        newCart.cartItems = newCart.cartItems.map((group: any) => ({
          ...group,
          items: group.items.map((item: any) => {
            if (item.batchId === data.batchId) {
              return { ...item, quantity: data.quantity }
            }
            return item
          }),
        }))

        return newCart
      })

      return { previousCart }
    },

    onError: (err, newTodo, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEYS.all, context.previousCart)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all })
    },
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (batchId: string) => cartService.removeFromCart(batchId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all })
    },
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartId: string) => cartService.clearCart(cartId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all })
    },
  })
}
