import { useQuery } from "@tanstack/react-query";
import { calcCompletionRate } from "@/lib/utils";
import { fetchWeeklyGoalsByWeek } from "@/lib/api/weekly";

export function useWeeklyCompletion(monday: string) {
  return useQuery({
    queryKey: ["weeklyCompletion", monday],
    queryFn: async () => {
      const goals = await fetchWeeklyGoalsByWeek({ monday });
      return calcCompletionRate(goals); // { rate, completed, total }
    },
  });
}
