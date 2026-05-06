import { create } from "zustand";

import api from "../services/api";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthStore {

  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>(
  (set) => ({

    user: null,

    loading: true,

    isAuthenticated: false,

    login: async (
      email,
      password
    ) => {

      try {

        const res = await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

        set({
          user: res.data.user,

          isAuthenticated: true,
        });

      } catch (error) {

        console.log(error);
      }
    },

    logout: async () => {

      try {

        await api.post("/auth/logout");

        set({
          user: null,

          isAuthenticated: false,
        });

      } catch (error) {

        console.log(error);
      }
    },

    checkAuth: async () => {

      try {

        const res = await api.get(
          "/auth/me"
        );

        set({
          user: res.data,

          isAuthenticated: true,

          loading: false,
        });

      } catch (error) {

        set({
          user: null,

          isAuthenticated: false,

          loading: false,
        });
      }
    },
  })
);

export default useAuthStore;