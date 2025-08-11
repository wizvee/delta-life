import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyTotalTime, fetchWeeklyUsedTime } from "@/lib/api/weekly";

export function useWeeklyTimeCompletion(weekStart: string) {
  const totalTime = useQuery({
    queryKey: ["totalTime", weekStart],
    queryFn: () => fetchWeeklyTotalTime,
    enabled: !!weekStart,
  });

  const usedTime = useQuery({
    queryKey: ["usedTime", weekStart],
    queryFn: () => fetchWeeklyUsedTime,
    enabled: !!weekStart,
  });

  return { totalTime, usedTime };
}
