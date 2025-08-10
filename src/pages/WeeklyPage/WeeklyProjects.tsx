import { useState } from "react";
import { Pencil, Plus, Star, Timer } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { formatDuration } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { WeeklyGoal } from "@/lib/api/weekly";
import { useWeeklyGoalsMutations } from "@/hooks/weekly/useWeeklyGoalsMutations";

interface Props {
  project: Project;
  weekStart: string;
  isThisWeek: boolean;
}

export default function WeeklyProjects({
  project,
  weekStart,
  isThisWeek,
}: Props) {
  const user = useUser();
  const { create, update, toggle } = useWeeklyGoalsMutations(weekStart);

  if (!user) return null;

  const handleCreateGoal = (project_id: string) => {
    create.mutate({ user_id: user.id, project_id, week_start: weekStart });
  };
  const handleUpdateGoal = (id: string, title: string) => {
    update.mutate({ id, patch: { title } });
  };
  const handleToggleGoal = (id: string, next: boolean) => {
    if (!isThisWeek) return;
    toggle.mutate({ id, next });
  };

  return (
    <div className="flex flex-col gap-1 rounded-sm border border-neutral-200/80 bg-white px-3 py-2">
      <h3 className="font-semibold">{project.title}</h3>
      <div className="mb-1.5 flex items-center gap-2 text-sm text-neutral-500">
        <span className="flex items-center gap-0.5 font-semibold">
          <Timer strokeWidth={2.5} className="h-3.5 w-3.5" />
          Time Spent
        </span>
        <span>{formatDuration(project.total_minutes ?? 0)}</span>
      </div>
      <div className="flex justify-between">
        <h4 className="text-sm font-semibold">Goals</h4>
        {isThisWeek && (
          <button
            onClick={() => handleCreateGoal(project.id)}
            className="bg-background flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-300 hover:bg-neutral-200"
          >
            <Plus className="h-3 w-3" />
          </button>
        )}
      </div>
      <div>
        {project.goals?.length ? (
          project.goals.map((goal) => (
            <Goal
              key={goal.id}
              goal={goal}
              handleUpdate={handleUpdateGoal}
              handleToggle={handleToggleGoal}
            />
          ))
        ) : (
          <div className="text-sm">목표 없음</div>
        )}
      </div>
    </div>
  );
}

interface GoalProps {
  goal: WeeklyGoal;
  handleUpdate: (id: string, title: string) => void;
  handleToggle: (id: string, next: boolean) => void;
}

function Goal({ goal, handleUpdate, handleToggle }: GoalProps) {
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  const startEditGoal = (goal: { id: string; title: string }) => {
    setEditingGoalId(goal.id);
    setEditingTitle(goal.title);
  };

  const finishEditGoal = (goal: { id: string }) => {
    handleUpdate(goal.id, editingTitle);
    setEditingGoalId(null);
    setEditingTitle("");
  };

  return (
    <div className="group flex items-center gap-1 rounded-sm py-0.5 text-sm hover:bg-neutral-50">
      <div onClick={() => handleToggle(goal.id, !goal.is_completed)}>
        {goal.is_completed ? (
          <Star fill="#fce5a0" className="h-4 w-4 text-[#fce5a0]" />
        ) : (
          <Star className="h-4 w-4" />
        )}
      </div>
      <div className="flex flex-1 flex-col">
        {editingGoalId === goal.id ? (
          <input
            className="rounded border px-1 py-0.5 text-sm"
            value={editingTitle}
            autoFocus
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={() => finishEditGoal(goal)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                finishEditGoal(goal);
              }
            }}
          />
        ) : (
          <span>{goal.title}</span>
        )}
      </div>
      <button
        onClick={() => startEditGoal(goal)}
        className="text-neutral-300 hover:text-neutral-400"
      >
        <Pencil className="invisible h-3.5 w-3.5 group-hover:visible" />
      </button>
    </div>
  );
}
