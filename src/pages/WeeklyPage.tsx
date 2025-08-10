import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  formatDate,
  formatDuration,
  getWeekRange,
  nextWeekStart,
  prevWeekStart,
} from "@/lib/utils";
import { useWeeklyMinutes } from "@/hooks/weekly/useWeeklyMinutes";
import { useWeeklyCompletion } from "@/hooks/weekly/useWeeklyCompletion";
import { useWeeklyStatDurations } from "@/hooks/weekly/useWeeklyStatDurations";
import { useWeeklyProjects } from "@/hooks/weekly/useWeeklyProjects";

export default function WeeklyPage() {
  const { weekStart } = useParams<{ weekStart: string }>();
  const { monday, sunday, nextMonday, title } = getWeekRange(weekStart);

  const { data: completion } = useWeeklyCompletion(monday);
  const { data: statDurations } = useWeeklyStatDurations(monday);
  const { data: totalMinutes } = useWeeklyMinutes(monday, nextMonday);
  const { projects } = useWeeklyProjects(monday, sunday);

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
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mb-8 flex items-center gap-1 text-xs text-gray-400">
        <span>{formatDate(monday)}</span>
        <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        <span>{formatDate(sunday)}</span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div>이번 주 달성률: {completion?.rate}%</div>
          <div>이번 주 사용시간: {formatDuration(totalMinutes ?? 0)}</div>
        </div>
        <div>
          {statDurations?.map((stat) => (
            <div
              key={stat.stat_id}
            >{`${stat.stat_name}: ${formatDuration(stat.total_minutes)}`}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div key={project.id}>
              <div>{project.title}</div>
              <div>사용시간: {formatDuration(project.total_minutes)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
