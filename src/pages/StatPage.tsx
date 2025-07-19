import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { useProjectsByStat } from "@/hooks/projects/useProjectsByStat";
import { useCreateProject } from "@/hooks/projects/useCreateProject";

import ProjectList from "@/components/ProjectList";

export default function StatPage() {
  const user = useUser();
  const { statId } = useParams<{ statId: string }>();

  if (!statId) return <div>Error: Stat ID is required</div>;
  return <ProjectSection userId={user?.id || ""} statId={statId} />;
}

interface Props {
  userId: string;
  statId: string;
}

function ProjectSection({ userId, statId }: Props) {
  const { data: projectList } = useProjectsByStat(statId);

  const createProject = useCreateProject();
  const handleCreateProject = () => {
    createProject.mutate({ userId, statId });
  };

  return (
    <section>
      <div className="flex items-center justify-between rounded-md bg-neutral-200/80 px-3 py-1.5">
        <h2 className="font-semibold text-slate-400">PROJECTS</h2>
        <button
          onClick={handleCreateProject}
          className="bg-background flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300"
        >
          <Plus className="h-3.5 w-3.5" color="oklch(0.71 0.04 257)" />
        </button>
      </div>
      <ProjectList list={projectList || []} />
    </section>
  );
}
