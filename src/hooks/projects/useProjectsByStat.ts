import { useQuery } from "@tanstack/react-query";
import { getProjectsByStat } from "@/lib/api/projects";

export function useProjectsByStat(statId: string) {
  return useQuery({
    queryKey: ["projects", "byStat", statId],
    queryFn: () => getProjectsByStat(statId),
    enabled: !!statId,
  });
}
