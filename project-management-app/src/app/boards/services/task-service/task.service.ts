import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  allTasks!: Task[];

  constructor(private http: HttpClient) {}

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
}
