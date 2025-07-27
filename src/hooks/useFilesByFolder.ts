import { useQuery } from "@tanstack/react-query";
import { getValidAccessToken, listFilesInFolder } from "@/lib/api/google";

export function useFilesByFolder(userId: string, folderId: string | undefined) {
  return useQuery({
    queryKey: ["files", folderId],
    queryFn: async () => {
      if (!userId || !folderId) {
        throw new Error("User ID and folder ID are required");
      }
      const accessToken = await getValidAccessToken(userId);
      return listFilesInFolder(accessToken, folderId);
    },
    enabled: !!folderId,
  });
}
