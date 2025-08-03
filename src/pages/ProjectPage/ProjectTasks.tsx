import type { Project } from "@/lib/api/projects";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import useTasksByProject from "@/hooks/tasks/useTasksByProject";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

interface Props {
  project: Project;
}

export default function ProjectTasks({ project }: Props) {
  const createTask = useCreateTask();
  const handleCreateTask = () => {
    createTask.mutate({
      userId: project.user_id,
      statId: project.stat.id,
      projectId: project.id,
    });
  };

  const { data: tasks } = useTasksByProject(project.id);

  return (
    <TabsContent value="tasks" className="mx-2 my-4 flex flex-col gap-8">
      <section>
        <Button size="sm" onClick={handleCreateTask}>
          Add
        </Button>
        <div>
          {tasks?.map((task) => (
            <div key={task.id}>{task.title}</div>
          ))}
        </div>
      </section>
    </TabsContent>
  );
}
