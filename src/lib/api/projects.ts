import dayjs from "dayjs";
import { supabase } from "../supabase";
import type { Stat } from "./stats";
import type { Task } from "./tasks";

export type Project = {
  id: string;
  stat: Stat;
  user_id: string;
  title: string;
  description?: string;
  start_date: string;
  due_date: string;
  end_date?: string;
  tasks: Task[];
  // options
  total_minutes?: number;
  drive_folder_id?: string;
};

export type ProjectUpdate = Partial<Omit<Project, "id" | "user_id" | "stat">>;

export async function createProject(userId: string, statId: string) {
  const today = dayjs();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      stat_id: statId,
      title: "New Project",
      start_date: today,
      due_date: today.endOf("isoWeek"),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: ProjectUpdate) {
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
    .select("*, stat:stats (id, name), tasks (*)")
    .eq("id", projectId)
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectsInRange(
  start: string,
  end: string,
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .lte("start_date", end)
    .gte("due_date", start);

  if (error) throw error;
  return data;
}
