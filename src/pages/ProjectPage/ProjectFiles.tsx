import { toast } from "sonner";
import { File } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import type { Project } from "@/lib/api/projects";
import { getValidAccessToken, uploadFileToDrive } from "@/lib/api/google";

import { TabsContent } from "@/components/ui/tabs";
import FileUploader from "@/components/FileUploader";
import { useFilesByFolder } from "@/hooks/useFilesByFolder";

interface Props {
  project: Project;
}

export default function ProjectFiles({ project }: Props) {
  const user = useUser();
  const folderId = project.drive_folder_id;
  const { data, isLoading } = useFilesByFolder(user!.id, folderId);

  const handleUpload = async (files: FileList) => {
    if (!user || !files) return;
    if (!folderId) {
      toast.error("Project does not have a Google Drive folder.");
      return;
    }

    try {
      const accessToken = await getValidAccessToken(user.id);
      for (const file of Array.from(files)) {
        await uploadFileToDrive(accessToken, folderId, file);
      }
      toast.success("File upload successful");
    } catch (e) {
      console.error(e);
      toast.error("File upload failed");
    }
  };

  return (
    <TabsContent value="files" className="mx-2 my-4 flex flex-col gap-8">
      <section>
        <FileUploader onFilesSelected={handleUpload} />
        <div className="my-4 flex flex-col gap-1">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            data?.map((file) => (
              <div
                key={file.id}
                onClick={() =>
                  window.open(file.webViewLink, "_blank", "noopener,noreferrer")
                }
                className="group flex cursor-pointer items-center gap-1 text-sm"
              >
                <File className="h-4 w-4 group-hover:fill-neutral-300" />
                {file.name}
              </div>
            ))
          )}
        </div>
      </section>
    </TabsContent>
  );
}
