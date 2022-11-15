import { createAction, props } from '@ngrx/store';
import { Task } from '../../../boards/models/task.interface';

export const CREATE_TASK = '[Column] Create New Task';
export const CREATE_TASK_SUCCESS = '[Column] New Task Created';

export const GET_ALL_TASKS = '[Column] Get all tasks';
export const GET_ALL_TASKS_SUCCESS = '[Column] Get all tasks success';

export const UPADTE_TASK = '[Task Modal] Update task';
export const UPADTE_TASK_SUCCESS = '[Task Modal] Update task success';

export const createNewTask = createAction(
  CREATE_TASK,
  props<{ task: Task; boardId: string; columnId: string }>()
);
export const createNewTaskSuccess = createAction(
  CREATE_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const getAllTasks = createAction(
  GET_ALL_TASKS,
  props<{ boardId: string; columnId: string }>()
);
export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const updateTask = createAction(
  UPADTE_TASK,
  props<{ task: Task; taskId: string }>()
);
export const updateTaskSuccess = createAction(
  UPADTE_TASK_SUCCESS,
  props<{ task: Task }>()
);
