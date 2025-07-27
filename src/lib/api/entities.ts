export type Entity = {
  id: string;
  user_id: string;
  stat_id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  due_date?: string;
};

export type EntityUpdate = Partial<Omit<Entity, "id" | "user_id" | "stat_id">>;
