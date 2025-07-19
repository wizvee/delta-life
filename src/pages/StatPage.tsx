import { Plus } from "lucide-react";
import ProjectList from "@/components/ProjectList";

export default function StatPage() {
  return (
    <section>
      <div className="flex items-center justify-between rounded-md bg-neutral-200/80 px-3 py-1.5">
        <h2 className="font-semibold text-slate-400">PROJECTS</h2>
        <button className="bg-background flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300">
          <Plus className="h-3.5 w-3.5" color="oklch(0.71 0.04 257)" />
        </button>
      </div>
      <ProjectList />
    </section>
  );
}
