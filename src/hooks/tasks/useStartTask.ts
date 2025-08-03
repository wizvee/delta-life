import { startTask } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: string;
  taskId: string;
}

export function useStartTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, taskId }: Props) => startTask(userId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-task"],
      });
    },
  });
}
