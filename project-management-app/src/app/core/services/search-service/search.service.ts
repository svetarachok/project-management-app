import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../../boards/models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  startedSearch: boolean = false;

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<Task[]>('/tasksSet', {
      params: new HttpParams().set('search', query),
    });
  }
}
