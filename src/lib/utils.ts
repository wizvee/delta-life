import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import isoWeek from "dayjs/plugin/isoWeek";
import { clsx, type ClassValue } from "clsx";

dayjs.extend(isoWeek);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMM DD, YYYY");
}

export function formatDuration(m: number) {
  const hours = Math.floor(m / 60);
  const minutes = m % 60;
  let result = "";

  if (m === 0) {
    result += `0m`;
  }
  if (hours > 0) {
    result += `${hours}h`;
  }
  if (minutes > 0) {
    if (result) result += " ";
    result += `${minutes}m`;
  }

  return result;
}

export function getWeekStart(dateStr?: string | undefined) {
  return dayjs(dateStr).startOf("isoWeek").format("YYYY-MM-DD");
}

export function getWeekRange(dateStr?: string | undefined) {
  const date = dayjs(dateStr);
  const monday = date.startOf("isoWeek");
  const sunday = monday.endOf("isoWeek");
  return {
    monday: monday.format("YYYY-MM-DD"),
    sunday: sunday.format("YYYY-MM-DD"),
    year: date.isoWeekYear(),
    weekNumber: date.isoWeek(),
    nextMonday: nextWeekStart(dateStr),
    isThisWeek: dayjs().startOf("isoWeek").isSame(monday),
  };
}

export function prevWeekStart(mondayStr: string | undefined) {
  return dayjs(mondayStr).subtract(1, "week").format("YYYY-MM-DD");
}
export function nextWeekStart(mondayStr: string | undefined) {
  return dayjs(mondayStr).add(1, "week").format("YYYY-MM-DD");
}

export function calcCompletionRate(goals: { is_completed: boolean }[]) {
  const total = goals.length;
  if (total === 0) return { rate: 0, completed: 0, total: 0 };
  const completed = goals.filter((g) => g.is_completed).length;
  const rate = Math.round((completed / total) * 100);
  return { rate, completed, total };
}
