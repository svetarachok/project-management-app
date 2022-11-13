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
      mergeMap((action: Task) => {
        return this.tasksService.createTask(action).pipe(
          map(task => {
            return tasksActions.createNewTaskSuccess({ task });
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private tasksService: TaskService) {}
}
