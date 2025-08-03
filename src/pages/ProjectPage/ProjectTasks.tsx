import { Circle, CircleCheck } from "lucide-react";

import { formatDuration } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { Task, TaskUpdate } from "@/lib/api/tasks";

import { useUser } from "@/hooks/useUser";
import { useStartTask } from "@/hooks/tasks/useStartTask";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

// import ProjectTaskMenu from "./ProjectTaskMenu";

interface Props {
  project: Project;
}

export default function ProjectTasks({ project }: Props) {
  const user = useUser();

  const createTask = useCreateTask();
  const handleCreateTask = () => {
    createTask.mutate({
      userId: project.user_id,
      projectId: project.id,
    });
  };

  const { mutate, isError } = useUpdateTask();
  const handleUpdateTask = (taskId: string, updates: TaskUpdate) => {
    mutate({ taskId, updates });
    if (isError) console.error("Failed to update task.");
  };

  const { mutate: startTask } = useStartTask();
  const handleStartTask = (task: Task) => {
    if (!user || task.status === "done") return;
    startTask({ userId: user.id, taskId: task.id });
  };

  return (
    <TabsContent value="tasks" className="mx-2 my-4 flex flex-col gap-8">
      <section>
        <Button size="sm" onClick={handleCreateTask}>
          Add
        </Button>
        <div className="mt-4 flex flex-col gap-1">
          {project.tasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 p-1 text-sm hover:bg-neutral-50"
            >
              <div
                onClick={() => handleUpdateTask(task.id, { status: "done" })}
              >
                {task.status === "done" ? (
                  <CircleCheck
                    strokeWidth={2.5}
                    className="h-4.5 w-4.5 text-[#94af7a]"
                  />
                ) : (
                  <Circle strokeWidth={2.5} className="h-4.5 w-4.5" />
                )}
              </div>
              <div
                className="flex flex-1 flex-col"
                onClick={() => handleStartTask(task)}
              >
                <span>{task.title}</span>
              </div>
              <span className="flex items-center gap-0.5 text-xs">
                {formatDuration(task.duration)}
              </span>
              {/* <ProjectTaskMenu task={task} /> */}
            </div>
          ))}
        </div>
      </section>
    </TabsContent>
  );
}
