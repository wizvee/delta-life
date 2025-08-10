import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyStatDurations } from "@/lib/api/weekly";

export function useWeeklyStatDurations(monday: string) {
  return useQuery({
    queryKey: ["weeklyStatDurations", monday],
    queryFn: () => fetchWeeklyStatDurations({ monday }),
  });
}
