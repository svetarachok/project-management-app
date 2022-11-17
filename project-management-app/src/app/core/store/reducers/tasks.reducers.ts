import { createReducer, on } from '@ngrx/store';

import { initialTasksState } from '../state/tasks.state';
import * as TasksActions from '../actions/tasks.actions';

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.createNewTaskSuccess, (state, { task }) => ({
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.getAllTasksSuccess, (state, { tasks }) => ({
    tasks: [...tasks],
  })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    tasks: [...state.tasks.filter(t => t._id !== task._id), task],
  })),
  on(TasksActions.updateTaskSetSuccess, (state, { tasks }) => ({
    tasks: [
      ...state.tasks.map(obj => tasks.find(o => o._id === obj._id) || obj),
    ],
  }))
);
