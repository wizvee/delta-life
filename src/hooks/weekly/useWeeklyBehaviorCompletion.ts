import { useQuery } from "@tanstack/react-query";
import { getTasksInRange } from "@/lib/api/tasks";

export function useWeeklyBehaviorCompletion(
  weekStart: string,
  weekEnd: string,
) {
  return useQuery({
    queryKey: ["tasks", weekStart],
    queryFn: async () => {
      const tasks = await getTasksInRange(weekStart, weekEnd);

      const total = tasks.length;
      const completed = tasks.filter((t) => t.status === "done").length;

      const rate =
        total === 0 ? 0 : Math.round((completed / total) * 100) / 100;
      return { total, completed, rate };
    },
  });
}
