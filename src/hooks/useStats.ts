import { getStats } from "@/lib/api/stats";
import { useQuery } from "@tanstack/react-query";

export function useStats(userId: string) {
  return useQuery({
    queryKey: ["stats", userId],
    queryFn: () => getStats(userId),
    enabled: !!userId,
  });
}
