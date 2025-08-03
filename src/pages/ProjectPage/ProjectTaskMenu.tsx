import { useState } from "react";
import { Ellipsis } from "lucide-react";
import type { Task } from "@/lib/api/tasks";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  task: Task;
}

export default function ProjectTaskMenu({ task }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">
            <Ellipsis className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Due date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Due Date</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <Calendar
              mode="single"
              selected={task.due_date ? new Date(task.due_date) : undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  // 서울(UTC+9) 기준으로 오전 9시로 맞춤
                  date.setHours(9, 0, 0, 0);
                }
                console.log(date?.toISOString() || undefined);
                // onChange?.(date?.toISOString() || undefined);
                setDialogOpen(false);
              }}
            />
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
