import { toast } from "sonner";
import { useEffect } from "react";
import { useEndTask } from "@/hooks/tasks/useEndTask";
import useCurrentTask from "@/hooks/tasks/useCurrentTask";

export default function CurrentTaskManager() {
  const { data: currentTask } = useCurrentTask();
  const { mutate: endTask } = useEndTask();

  useEffect(() => {
    if (currentTask) {
      toast(`🔥 Active: ${currentTask.task_title}`, {
        id: "current-task",
        duration: Infinity,
        action: {
          label: "End",
          onClick: () => {
            endTask({ logId: currentTask.id });
            toast.dismiss("current-task");
          },
        },
      });
    } else {
      toast.dismiss("current-task");
    }
  }, [currentTask, endTask]);

  return null;
}
