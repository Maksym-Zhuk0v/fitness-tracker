"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/hooks/useUserStore";
import { fetchUserWorkouts } from "@/services/workoutService";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader } from "lucide-react";

export const WorkoutHistory = () => {
  const { user } = useUserStore();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    if (!user) return;

    setLoading(true);

    fetchUserWorkouts(user.id)
      .then(setWorkouts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-auto mt-6 max-w-3xl">
      {workouts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You have to start working out
        </p>
      ) : (
        workouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle>
                {workout.name} –{" "}
                {new Date(workout.created_at).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {workout.sets.map(
                  (set: {
                    id: number;
                    exercise_name: string;
                    set_reps: number[];
                    set_weight: number[];
                  }) => (
                    <div
                      key={set.id}
                      className="p-2 border rounded-md bg-muted space-y-1"
                    >
                      <p className="font-medium">Set {set.exercise_name}</p>
                      {set.set_reps.map((rep, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          Reps: {rep}, Weight: {set.set_weight[idx] ?? "-"}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
