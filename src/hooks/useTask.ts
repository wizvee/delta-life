import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTask,
  updateTask,
  startTask,
  endTask,
  getCurrentTask,
  type TaskUpdate,
} from "@/lib/api/tasks";
import { useUser } from "./useUser";

export function useTask() {
  const user = useUser();
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: ({
      userId,
      projectId,
    }: {
      userId: string;
      projectId: string;
    }) => createTask(userId, projectId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
    },
  });

  const update = useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string;
      updates: TaskUpdate;
    }) => updateTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const start = useMutation({
    mutationFn: ({ userId, taskId }: { userId: string; taskId: string }) =>
      startTask(userId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-task"] });
    },
  });

  const end = useMutation({
    mutationFn: ({ logId }: { logId: string }) => endTask(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-task"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const current = useQuery({
    queryKey: ["current-task"],
    queryFn: () => getCurrentTask(user?.id || ""),
    enabled: !!user,
  });

  return { create, update, start, end, current };
}
