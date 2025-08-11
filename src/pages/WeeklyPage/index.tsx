import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  formatDate,
  formatDuration,
  getWeekRange,
  nextWeekStart,
  prevWeekStart,
} from "@/lib/utils";
import { useWeeklyStatDurations } from "@/hooks/weekly/useWeeklyStatDurations";
import { useWeeklyBehaviorCompletion } from "@/hooks/weekly/useWeeklyBehaviorCompletion";

import WeeklySummary from "./WeeklySummary";

export default function WeeklyPage() {
  const { weekStart } = useParams<{ weekStart: string }>();
  const { monday, sunday, year, weekNumber } = getWeekRange(weekStart);

  const { data: completion } = useWeeklyBehaviorCompletion(monday, sunday);
  const { data: statDurations } = useWeeklyStatDurations(monday);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-neutral-400">
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
      <div className="mb-8 flex items-center gap-1 text-xs text-neutral-400">
        <span>{formatDate(monday)}</span>
        <ArrowRight strokeWidth={2.5} className="h-3 w-3" />
        <span>{formatDate(sunday)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <WeeklySummary completion={completion} />
        <div>
          {statDurations?.map((stat) => (
            <div
              key={stat.stat_id}
            >{`${stat.stat_name}: ${formatDuration(stat.total_minutes)}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
