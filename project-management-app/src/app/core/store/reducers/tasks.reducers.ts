import { createReducer, on } from '@ngrx/store';

import { initialTasksState } from '../state/tasks.state';
import * as TasksActions from '../actions/tasks.actions';

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.createNewTaskSuccess, (state, { task }) => ({
    tasks: [...state.tasks, task],
  }))
);
