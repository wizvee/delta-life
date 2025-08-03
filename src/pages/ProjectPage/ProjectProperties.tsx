import { CalendarCheck2, Clock } from "lucide-react";

import { formatDate, formatDuration } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { EntityUpdate } from "@/lib/api/entities";

import { DatePicker } from "@/components/DatePicker";
import type { Task } from "@/lib/api/tasks";

interface Props {
  project: Project;
  handleUpdate: (updates: EntityUpdate) => void;
}

function sumDuration(tasks: Task[]) {
  const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
  return formatDuration(totalDuration);
}

export default function ProjectProperties({ project, handleUpdate }: Props) {
  return (
    <div className="flex gap-4">
      <div className="max-w-24">
        <div className="flex items-center justify-center gap-1">
          <CalendarCheck2 className="h-3.5 w-3.5" />
          <span className="text-sm font-semibold">Due date</span>
        </div>
        <DatePicker
          value={project.due_date ? new Date(project.due_date) : undefined}
          onChange={(date) => handleUpdate({ due_date: date })}
        >
          <div className="text-center">
            {project.due_date ? (
              <span className="text-xs">{formatDate(project.due_date)}</span>
            ) : (
              <span className="text-xs text-neutral-400">Empty</span>
            )}
          </div>
        </DatePicker>
      </div>
      <div className="max-w-24">
        <div className="flex items-center justify-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-sm font-semibold">Duration</span>
        </div>
        <div className="text-center">
          <span className="text-xs">{sumDuration(project.tasks)}</span>
        </div>
      </div>
    </div>
  );
}
