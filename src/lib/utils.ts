import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import minMax from "dayjs/plugin/minMax";
import isoWeek from "dayjs/plugin/isoWeek";
import { clsx, type ClassValue } from "clsx";

dayjs.extend(minMax);
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
    result += `0분`;
  }
  if (hours > 0) {
    result += `${hours}시간`;
  }
  if (minutes > 0) {
    if (result) result += " ";
    result += `${minutes}분`;
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

export function getPercentColor(value: number) {
  switch (true) {
    case value <= 0.3:
      return "stroke-[#ff8e7d]";
    case value <= 0.6:
      return "stroke-[#f7dd7d]";
    default:
      return "stroke-[#87dc8a]";
  }
}

export interface WeekSpan {
  weekNumber: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

/**
 * ISO-8601 기준(월~일)으로 주차를 나눕니다.
 * - 첫 주는 startDate 당일 시작
 * - 각 주 endDate = min(그 주의 일요일, dueDate)
 * - 날짜 문자열은 YYYY-MM-DD로 반환
 */
export function splitIntoIsoWeeks(
  startDate: string | Date,
  dueDate: string | Date,
): WeekSpan[] {
  const start = dayjs(startDate).startOf("day");
  const end = dayjs(dueDate).startOf("day");

  if (!start.isValid() || !end.isValid()) {
    throw new Error("Invalid date input.");
  }
  if (end.isBefore(start)) {
    // 시작이 마감보다 늦으면 빈 배열
    return [];
  }

  const out: WeekSpan[] = [];
  let weekNo = 1;
  let cursor = start;

  while (cursor.isSame(end) || cursor.isBefore(end)) {
    // 해당 ISO 주의 일요일(= endOf('isoWeek'))과 dueDate 중 더 이른 날짜
    const weekEnd = dayjs.min(cursor.endOf("isoWeek"), end)!;

    out.push({
      weekNumber: weekNo++,
      startDate: cursor.format("YYYY-MM-DD"),
      endDate: weekEnd.format("YYYY-MM-DD"),
    });

    // 다음 주의 시작(바로 다음 날)
    cursor = weekEnd.add(1, "day");
  }

  return out;
}
