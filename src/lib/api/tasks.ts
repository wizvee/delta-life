import { supabase } from "../supabase";

export type Task = {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  status: string;
  due_date?: string;
  due_time?: string;
  end_date?: string;
  duration: number;
};

export type TaskUpdate = Partial<Omit<Task, "id" | "user_id" | "project_id">>;

export async function createTask(
  userId: string,
  projectId: string,
  dueDate: string,
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      project_id: projectId,
      title: "New Task",
      due_date: dueDate,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(
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

export async function startTask(userId: string, taskId: string) {
  const { data, error } = await supabase
    .from("task_logs")
    .insert({
      user_id: userId,
      task_id: taskId,
      start_time: new Date(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function endTask(logId: string) {
  const { data, error } = await supabase
    .from("task_logs")
    .update({
      end_time: new Date(),
    })
    .eq("id", logId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export type TaskLog = {
  id: string;
  task_id: string;
  task_title: string;
  start_time: string;
  end_time?: string;
};

export async function getCurrentTask(userId: string): Promise<TaskLog | null> {
  if (!userId) throw new Error("User ID is required to get current task");

  const { data, error } = await supabase
    .from("task_logs")
    .select("*, task:tasks(id, title)")
    .eq("user_id", userId)
    .is("end_time", null)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const task = Array.isArray(data.task) ? data.task[0] : data.task;
  return {
    id: data.id,
    task_id: data.task_id,
    task_title: task.title,
    start_time: data.start_time,
    end_time: data.end_time ?? undefined,
  };
}

export async function getTasksInRange(
  start: string,
  end: string,
): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .or(
      // (due in week) OR (end in week)
      `and(due_date.gte.${start},due_date.lt.${end}),` +
        `and(end_date.gte.${start},end_date.lt.${end})`,
    );

  if (error) throw error;
  return data;
}
