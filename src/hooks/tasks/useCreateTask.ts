import { createTask } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: string;
  projectId: string;
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, projectId }: Props) => createTask(userId, projectId),
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
