import { supabase } from "@/lib/supabaseClient";

export const fetchSets = async () => {
  const { data, error } = await supabase.from("sets").select("*").eq("id", 1);
  if (error) throw error;
  return data;
};
