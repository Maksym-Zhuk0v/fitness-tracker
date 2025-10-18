"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LoginForm } from "./login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useUserStore } from "@/hooks/useUserStore";
import { uploadUserPhoto } from "@/services/uploadProfilePhoto";

interface Profile {
  user_id: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  avatar_url?: string;
}

export default function UserDashboard() {
  const { user, loading } = useUserStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (!error) setProfile(data);
    };
    fetchProfile();
  }, [user]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user) return;
    const file = e.target.files[0];

    try {
      if (profile?.avatar_url) {
        const path = profile.avatar_url.split("/storage/v1/object/public/")[1];
        await supabase.storage.from("profile-photos").remove([path]);
      }

      const avatarUrl = await uploadUserPhoto(file, user.id);
      setProfile((prev) => (prev ? { ...prev, avatar_url: avatarUrl } : prev));
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("users")
      .update({
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
      })
      .eq("id", user.id);
    setSaving(false);
    if (!error) setEditing(false);
  };

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
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profile?.avatar_url}
              alt={profile?.name || "User"}
              className="object-cover object-center"
            />
            <AvatarFallback>
              {(profile?.name || user.email)?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="text-sm"
              />
            )}
            <h2 className="text-lg font-semibold">
              {profile?.name || user.user_metadata?.full_name || "User"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {editing ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={profile?.age || ""}
                onChange={(e) =>
                  setProfile((p) => (p ? { ...p, age: +e.target.value } : p))
                }
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Input
                value={profile?.gender || ""}
                onChange={(e) =>
                  setProfile((p) => (p ? { ...p, gender: e.target.value } : p))
                }
              />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={profile?.height || ""}
                onChange={(e) =>
                  setProfile((p) => (p ? { ...p, height: +e.target.value } : p))
                }
              />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={profile?.weight || ""}
                onChange={(e) =>
                  setProfile((p) => (p ? { ...p, weight: +e.target.value } : p))
                }
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline">Age: {profile?.age || "-"}</Badge>
            <Badge variant="outline">Gender: {profile?.gender || "-"}</Badge>
            <Badge variant="outline">Height: {profile?.height || "-"} cm</Badge>
            <Badge variant="outline">Weight: {profile?.weight || "-"} kg</Badge>
          </div>
        )}

        <div className="flex gap-2">
          {editing ? (
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          ) : (
            <Button onClick={() => setEditing(true)}>Update</Button>
          )}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
