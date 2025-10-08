"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/hooks/useUserStore";

export default function ExerciseLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading, role } = useUserStore();

  useEffect(() => {
    if (loading) return;
    if (role !== "admin") {
      router.push("/no-access");
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!user || role !== "admin")
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-red-600">
        You don't have access to this page.
      </div>
    );

  return <div className="p-6">{children}</div>;
}
