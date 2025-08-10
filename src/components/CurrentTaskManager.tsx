import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useTask } from "@/hooks/useTask";

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function CurrentTaskManager() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { end, current } = useTask();
  const currentTask = current.data;

  useEffect(() => {
    if (!currentTask) {
      toast.dismiss("current-task");
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    const start = new Date(currentTask.start_time + "Z").getTime();

    toast(`${currentTask.task_title} (00:00)`, {
      id: "current-task",
      duration: Infinity,
    });

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      toast(`${currentTask.task_title} (${formatDuration(elapsed)})`, {
        id: "current-task",
        action: {
          label: "End",
          onClick: () => {
            end.mutate({ logId: currentTask.id });
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
            toast.dismiss("current-task");
          },
        },
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      toast.dismiss("current-task");
    };
  }, [currentTask, end]);

  return null;
}
