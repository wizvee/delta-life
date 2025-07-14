import { supabase } from "../supabase";

export async function getStats(userId: string) {
  const { data, error } = await supabase
    .from("stats")
    .select("id, name")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function getStat(statId: string) {
  const { data, error } = await supabase
    .from("stats")
    .select("id, name")
    .eq("statId", statId);

  if (error) throw error;
  return data;
}
