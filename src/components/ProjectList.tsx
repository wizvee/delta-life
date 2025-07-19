import type { Project } from "@/lib/api/projects";

interface ProjectListProps {
  list: Project[];
}

export default function ProjectList({ list }: ProjectListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 py-4 md:grid-cols-4">
      {list.map((project) => (
        <div key={project.stat_id} className="rounded bg-white p-4 shadow">
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
          <p className="text-xs text-gray-400">
            {project.start_date} - {project.end_date}
          </p>
        </div>
      ))}
    </div>
  );
}
