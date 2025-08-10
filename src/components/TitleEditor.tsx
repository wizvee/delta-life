import { RocketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjectUpdate } from "@/lib/api/projects";

interface TitleEditorProps {
  entity: { id: string; title: string };
  isPending: boolean;
  handleUpdate: (updates: ProjectUpdate) => void;
}

export function TitleEditor({
  entity,
  isPending,
  handleUpdate,
}: TitleEditorProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(entity.title);

  useEffect(() => {
    setTitle(entity.title);
  }, [entity.title]);

  const handleTitleClick = () => setEditing(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setEditing(false);
    if (title !== entity.title && title.trim() !== "") {
      handleUpdate({ title });
    } else {
      setTitle(entity.title);
    }
  };

  return (
    <div className="mb-2 flex items-center gap-3">
      <RocketIcon className="h-6 w-6 fill-gray-500" />
      {editing ? (
        <input
          className="bg-transparent text-3xl font-bold outline-none"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
          disabled={isPending}
        />
      ) : (
        <h1
          className="flex-1 text-3xl font-bold"
          onClick={handleTitleClick}
          title="클릭하여 수정"
        >
          {title}
        </h1>
      )}
    </div>
  );
}
