import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLgDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  // const now = new Date();
  // // 날짜만 비교 (시간 무시)
  // const target = new Date(date);
  // target.setHours(0, 0, 0, 0);
  // now.setHours(0, 0, 0, 0);
  // const diffTime = target.getTime() - now.getTime();
  // const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // if (diffDays === 0) {
  //   return "Today";
  // }
  // if (diffDays > 0 && diffDays <= 7) {
  //   return `In ${diffDays} day${diffDays === 1 ? "" : "s"}`;
  // }
  // if (diffDays < 0) {
  //   return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} ago`;
  // }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
