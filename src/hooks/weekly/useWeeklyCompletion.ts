import { useQuery } from "@tanstack/react-query";
import { calcCompletionRate } from "@/lib/utils";
import { fetchWeeklyGoalsByWeek } from "@/lib/api/weekly";

export function useWeeklyCompletion(weekStart: string) {
  return useQuery({
    queryKey: ["weeklyCompletion", weekStart],
    queryFn: async () => {
      const goals = await fetchWeeklyGoalsByWeek({ weekStart });
      return calcCompletionRate(goals); // { rate, completed, total }
    },
  });
}
