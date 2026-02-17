import { create } from "zustand";
import { encrypt, decrypt } from "../lib/encryption-utils";

interface AuthState {
  email: string | null;
  token: string | null;
  role: string | null;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  token: null,
  role: null,

  setEmail: (email: string) => {
    set({ email });
    sessionStorage.setItem("email", encrypt(email));
  },

  setToken: (token: string) => {
    set({ token });
    localStorage.setItem("token", token); // You weren't encrypting token in Redux either
  },

  setRole: (role: string) => {
    set({ role });
    sessionStorage.setItem("role", role);
  },

  logout: () => {
    set({ email: null, token: null, role: null });
    sessionStorage.removeItem("email");
    localStorage.removeItem("token");
    sessionStorage.removeItem("role");
  },

  restoreSession: () => {
    const storedEmail = decrypt(sessionStorage.getItem("email") || "");
    const storedToken = localStorage.getItem("token"); // token wasn't encrypted
    const storedRole = sessionStorage.getItem("role");

    set({
      email: storedEmail || null,
      token: storedToken || null,
      role: storedRole || null,
    });
  },
}));
