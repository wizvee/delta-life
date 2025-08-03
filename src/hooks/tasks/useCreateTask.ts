import { createTask } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: string;
  statId: string;
  projectId: string;
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, statId, projectId }: Props) =>
      createTask(userId, statId, projectId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "byProject", variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
    },
  });
}
