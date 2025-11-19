import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  accountId: string | null;
  userId: string | null;
  role: string | null;
  isAuthenticated: boolean;
  handleApiError: (error: any) => void;
  login: (token: string, accountId: string, userId: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      accountId: null,
      userId: null,
      role: null,
      isAuthenticated: false,

      login: (token, accountId, userId, role) => {
        set({
          token,
          accountId,
          userId,
          role,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          token: null,
          accountId: null,
          userId: null,
          role: null,
          isAuthenticated: false,
        })
      },

      handleApiError: (error) => {
        const status = error?.response?.status

        if (status === 401 || status === 403) {
          console.log("Token hết hạn → Auto logout")
          get().logout()
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  ) as unknown as StateCreator<AuthState>
)