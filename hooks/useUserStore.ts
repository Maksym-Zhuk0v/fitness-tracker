"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface UserState {
  user: any | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: any | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ loading: false, user });
  },
}));

supabase.auth.onAuthStateChange((_event, session) => {
  useUserStore.getState().setUser(session?.user || null);
});
