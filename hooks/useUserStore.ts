"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface UserState {
  user: any | null;
  loading: boolean;
  role: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: any | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  role: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return set({ user: null, loading: false, role: null });
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", data.user?.id)
      .single();
    set({ role: profile?.role || "did not fetch role" });
    set({
      loading: false,
      user: {
        ...profile,
        full_name: data.user?.user_metadata.full_name,
        email: data.user?.email,
        user_metadata: data.user?.user_metadata,
      },
    });
  },
}));
