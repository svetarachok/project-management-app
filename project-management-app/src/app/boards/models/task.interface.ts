export interface Task {
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}
