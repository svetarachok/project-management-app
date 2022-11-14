import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(task: Task, boardId: string, columnId: string): Observable<Task> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<Task>(url, task);
  }

  getTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<Task[]>(url);
  }
}
