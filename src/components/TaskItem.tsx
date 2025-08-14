import {
  Calendar,
  CalendarDays,
  Circle,
  CircleArrowRight,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useState } from "react";

import { formatDate } from "@/lib/utils";
import type { Task, TaskUpdate } from "@/lib/api/tasks";

import { DatePicker } from "./DatePicker";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function StatusIcon({ status }: { status: string }) {
  if (status === "done") {
    return <CircleCheck fill="#87dc8a" className="h-4.5 w-4.5" />;
  }
  if (status === "deferred") {
    return <CircleArrowRight fill="#f7dd7d" className="h-4.5 w-4.5" />;
  }
  if (status === "cancelled") {
    return <CircleX fill="#ff8e7d" className="h-4.5 w-4.5" />;
  }
  return <Circle className="h-4.5 w-4.5" />;
}

interface Props {
  task: Task;
  onUpdate: (taskId: string, updates: TaskUpdate) => void;
}

export function TaskItem({ task: t, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            aria-label={`${t.title} details`}
          >
            <StatusIcon status={t.status} />
            <div className="flex flex-col gap-0.5">
              <span className="line-clamp-1">{t.title}</span>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <Calendar className="h-3 w-3" />
                {formatDate(t.due_date)}
              </span>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="flex h-[100dvh] w-screen max-w-none flex-col rounded-none sm:h-auto sm:max-w-lg sm:rounded-2xl">
          <section className="flex items-center gap-3">
            <StatusIcon status={t.status} />
            <h2 className="text-lg font-semibold">{t.title}</h2>
          </section>
          <div className="flex-1">
            <section className="rounded-md bg-neutral-100 p-3">
              <h3 className="mb-4 font-semibold">Properties</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span className="font-semibold">Due</span>
                </div>
                <DatePicker
                  disabled={{ after: new Date(t.start_date) }}
                  value={t.due_date ? new Date(t.due_date) : undefined}
                  onChange={(date) => onUpdate(t.id, { due_date: date })}
                >
                  <div>
                    {t.due_date ? (
                      <span className="text-xs">{formatDate(t.due_date)}</span>
                    ) : (
                      <span className="text-xs text-neutral-400">Empty</span>
                    )}
                  </div>
                </DatePicker>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
}
