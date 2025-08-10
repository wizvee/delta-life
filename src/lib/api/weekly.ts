import { supabase } from "../supabase";

interface Props {
  monday: string;
  nextMonday?: string;
}

export type WeeklyGoalRow = {
  id: string;
  project_id: string;
  title: string;
  is_completed: boolean;
};

export async function fetchWeeklyGoalsByWeek({ monday }: Props) {
  const { data, error } = await supabase
    .from("weekly_goals")
    .select("id,project_id,title,is_completed")
    .eq("week_start", monday);
  if (error) throw error;
  return (data ?? []) as WeeklyGoalRow[];
}

type LogRow = { duration: number | null };

export async function fetchWeeklyTotalMinutes({ monday, nextMonday }: Props) {
  const { data, error } = await supabase
    .from("task_logs")
    .select("duration")
    .gte("start_time", monday)
    .lt("start_time", nextMonday)
    .not("end_time", "is", null);

  if (error) throw error;

  const rows = (data as LogRow[]) ?? [];
  return rows.reduce((sum, r) => sum + (r.duration ?? 0), 0);
}

export type StatDuration = {
  stat_id: string;
  stat_name: string;
  total_minutes: number;
};

export async function fetchWeeklyStatDurations({ monday }: Props) {
  const { data, error } = await supabase
    .from("v_weekly_stat_durations")
    .select("stat_id, stat_name, total_minutes")
    .eq("week_start", monday);

  if (error) throw error;
  if (!data) return [];
  return data as StatDuration[];
}

export type ProjectMinutesRow = {
  project_id: string;
  total_minutes: number;
};

export async function fetchWeeklyProjectMinutes({ monday }: Props) {
  const { data, error } = await supabase
    .from("v_weekly_project_minutes")
    .select("project_id,total_minutes")
    .eq("week_start", monday);
  if (error) throw error;
  return (data ?? []) as ProjectMinutesRow[];
}
