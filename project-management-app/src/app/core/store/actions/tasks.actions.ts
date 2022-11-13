import { createAction, props } from '@ngrx/store';
import { Task } from '../../../boards/models/task.interface';

export const CREATE_TASK = '[Column] Create New Task';
export const CREATE_TASK_SUCCESS = '[Column] New Task Created';

export const createNewTask = createAction(CREATE_TASK, props<{ task: Task }>());
export const createNewTaskSuccess = createAction(
  CREATE_TASK_SUCCESS,
  props<{ task: Task }>()
);
