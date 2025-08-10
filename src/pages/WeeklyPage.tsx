import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

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
import { useWeeklyGoalsMutations } from "@/hooks/weekly/useWeeklyGoalsMutations";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

export default function WeeklyPage() {
  const user = useUser();
  const { weekStart } = useParams<{ weekStart: string }>();
  const { monday, sunday, nextMonday, title } = getWeekRange(weekStart);

  const { data: completion } = useWeeklyCompletion(monday);
  const { data: statDurations } = useWeeklyStatDurations(monday);
  const { data: totalMinutes } = useWeeklyMinutes(monday, nextMonday);
  const { projects } = useWeeklyProjects(monday, sunday);

  const { create, toggle } = useWeeklyGoalsMutations(monday);

  if (!user) return null;

  const handleCreateGoal = (project_id: string) => {
    create.mutate({ user_id: user.id, project_id, week_start: monday });
  };
  const handleToggleGoal = (id: string, next: boolean) => {
    toggle.mutate({ id, next });
  };

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
            <div key={project.id} className="border">
              <Button size="sm" onClick={() => handleCreateGoal(project.id)}>
                Add
              </Button>
              <div>{project.title}</div>
              <div>사용시간: {formatDuration(project.total_minutes)}</div>
              <div>
                {project.goals?.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-2 p-1 text-sm hover:bg-neutral-50"
                  >
                    <div
                      onClick={() =>
                        handleToggleGoal(goal.id, !goal.is_completed)
                      }
                    >
                      {goal.is_completed ? (
                        <Star
                          fill="#fce5a0"
                          strokeWidth={2.5}
                          className="h-4.5 w-4.5 text-[#fce5a0]"
                        />
                      ) : (
                        <Star strokeWidth={2.5} className="h-4.5 w-4.5" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span>{goal.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
