import { useParams } from "react-router-dom";
import { CalendarCheck2 } from "lucide-react";

import { formatLgDate } from "@/lib/utils";
import type { EntityUpdate } from "@/lib/api/entities";
import { useProject } from "@/hooks/projects/useProject";
import { useUpdateProject } from "@/hooks/projects/useUpdateProject";

import { DatePicker } from "@/components/DatePicker";
import { TitleEditor } from "@/components/TitleEditor";
import type { Project } from "@/lib/api/projects";

interface Props {
  project: Project;
  handleUpdate: (updates: EntityUpdate) => void;
}

function ProjectProperties({ project, handleUpdate }: Props) {
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
              <span className="text-xs">
                {formatLgDate(new Date(project.due_date))}
              </span>
            ) : (
              <span className="text-xs text-neutral-400">Empty</span>
            )}
          </div>
        </DatePicker>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project } = useProject(projectId || "");

  const { mutate, isPending, isError } = useUpdateProject();

  if (!project) return <div>Error: Project not found</div>;

  const handleUpdate = (updates: EntityUpdate) => {
    mutate({ projectId: project.id, updates });
    if (isError) console.error("Failed to update project.");
  };

  return (
    <div className="flex flex-col gap-2">
      <TitleEditor
        entity={project}
        isPending={isPending}
        handleUpdate={handleUpdate}
      />
      <ProjectProperties project={project} handleUpdate={handleUpdate} />
    </div>
  );
}
