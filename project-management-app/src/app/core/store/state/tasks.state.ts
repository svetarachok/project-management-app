import { Task } from '../../../boards/models/task.interface';

export interface TasksState {
  tasks: Task[];
}

export const initialTasksState: TasksState = {
  tasks: [],
};
