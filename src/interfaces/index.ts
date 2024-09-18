export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string;
  is_important: boolean;
  created_at?: string;
}