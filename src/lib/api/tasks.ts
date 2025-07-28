import { supabase } from "../supabase";

export type Task = {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  status: "next" | "done" | "cancelled" | "someday" | "waiting";
  due_date?: string;
  due_time?: string;
  duration_minutes: number;
};

export async function createTask(
  userId: string,
  stateId: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      stat_id: stateId,
      project_id: projectId,
      title: "New Task",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Task, "id">>,
) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTasksByProject(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId);

  if (error) throw error;
  return data;
}
