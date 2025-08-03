import { updateTask, type TaskUpdate } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  taskId: string;
  updates: TaskUpdate;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updates }: Props) => updateTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
