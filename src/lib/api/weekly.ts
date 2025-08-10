import { supabase } from "../supabase";

export async function fetchWeeklyGoalsByWeek(weekStart: string) {
  const { data, error } = await supabase
    .from("weekly_goals")
    .select("id,is_completed")
    .eq("week_start", weekStart);
  if (error) throw error;
  return data as { id: string; is_completed: boolean }[];
}

type LogRow = { duration: number | null };

export async function fetchWeeklyTotalMinutes(monday: string, sunday: string) {
  const { data, error } = await supabase
    .from("task_logs")
    .select("duration")
    .gte("start_time", monday)
    .lte("start_time", sunday)
    .not("end_time", "is", null);

  if (error) throw error;

  const rows = (data as LogRow[]) ?? [];
  return rows.reduce((sum, r) => sum + (r.duration ?? 0), 0);
}
