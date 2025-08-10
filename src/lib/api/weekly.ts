import { supabase } from "../supabase";

interface Props {
  weekStart: string;
  weekEnd?: string;
  nextWeekStart?: string;
}

export type WeeklyGoal = {
  id: string;
  project_id: string;
  week_start?: string;
  title: string;
  is_completed: boolean;
};

export type GoalUpdate = Partial<Omit<WeeklyGoal, "id" | "project_id">>;

export async function createWeeklyGoal(params: {
  user_id: string;
  project_id: string;
  week_start: string;
}) {
  const { data, error } = await supabase
    .from("weekly_goals")
    .insert({
      user_id: params.user_id,
      project_id: params.project_id,
      week_start: params.week_start,
      title: "New goal",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as WeeklyGoal;
}

export async function updateWeeklyGoal(id: string, patch: GoalUpdate) {
  const { data, error } = await supabase
    .from("weekly_goals")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
      completed_at: patch.is_completed ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as WeeklyGoal;
}

export async function fetchWeeklyGoalsByWeek({ weekStart }: Props) {
  const { data, error } = await supabase
    .from("weekly_goals")
    .select("id,project_id,title,is_completed")
    .eq("week_start", weekStart)
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as WeeklyGoal[];
}

type LogRow = { duration: number | null };

export async function fetchWeeklyTotalMinutes({
  weekStart,
  nextWeekStart,
}: Props) {
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
