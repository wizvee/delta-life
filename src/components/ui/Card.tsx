import type { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function Card({ title, icon, children }: Props) {
  return (
    <section className="rounded-md bg-neutral-100 p-3">
      <div className="flex items-center gap-1">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
