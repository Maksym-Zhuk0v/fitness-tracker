"use client";

import React, { useEffect, useState } from "react";
import { WorkoutCalendar } from "./workout-calender";
import { useUserStore } from "@/hooks/useUserStore";
import { fetchUserWorkouts } from "@/services/workoutService";
import { ExerciseStats } from "./Exercise-stats";
import { fetchGroups } from "@/services/exerciseService";
import { Loader } from "lucide-react";

const Stats = () => {
  const { user } = useUserStore();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [groupStats, setGroupStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    fetchUserWorkouts(user.id)
      .then(setWorkouts)
      .catch(console.error)
      .finally(() => setLoading(false));
    fetchGroups(user.id)
      .then(setGroupStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const fetchedStats = groupStats.reduce((acc: any, row: any) => {
    const g = row.exercises.group;
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const formattedStats = Object.entries(fetchedStats).map(([group, count]) => ({
    group,
    count: count as number,
  }));

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center gap-6 mt-6">
      {workouts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Your have to start working out
        </p>
      ) : (
        <>
          <WorkoutCalendar workoutDates={workouts.map((w) => w.created_at)} />
          <ExerciseStats stats={formattedStats} />
        </>
      )}
    </div>
  );
};

export default Stats;
