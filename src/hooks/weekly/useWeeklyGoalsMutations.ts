import {
  createWeeklyGoal,
  updateWeeklyGoal,
  type GoalUpdate,
} from "@/lib/api/weekly";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWeeklyGoalsMutations(weekStart: string) {
  const qc = useQueryClient();

  const listKey = ["weeklyGoalsByWeek", weekStart];

  const create = useMutation({
    mutationFn: createWeeklyGoal,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["weeklyCompletion", weekStart] });
      qc.invalidateQueries({ queryKey: listKey });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: GoalUpdate }) =>
      updateWeeklyGoal(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: listKey });
    },
  });

  const toggle = useMutation({
    mutationFn: ({ id, next }: { id: string; next: boolean }) =>
      updateWeeklyGoal(id, { is_completed: next }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["weeklyCompletion", weekStart] });
      qc.invalidateQueries({ queryKey: listKey });
    },
  });

  return { create, update, toggle };
}
