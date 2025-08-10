import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyStatDurations } from "@/lib/api/weekly";

export function useWeeklyStatDurations(weekStart: string) {
  return useQuery({
    queryKey: ["weeklyStatDurations", weekStart],
    queryFn: () => fetchWeeklyStatDurations({ weekStart }),
  });
}
