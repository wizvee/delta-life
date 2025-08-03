import { useQuery } from "@tanstack/react-query";
import { getCurrentTask } from "@/lib/api/tasks";
import { useUser } from "../useUser";

export default function useCurrentTask() {
  const user = useUser();
  return useQuery({
    queryKey: ["current-task"],
    queryFn: () => getCurrentTask(user?.id || ""),
    enabled: !!user,
  });
}
