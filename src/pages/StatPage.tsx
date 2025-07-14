import { BookOpen, Pencil } from "lucide-react";
import { useState } from "react";

function NewProjectItem() {
  return (
    <div className="flex h-32 items-center justify-center rounded-md border border-dashed p-4 font-mono text-xs text-stone-300 hover:bg-stone-400/10 hover:text-stone-400">
      + NEW PROJECT
    </div>
  );
}

export default function StatPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="mb-2 flex justify-end px-0.5 py-2">
        <button onClick={() => setIsEditing(!isEditing)} className="group">
          {isEditing ? (
            <BookOpen className="h-4 w-4 fill-none text-stone-400 transition-all duration-300 group-hover:fill-stone-100" />
          ) : (
            <Pencil className="h-4 w-4 fill-none text-stone-400 transition-all duration-300 group-hover:fill-stone-100" />
          )}
        </button>
      </div>
      <h2 className="rounded-md bg-stone-400/40 px-3 py-1.5 font-semibold">
        PROJECTS
      </h2>
      <div className="grid grid-cols-2 gap-2 py-4 md:grid-cols-4">
        {isEditing && <NewProjectItem />}
      </div>
    </div>
  );
}
