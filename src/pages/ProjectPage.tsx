import { useParams } from "react-router-dom";

import type { EntityUpdate } from "@/lib/api/entities";
import { useProject } from "@/hooks/projects/useProject";
import { useUpdateProject } from "@/hooks/projects/useUpdateProject";

import { TitleEditor } from "@/components/TitleEditor";

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
    <div>
      <TitleEditor
        entity={project}
        isPending={isPending}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
