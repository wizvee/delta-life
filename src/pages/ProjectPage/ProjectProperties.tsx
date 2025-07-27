import { CalendarCheck2 } from "lucide-react";

import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { EntityUpdate } from "@/lib/api/entities";

import { DatePicker } from "@/components/DatePicker";

interface Props {
  project: Project;
  handleUpdate: (updates: EntityUpdate) => void;
}

export default function ProjectProperties({ project, handleUpdate }: Props) {
  return (
    <div>
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
    </div>
  );
}
