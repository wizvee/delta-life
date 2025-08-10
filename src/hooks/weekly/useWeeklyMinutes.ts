import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyTotalMinutes } from "@/lib/api/weekly";

export function useWeeklyMinutes(monday: string, nextMonday: string) {
  return useQuery({
    queryKey: ["weeklyMinutes", monday],
    queryFn: () => fetchWeeklyTotalMinutes({ monday, nextMonday }),
  });
}
