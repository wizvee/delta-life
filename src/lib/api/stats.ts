import { supabase } from "../supabase";

export async function getStats(userId: string) {
  const { data, error } = await supabase
    .from("stats")
    .select("id, name")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}
