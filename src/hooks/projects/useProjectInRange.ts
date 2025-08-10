import { getProjectsInRange } from "@/lib/api/projects";
import { useQuery } from "@tanstack/react-query";

export function useProjectsInRange(start: string, end: string) {
  return useQuery({
    queryKey: ["projects", "InRange", start],
    queryFn: () => getProjectsInRange(start, end),
    enabled: !!start && !!end,
  });
}
