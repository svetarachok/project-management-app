import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Task } from 'src/app/boards/models/task.interface';

import { TaskService } from '../../../boards/services/task-service/task.service';
import * as tasksActions from '../actions/tasks.actions';

@Injectable()
export class TasksEffects {
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.CREATE_TASK),
      mergeMap(
        (action: {
          task: Task;
          boardId: string;
          columnId: string;
          type: string;
        }) => {
          return this.tasksService
            .createTask(action.task, action.boardId, action.columnId)
            .pipe(
              map(task => {
                return tasksActions.createNewTaskSuccess({ task });
              })
            );
        }
      )
    );
  });

  getAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.GET_ALL_TASKS),
      mergeMap(
        (action: { boardId: string; columnId: string; type: string }) => {
          return this.tasksService
            .getTasksByColumns(action.boardId, action.columnId)
            .pipe(
              map(tasks => {
                return tasksActions.getAllTasksSuccess({ tasks: tasks });
              })
            );
        }
      )
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.UPADTE_TASK),
      mergeMap(
        (action: {
          task: Task;
          taskId: string;
          boardId: string;
          type: string;
        }) => {
          return this.tasksService
            .updateTask(action.task, action.taskId, action.boardId)
            .pipe(
              map(task => {
                return tasksActions.updateTaskSuccess({ task });
              })
            );
        }
      )
    );
  });

  constructor(private actions$: Actions, private tasksService: TaskService) {}
}
