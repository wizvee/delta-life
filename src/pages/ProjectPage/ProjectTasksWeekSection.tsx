import dayjs from "dayjs";
import { memo, useMemo } from "react";
import { ArrowRight, ArrowRightToLine, Plus } from "lucide-react";

import type { Task, TaskUpdate } from "@/lib/api/tasks";
import { formatDate, type WeekSpan } from "@/lib/utils";

import { TaskItem } from "@/components/TaskItem";

interface Props {
  section: WeekSpan;
  tasks: Task[];
  onCreateTask: (dueDate: string) => void;
  onUpdateTask: (taskId: string, updates: TaskUpdate) => void;
}

export const WeekSection = memo(function WeekSection({
  section,
  tasks,
  onCreateTask,
  onUpdateTask,
}: Props) {
  const { weekNumber, startDate, endDate } = section;

  const isPastWeek = useMemo(
    () => dayjs().isAfter(dayjs(endDate), "day"),
    [endDate],
  );

  return (
    <section className="rounded-md bg-neutral-100 p-3">
      <div className="flex items-center justify-between gap-1">
        <h2 className="font-semibold">{`Week ${weekNumber}`}</h2>
        <div className="flex gap-0.5">
          {!isPastWeek && (
            <button
              onClick={() => onCreateTask(endDate)}
              className="bg-background cursor-pointer rounded-sm border p-1 text-xs hover:bg-neutral-50"
            >
              <Plus strokeWidth={2.5} className="h-3 w-3" />
            </button>
          )}
          <button className="bg-background cursor-pointer rounded-sm border p-1 text-xs hover:bg-neutral-50">
            <ArrowRightToLine strokeWidth={2.5} className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-neutral-400">
        <span>{formatDate(startDate)}</span>
        <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        <span>{formatDate(endDate)}</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {tasks
          .filter((t) =>
            dayjs(t.due_date).isBetween(startDate, endDate, "day", "[]"),
          )
          .map((t) => (
            <TaskItem key={t.id} task={t} onUpdate={onUpdateTask} />
          ))}
      </ul>
    </section>
  );
});
