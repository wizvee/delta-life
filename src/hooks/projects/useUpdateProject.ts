import { updateProject, type Project } from "@/lib/api/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  projectId: string;
  updates: Partial<Omit<Project, "id">>;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, updates }: Props) =>
      updateProject(projectId, updates),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
    },
  });
}
