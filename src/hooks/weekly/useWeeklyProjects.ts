import { useQuery } from "@tanstack/react-query";
import { getProjectsInRange } from "@/lib/api/projects";
import {
  fetchWeeklyGoalsByWeek,
  fetchWeeklyProjectMinutes,
} from "@/lib/api/weekly";

export function useWeeklyProjects(monday: string, weekEnd: string) {
  const projectsQ = useQuery({
    queryKey: ["projects", "weekly", monday],
    queryFn: () => getProjectsInRange(monday, weekEnd),
    enabled: !!monday && !!weekEnd,
  });
  const goalsQ = useQuery({
    queryKey: ["weeklyGoalsByWeek", monday],
    queryFn: () => fetchWeeklyGoalsByWeek({ monday }),
  });
  const minutesQ = useQuery({
    queryKey: ["weeklyProjectMinutes", monday],
    queryFn: () => fetchWeeklyProjectMinutes({ monday }),
  });

  const minutesByProject = Object.fromEntries(
    (minutesQ.data ?? []).map((m) => [m.project_id, m.total_minutes ?? 0]),
  );

  const projects = (projectsQ?.data ?? []).map((project) => ({
    ...project,
    goals: goalsQ?.data ?? [],
    total_minutes: minutesByProject[project.id] ?? 0,
  }));

  return {
    isLoading: goalsQ.isLoading || minutesQ.isLoading,
    isError: goalsQ.isError || minutesQ.isError,
    projects,
  };
}
