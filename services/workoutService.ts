import { supabase } from "@/lib/supabaseClient";

export const createWorkout = async (userId: string, name: string) => {
  console.log(userId);
  const { data, error } = await supabase
    .from("workouts")
    .insert([{ name, user_id: userId }])
    .select("id")
    .single();
  if (error) throw error;
  return data;
};

export const addSetsToWorkout = async (
  workoutId: number,
  blocks: {
    exercise_name: string;
    sets: { reps: number; weight: number }[];
  }[]
) => {
  const inserts = blocks.map((block) => ({
    exercise_name: block.exercise_name,
    set_index: block.sets.map((_, i) => i + 1),
    set_reps: block.sets.map((s) => s.reps),
    set_weight: block.sets.map((s) => s.weight),
    workout_id: workoutId,
  }));

  const { error } = await supabase.from("sets").insert(inserts);
  if (error) throw error;
};

export const fetchUserWorkouts = async (userId: string) => {
  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id,
      created_at,
      name,
      sets (
        id,
        set_reps,
        set_weight,
        exercise_name
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
