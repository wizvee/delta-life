import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Folder } from "lucide-react";

import {
  formatDate,
  formatDuration,
  getWeekRange,
  nextWeekStart,
  prevWeekStart,
} from "@/lib/utils";
import { useWeeklyMinutes } from "@/hooks/weekly/useWeeklyMinutes";
import { useWeeklyProjects } from "@/hooks/weekly/useWeeklyProjects";
import { useWeeklyCompletion } from "@/hooks/weekly/useWeeklyCompletion";
import { useWeeklyStatDurations } from "@/hooks/weekly/useWeeklyStatDurations";

import WeeklyProjects from "./WeeklyProjects";

export default function WeeklyPage() {
  const { weekStart } = useParams<{ weekStart: string }>();
  const { monday, sunday, nextMonday, year, weekNumber, isThisWeek } =
    getWeekRange(weekStart);

  const { projects } = useWeeklyProjects(monday, sunday);
  const { data: completion } = useWeeklyCompletion(monday);
  const { data: statDurations } = useWeeklyStatDurations(monday);
  const { data: totalMinutes } = useWeeklyMinutes(monday, nextMonday);

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
        <section className="rounded-md bg-neutral-100 p-3">
          <div className="mb-2 ml-0.5 flex items-center gap-1">
            <Folder className="h-4.5 w-4.5 fill-neutral-500" />
            <h2 className="font-semibold">PROJECTS</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {projects.map((project) => (
              <WeeklyProjects
                key={project.id}
                project={project}
                weekStart={monday}
                isThisWeek={isThisWeek}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
