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
            staleTime: 1000 * 60 * 5,
            retry: 3,
            refetchOnWindowFocus: true, // Refetch data when app regains focus
            refetchOnMount: true, // Refetch data every time a screen is mounted
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
