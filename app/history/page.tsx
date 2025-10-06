import { CreateWorkoutDialog } from "@/components/workout/CreateWorkoutDialog";
import { WorkoutHistory } from "@/components/workout/WorkoutHistory";
import React from "react";

const page = () => {
  return (
    <div>
      <CreateWorkoutDialog />
      <WorkoutHistory />
    </div>
  );
};

export default page;
