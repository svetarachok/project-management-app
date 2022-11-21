import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import { Task, TaskForUpdateInSet } from '../../models/task.interface';
import * as tasksActions from '../../../core/store/actions/tasks.actions';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  allTasks!: Task[];

  constructor(
    private http: HttpClient,
    private tasksStore: Store<TasksState>
  ) {}

  createTask(task: Task, boardId: string, columnId: string): Observable<Task> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<Task>(url, task);
  }

  getTasksByColumns(boardId: string, columnId: string): Observable<Task[]> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<Task[]>(url);
  }

  updateTask(task: Task, taskId: string, boardId: string): Observable<Task> {
    const url = `/boards/${boardId}/columns/${task.columnId}/tasks/${taskId}`;
    return this.http.put<Task>(url, task);
  }

  getAllTasks(boardId: string): Observable<Task[]> {
    const url = `/tasksSet/${boardId}`;
    return this.http.get<Task[]>(url);
  }

  updateSetOfTasks(tasks: TaskForUpdateInSet[]) {
    return this.http.patch<Task[]>('/tasksSet', tasks);
  }

  deleteTask(taskId: string, boardId: string, columnId: string) {
    return this.http.delete(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );

    // .pipe(
    //   tap(() => {
    //     return this.tasksStore.dispatch(
    //       tasksActions.deleteTask({
    //         _id: columnId,
    //         boardId: boardId,
    //         columnId: columnId,
    //       })
    //     );
    //   })
    // );
  }
}
