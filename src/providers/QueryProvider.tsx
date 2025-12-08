import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { AuthListener } from "@/components/auth/AuthListener"

interface QueryProviderProps {
  children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Aggressive refreshing settings
            staleTime: 0, // Data is considered stale immediately
            gcTime: 1000 * 60 * 5, // Garbage collect unused data after 5 mins
            refetchOnMount: true, // Refetch when component mounts
            refetchOnWindowFocus: true, // Refetch when app comes into focus
            refetchOnReconnect: true, // Refetch when network reconnects
            retry: 1,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener>
        {children}
      </AuthListener>
    </QueryClientProvider>
  )
}
