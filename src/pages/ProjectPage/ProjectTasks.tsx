import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import isBetween from "dayjs/plugin/isBetween";

import { useTask } from "@/hooks/useTask";
import type { Task, TaskUpdate } from "@/lib/api/tasks";
import { splitIntoIsoWeeks } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";

import { TabsContent } from "@/components/ui/tabs";
import { WeekSection } from "./ProjectTasksWeekSection";

dayjs.extend(isBetween);

interface Props {
  project: Project;
}

export default function ProjectTasks({ project }: Props) {
  const { start_date: startDate, due_date: dueDate, tasks } = project;
  const { create, update } = useTask();

  const sections = useMemo(
    () => splitIntoIsoWeeks(startDate, dueDate),
    [startDate, dueDate],
  );

  const tasksBySection = useMemo(() => {
    const map = new Map<number, Task[]>();
    for (const s of sections) map.set(s.weekNumber, []);
    for (const t of tasks) {
      for (const s of sections) {
        if (dayjs(t.due_date).isBetween(s.startDate, s.endDate, "day", "[]")) {
          map.get(s.weekNumber)!.push(t);
          break;
        }
      }
    }
    return map;
  }, [sections, tasks]);

  const handleCreateTask = useCallback(
    (due: string) => {
      create.mutate({
        userId: project.user_id,
        projectId: project.id,
        dueDate: due,
      });
    },
    [create, project.id, project.user_id],
  );

  const handleUpdateTask = useCallback(
    (taskId: string, updates: TaskUpdate) => {
      update.mutate({
        taskId,
        updates,
      });
    },
    [update],
  );

  if (!sections.length) {
    return (
      <TabsContent value="tasks" className="my-2">
        <div className="rounded-md border p-4 text-sm text-neutral-500">
          유효한 기간이 없어 주차가 생성되지 않았어요.
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="tasks" className="my-2 flex flex-col gap-4">
      {sections.map((s) => (
        <WeekSection
          key={`${s.startDate}-${s.endDate}`}
          section={s}
          tasks={tasksBySection.get(s.weekNumber) ?? []}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
        />
      ))}
    </TabsContent>
  );
}
