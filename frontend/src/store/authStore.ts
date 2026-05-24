import {
  create,
} from "zustand";

import api
from "../services/api";

type User = {

  _id: string;

  username: string;

  email: string;

  avatar?: string;

  tagline?: string;

  bio?: string;
};

type AuthStore = {

  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;

  login: (
    user: User
  ) => void;

  logout: () => void;

  checkAuth: () => Promise<void>;
};

export const useAuthStore =
  create<AuthStore>(
    (set) => ({

      user: null,

      isAuthenticated: false,

      loading: true,

      login: (user) =>

        set({

          user,

          isAuthenticated: true,
        }),

      logout: () =>

        set({

          user: null,

          isAuthenticated: false,
        }),

      checkAuth:
        async () => {

          try {

            const res =
              await api.get(
                "/auth/me"
              );

            set({

              user: res.data,

              isAuthenticated: true,

              loading: false,
            });

          } catch {

            set({

              user: null,

              isAuthenticated: false,

              loading: false,
            });
          }
        },
    })
  );