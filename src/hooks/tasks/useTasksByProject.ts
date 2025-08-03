import { getTasksByProject } from "@/lib/api/tasks";
import { useQuery } from "@tanstack/react-query";

export default function useTasksByProject(projectId: string) {
  return useQuery({
    queryKey: ["tasks", "byProject", projectId],
    queryFn: () => getTasksByProject(projectId),
    enabled: !!projectId,
  });
}
