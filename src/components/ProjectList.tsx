import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";

interface ProjectListProps {
  list: Project[];
}

function ProjectItem({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <div
      key={project.id}
      onClick={() => navigate(`/project/${project.id}`)}
      className="flex flex-col gap-0.5 rounded border border-neutral-200/80 bg-white px-3 py-2"
    >
      <h3 className="text-sm font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
      <div className="flex items-center gap-1 text-xs text-neutral-400">
        <span>{formatDate(project.start_date)}</span>
        <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        <span>{formatDate(project.end_date || project.due_date)}</span>
      </div>
    </div>
  );
}

export default function ProjectList({ list }: ProjectListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-2 md:grid-cols-3">
      {list.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
