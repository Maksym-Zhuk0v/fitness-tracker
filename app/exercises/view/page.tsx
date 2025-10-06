"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GroupSelect from "@/components/group-select";
interface Exercise {
  id: number;
  name: string;
  group: string;
}

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<Exercise | null>(null);
  const [editName, setEditName] = useState("");
  const [editGroup, setEditGroup] = useState("");

  const fetchExercises = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("exercises")
      .select("id, name, group")
      .order("group", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setExercises(data || []);
      const uniqueGroups = Array.from(new Set(data.map((ex) => ex.group)));
      setGroups(uniqueGroups);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("exercises").delete().eq("id", id);
    if (error) console.error(error);
    else setExercises((prev) => prev.filter((ex) => ex.id !== id));
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!editing) return;
    if (!editName || !editGroup) return;

    setLoading(true);

    const { error } = await supabase
      .from("exercises")
      .update({ name: editName, group: editGroup })
      .eq("id", editing.id);

    if (error) console.error(error);
    else
      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === editing.id
            ? { ...ex, name: editName, group: editGroup }
            : ex
        )
      );

    setEditing(null);
    setLoading(false);
    await fetchExercises();
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="mxn-w-2xl mx-auto mt-10 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">All Exercises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative max-h-96 overflow-y-auto">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercises"
            className="mt-2"
          />
          {loading && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
          {!loading && exercises.length === 0 && (
            <p className="text-sm text-muted-foreground">No exercises yet.</p>
          )}

          <div className="space-y-4">
            {exercises
              .filter((exercise) =>
                exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((exercise, idx) => (
                <div key={exercise.id}>
                  <div className="flex items-center justify-between p-3 rounded-md bg-muted/40 gap-8">
                    <div>
                      <p className="font-medium text-base">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.group}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog
                        open={editing?.id === exercise.id}
                        onOpenChange={(open) => {
                          if (open) {
                            setEditing(exercise);
                            setEditName(exercise.name);
                            setEditGroup(exercise.group);
                          } else {
                            setEditing(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary">
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Exercise</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Name</Label>
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </div>
                            <GroupSelect
                              groups={groups}
                              value={editGroup}
                              onChange={setEditGroup}
                            />
                            <Button
                              className="w-full"
                              onClick={handleUpdate}
                              disabled={loading}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(exercise.id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  {idx !== exercises.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
