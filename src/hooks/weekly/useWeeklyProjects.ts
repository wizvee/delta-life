import { useQuery } from "@tanstack/react-query";
import { getProjectsInRange } from "@/lib/api/projects";
import {
  fetchWeeklyGoalsByWeek,
  fetchWeeklyProjectMinutes,
} from "@/lib/api/weekly";

export function useWeeklyProjects(weekStart: string, weekEnd: string) {
  const projectsQ = useQuery({
    queryKey: ["projects", "weekly", weekStart],
    queryFn: () => getProjectsInRange(weekStart, weekEnd),
    enabled: !!weekStart && !!weekEnd,
  });
  const goalsQ = useQuery({
    queryKey: ["weeklyGoalsByWeek", weekStart],
    queryFn: () => fetchWeeklyGoalsByWeek({ weekStart }),
  });
  const minutesQ = useQuery({
    queryKey: ["weeklyProjectMinutes", weekStart],
    queryFn: () => fetchWeeklyProjectMinutes({ weekStart }),
  });

  const projects = (projectsQ?.data ?? []).map((project) => ({
    ...project,
    goals: (goalsQ.data ?? []).filter((g) => g.project_id === project.id),
    total_minutes:
      (minutesQ.data ?? []).find((m) => m.project_id === project.id)
        ?.total_minutes ?? 0,
  }));

  return {
    isLoading: goalsQ.isLoading || minutesQ.isLoading,
    isError: goalsQ.isError || minutesQ.isError,
    projects,
  };
}
