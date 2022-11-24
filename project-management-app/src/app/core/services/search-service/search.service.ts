import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../../boards/models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  data!: Task[];

  startedSearch: boolean = false;

  searchRequest: string = '';

  searchResults: BehaviorSubject<Task[]> = new BehaviorSubject(this.data);

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http
      .get<Task[]>('/tasksSet', {
        params: new HttpParams().set('search', query),
      })
      .subscribe(res => {
        this.searchResults.next([...res]);
      });
  }
}
