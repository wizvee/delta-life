import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  formatDate,
  getWeekRange,
  nextWeekStart,
  prevWeekStart,
} from "@/lib/utils";
import { useProjectsInRange } from "@/hooks/projects/useProjectInRange";

export default function WeeklyPage() {
  const { weekStart } = useParams<{ weekStart: string }>();
  const { monday, sunday, weekNumber, year } = getWeekRange(weekStart);
  const { data: projects } = useProjectsInRange(monday, sunday);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-gray-400">
        <Link
          to={`/weekly/${prevWeekStart(monday)}`}
          className="flex items-center gap-0.5"
        >
          <ArrowLeft strokeWidth={2.5} className="h-3 w-3" />
          <span>Last week</span>
        </Link>
        <Link
          to={`/weekly/${nextWeekStart(monday)}`}
          className="flex items-center gap-0.5"
        >
          <span>Next week</span>
          <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold">{`${year}-W${weekNumber}`}</h1>
      <div className="mb-8 flex items-center gap-1 text-xs text-gray-400">
        <span>{formatDate(monday)}</span>
        <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        <span>{formatDate(sunday)}</span>
      </div>
      <div className="flex flex-col gap-4">
        {projects?.map((project) => (
          <div key={project.id} className="flex flex-col gap-0.5">
            <div>
              <p className="font-semibold">{project.title}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>{formatDate(project.start_date)}</span>
              <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
              <span>{formatDate(project.end_date || project.due_date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
