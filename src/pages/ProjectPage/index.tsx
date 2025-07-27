import { useParams } from "react-router-dom";

import type { EntityUpdate } from "@/lib/api/entities";
import { useProject } from "@/hooks/projects/useProject";
import { useUpdateProject } from "@/hooks/projects/useUpdateProject";

import { TitleEditor } from "@/components/TitleEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProjectProperties from "./ProjectProperties";
import ProjectOverview from "./ProjectOverview";
import ProjectFiles from "./ProjectFiles";

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
      <Tabs defaultValue="overview" className="my-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          {/* <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="meeting">Meeting Notes</TabsTrigger> */}
        </TabsList>
        <ProjectOverview project={project} handleUpdate={handleUpdate} />
        <TabsContent value="tasks" className="mx-2 my-4 flex flex-col gap-8">
          tasks
        </TabsContent>
        <ProjectFiles project={project} />
      </Tabs>
    </div>
  );
}
