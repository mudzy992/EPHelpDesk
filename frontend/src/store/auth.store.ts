import { create } from 'zustand';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  organizationalUnitId: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

// FAZA 5 (TASKS.md): popuniti pravim MSAL login flow-om.
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (token, user) => set({ token, user }),
  clearSession: () => set({ token: null, user: null }),
}));
