import { supabase } from "@/lib/supabaseClient";
import { UUID } from "crypto";

export const fetchExercises = async () => {
  const { data, error } = await supabase.from("exercises").select("*");
  if (error) throw error;
  return data;
};

export const fetchGroups = async (userId: UUID) => {
  const { data, error } = await supabase
    .from("sets")
    .select(
      "exercise_name, exercises!inner(group), workout_id, workouts(created_at)"
    )
    .eq("workouts.user_id", userId);
  if (error) throw error;

  return data;
};
