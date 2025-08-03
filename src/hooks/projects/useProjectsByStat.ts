import { useQuery } from "@tanstack/react-query";
import { getProjectsByStat } from "@/lib/api/projects";

// TODO: refactor to use a more generic hook for fetching projects by different criteria
export function useProjectsByStat(statId: string) {
  return useQuery({
    queryKey: ["projects", "byStat", statId],
    queryFn: () => getProjectsByStat(statId),
    enabled: !!statId,
  });
}
