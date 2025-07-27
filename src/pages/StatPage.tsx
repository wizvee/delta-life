import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { useProjectsByStat } from "@/hooks/projects/useProjectsByStat";
import { useCreateProject } from "@/hooks/projects/useCreateProject";

import ProjectList from "@/components/ProjectList";

interface Props {
  userId: string;
  statId: string;
}

interface TitleProps {
  title: string;
  handleCreate: () => void;
}

function SectionTitle({ title, handleCreate }: TitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">{title}</h2>
      <button
        onClick={handleCreate}
        className="bg-background flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300 hover:bg-neutral-200"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProjectSection({ userId, statId }: Props) {
  const { data: projectList } = useProjectsByStat(statId);

  const createProject = useCreateProject();
  const handleCreateProject = () => {
    createProject.mutate({ userId, statId });
  };

  return (
    <section className="rounded-md bg-neutral-100 px-3 py-1.5">
      <SectionTitle title="PROJECTS" handleCreate={handleCreateProject} />
      <ProjectList list={projectList || []} />
    </section>
  );
}

export default function StatPage() {
  const user = useUser();
  const { statId } = useParams<{ statId: string }>();

  if (!statId) return <div>Error: Stat ID is required</div>;
  return <ProjectSection userId={user?.id || ""} statId={statId} />;
}
