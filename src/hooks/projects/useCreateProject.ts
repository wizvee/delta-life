import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject, updateProject } from "@/lib/api/projects";
import { createGoogleDriveFolder, getValidAccessToken } from "@/lib/api/google";

interface Props {
  userId: string;
  statId: string;
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, statId }: Props) => {
      const project = await createProject(userId, statId);
      const accessToken = await getValidAccessToken(userId);
      const folderId = await createGoogleDriveFolder(accessToken, project.id);
      return updateProject(project.id, {
        drive_folder_id: folderId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
