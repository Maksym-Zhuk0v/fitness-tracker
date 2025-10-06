"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Exercise {
  id: number;
  name: string;
  group: string;
}

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

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
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("exercises").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>All Exercises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
          {!loading && exercises.length === 0 && (
            <p className="text-sm text-muted-foreground">No exercises yet.</p>
          )}

          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">
                  {exercise.group}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(exercise.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
