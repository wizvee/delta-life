import {
  ArrowRight,
  ArrowRightToLine,
  Calendar,
  Circle,
  CircleArrowRight,
  CircleCheck,
  CircleX,
  Plus,
} from "lucide-react";
import dayjs from "dayjs";
import { memo, useMemo } from "react";
import type { Task } from "@/lib/api/tasks";
import { formatDate, type WeekSpan } from "@/lib/utils";

interface Props {
  section: WeekSpan;
  tasks: Task[];
  onCreateTask: (dueDate: string) => void;
}

export const WeekSection = memo(function WeekSection({
  section,
  tasks,
  onCreateTask,
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
            <li key={t.id} className="flex items-center gap-2">
              <StatusIcon status={t.status} />
              <div className="flex flex-col gap-0.5">
                <span>{t.title}</span>
                <span className="flex items-center gap-1 text-xs text-neutral-400">
                  <Calendar className="h-3 w-3" />
                  {formatDate(t.due_date)}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
});

function StatusIcon({ status }: { status: string }) {
  if (status === "done") {
    return <CircleCheck fill="#87dc8a" className="h-4 w-4" />;
  }
  if (status === "deferred") {
    return <CircleArrowRight fill="#f7dd7d" className="h-4 w-4" />;
  }
  if (status === "cancelled") {
    return <CircleX fill="#ff8e7d" className="h-4 w-4" />;
  }
  return <Circle className="h-4 w-4" />;
}
