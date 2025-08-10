import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyTotalMinutes } from "@/lib/api/weekly";

export function useWeeklyMinutes(weekStart: string, nextWeekStart: string) {
  return useQuery({
    queryKey: ["weeklyMinutes", nextWeekStart],
    queryFn: () => fetchWeeklyTotalMinutes({ weekStart, nextWeekStart }),
  });
}
