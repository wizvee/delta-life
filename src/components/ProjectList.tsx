import type { Project } from "@/lib/api/projects";
import { useNavigate } from "react-router-dom";

interface ProjectListProps {
  list: Project[];
}

function ProjectItem({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <div
      key={project.stat_id}
      onClick={() => navigate(`/project/${project.id}`)}
      className="rounded border border-neutral-200/80 bg-white px-3 py-2"
    >
      <h3 className="text-sm font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
      <p className="text-xs text-gray-400">
        {project.start_date} - {project.end_date}
      </p>
    </div>
  );
}

export default function ProjectList({ list }: ProjectListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 py-4 md:grid-cols-3">
      {list.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
