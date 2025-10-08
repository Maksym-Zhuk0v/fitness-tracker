"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { LoginForm } from "./login-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Loader } from "lucide-react";
import { useUserStore } from "@/hooks/useUserStore";

interface Profile {
  user_id: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
}

export default function UserDashboard() {
  const { user, loading } = useUserStore();
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Logout error:", error);

    setProfile(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="animate-spin" />
      </div>
    );

  if (!user) return <LoginForm />;

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={profile?.name || "User"}
            />
            <AvatarFallback>
              {(profile?.name || user.email)?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {profile?.name || user.user_metadata?.full_name || "User"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Badge variant="outline">Age: {profile?.age || "-"}</Badge>
          <Badge variant="outline">Gender: {profile?.gender || "-"}</Badge>
          <Badge variant="outline">Height: {profile?.height || "-"} cm</Badge>
          <Badge variant="outline">Weight: {profile?.weight || "-"} kg</Badge>
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
