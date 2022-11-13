import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    const url = `/boards/${task.boardId}/columns`;
    return this.http.post<Task>(url, task);
  }
}
