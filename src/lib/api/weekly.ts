import { supabase } from "../supabase";

interface Props {
  weekStart: string;
  weekEnd?: string;
  nextWeekStart?: string;
}

type LogRow = { duration: number | null };

export async function createWeeklyReview(userId: string, weekStart: string) {
  const { data, error } = await supabase
    .from("weekly_reviews")
    .insert({
      user_id: userId,
      week_start: weekStart,
      weekly_minutes: 1680,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchWeeklyTotalTime({ weekStart }: Props) {
  const { data, error } = await supabase
    .from("weekly_reviews")
    .select("weekly_minutes")
    .gte("week_start", weekStart)
    .single();

  if (error) throw error;
  if (!data) return 0;
  return data.weekly_minutes;
}

export async function fetchWeeklyUsedTime({ weekStart, nextWeekStart }: Props) {
  const { data, error } = await supabase
    .from("task_logs")
    .select("duration")
    .gte("start_time", weekStart)
    .lt("start_time", nextWeekStart)
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

export async function fetchWeeklyStatDurations({ weekStart }: Props) {
  const { data, error } = await supabase
    .from("v_weekly_stat_durations")
    .select("stat_id, stat_name, total_minutes")
    .eq("week_start", weekStart);

  if (error) throw error;
  if (!data) return [];
  return data as StatDuration[];
}

export type ProjectMinutesRow = {
  project_id: string;
  total_minutes: number;
};

export async function fetchWeeklyProjectMinutes({ weekStart }: Props) {
  const { data, error } = await supabase
    .from("v_weekly_project_minutes")
    .select("project_id,total_minutes")
    .eq("week_start", weekStart);
  if (error) throw error;
  return (data ?? []) as ProjectMinutesRow[];
}
