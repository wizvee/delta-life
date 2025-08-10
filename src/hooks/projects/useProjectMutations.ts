import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  updateProject,
  type ProjectUpdate,
} from "@/lib/api/projects";

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: async (params: { userId: string; title: string }) => {
      const project = await createProject(params.userId, params.title);
      // const accessToken = await getValidAccessToken(userId);
      // const folderId = await createGoogleDriveFolder(accessToken, project.id);
      // return updateProject(project.id, {
      //   drive_folder_id: folderId,
      // });
      return project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const update = useMutation({
    mutationFn: (params: { projectId: string; updates: ProjectUpdate }) =>
      updateProject(params.projectId, params.updates),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { create, update };
}
