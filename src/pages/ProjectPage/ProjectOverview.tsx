import { CalendarDays, Sparkles } from "lucide-react";

import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/api/projects";
import type { EntityUpdate } from "@/lib/api/entities";

import { TabsContent } from "@/components/ui/tabs";
import { DatePicker } from "@/components/DatePicker";

interface Props {
  project: Project;
  handleUpdate: (updates: EntityUpdate) => void;
}

export default function ProjectOverview({ project, handleUpdate }: Props) {
  return (
    <TabsContent value="overview" className="mx-2 my-4 flex flex-col gap-8">
      <section>
        <h3 className="mb-4 font-semibold">Properties</h3>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-semibold">Stat</span>
          </div>
          <div>
            <span className="rounded-sm bg-neutral-100 px-2 py-1 text-xs">
              {project.stat.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span className="font-semibold">Start Date</span>
          </div>
          <DatePicker
            value={
              project.start_date ? new Date(project.start_date) : undefined
            }
            onChange={(date) => handleUpdate({ start_date: date })}
          >
            <div>
              {project.start_date ? (
                <span className="text-xs">
                  {formatDate(project.start_date)}
                </span>
              ) : (
                <span className="text-xs text-neutral-400">Empty</span>
              )}
            </div>
          </DatePicker>
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Description</h3>
      </section>
    </TabsContent>
  );
}
