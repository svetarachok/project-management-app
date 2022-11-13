import * as fromTasks from '../state/tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getTasksSelector =
  createFeatureSelector<fromTasks.TasksState>('tasks');

export const getTasksQuantity = createSelector(
  getTasksSelector,
  tasks => tasks.tasks.length
);
