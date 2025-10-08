"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUserStore } from "@/hooks/useUserStore";

export default function CreateExerciseForm() {
  const [exerciseName, setExerciseName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useUserStore();

  useEffect(() => console.log(user), [user]);

  const fetchGroups = async () => {
    const { data, error } = await supabase.from("exercises").select("group");
    if (error) {
      console.error(error);
      return;
    }
    const uniqueGroups = Array.from(
      new Set(data.map((ex) => ex.group).filter(Boolean))
    );
    setGroups(uniqueGroups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = exerciseName.trim();
    const trimmedGroup = newGroupName.trim();

    if (!trimmedName) return;

    let groupValue = selectedGroup;
    if (selectedGroup === "new") {
      if (!trimmedGroup) return;
      groupValue = trimmedGroup;
    }
    if (!groupValue) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("exercises").insert({
      name: trimmedName,
      group: groupValue,
    });

    if (error) {
      console.error(error);
      setMessage("Error creating exercise.");
    } else {
      setExerciseName("");
      setNewGroupName("");
      setSelectedGroup(null);
      setMessage("Exercise created successfully!");
      await fetchGroups();
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-3xl min-w-2xl">
      <CardHeader>
        <CardTitle>Create New Exercise</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Exercise name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />

          <Select
            onValueChange={(val) => setSelectedGroup(val)}
            value={selectedGroup || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose group" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Create new group</SelectItem>
            </SelectContent>
          </Select>

          {selectedGroup === "new" && (
            <Input
              placeholder="New group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>

          {message && (
            <p className="text-sm text-center text-muted-foreground">
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
