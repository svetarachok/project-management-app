import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardsState } from 'src/app/core/store/state/boards.state';
import { Column } from '../../models/column.interface';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  constructor(private http: HttpClient, private store: Store<BoardsState>) {}

  createColumn(title: string, order: number, boardId: string) {
    const column = {
      title: title,
      order: order,
    };
    console.log(column);
    const url = `/boards/${boardId}/columns`;
    return this.http.post<Column>(url, column);
  }
}
