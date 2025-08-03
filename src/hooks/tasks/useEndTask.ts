import { endTask } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  logId: string;
}

export function useEndTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ logId }: Props) => endTask(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
    },
  });
}
