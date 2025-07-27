import { useParams } from "react-router-dom";
import { CalendarCheck2, CalendarDays, Sparkles } from "lucide-react";

import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { EntityUpdate } from "@/lib/api/entities";
import { useProject } from "@/hooks/projects/useProject";
import { useUpdateProject } from "@/hooks/projects/useUpdateProject";

import { DatePicker } from "@/components/DatePicker";
import { TitleEditor } from "@/components/TitleEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

function ProjectOverview({ project, handleUpdate }: Props) {
  return (
    <TabsContent value="overview" className="mx-2 my-4 flex flex-col gap-8">
      <section>
        <h3 className="mb-4 font-semibold">Properties</h3>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-semibold">Stat</span>
          </div>
          <div>
            <span className="rounded-sm bg-neutral-100 px-2 py-1 text-xs">
              {project.stat.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span className="font-semibold">Start Date</span>
          </div>
          <DatePicker
            value={
              project.start_date ? new Date(project.start_date) : undefined
            }
            onChange={(date) => handleUpdate({ start_date: date })}
          >
            <div>
              {project.start_date ? (
                <span className="text-xs">
                  {formatDate(project.start_date)}
                </span>
              ) : (
                <span className="text-xs text-neutral-400">Empty</span>
              )}
            </div>
          </DatePicker>
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Description</h3>
      </section>
    </TabsContent>
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
      <Tabs defaultValue="overview" className="my-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="meeting">Meeting Notes</TabsTrigger>
        </TabsList>
        <ProjectOverview project={project} handleUpdate={handleUpdate} />
        <TabsContent value="tasks">tasks</TabsContent>
      </Tabs>
    </div>
  );
}
