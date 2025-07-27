import { useState, type ReactNode } from "react";

import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  children: ReactNode;
  value?: Date;
  onChange?: (date: string | undefined) => void;
}

export function DatePicker({ children, value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) {
              // 서울(UTC+9) 기준으로 오전 9시로 맞춤
              date.setHours(9, 0, 0, 0);
            }
            onChange?.(date?.toISOString() || undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
