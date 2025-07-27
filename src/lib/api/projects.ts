import { supabase } from "../supabase";
import type { Stat } from "./stats";

export type Project = {
  id: string;
  user_id: string;
  stat: Stat;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  due_date?: string;
};

export async function createProject(userId: string, statId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      stat_id: statId,
      title: "New Project",
      start_date: today.toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, "id">>,
) {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectsByStat(statId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("stat_id", statId);

  if (error) throw error;
  return data;
}

export async function getProjectById(projectId: string): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, stat:stats (id, name)")
    .eq("id", projectId)
    .single();

  if (error) throw error;
  return data;
}
