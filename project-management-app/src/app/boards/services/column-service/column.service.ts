import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ColumnsState } from '../../../core/store/state/columns.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import { Column, ColumnsOrder } from '../../models/column.interface';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  constructor(
    private http: HttpClient,
    private columnsStore: Store<ColumnsState>
  ) {}

  createColumn(
    title: string,
    order: number,
    boardId: string
  ): Observable<Column> {
    const column = {
      title: title,
      order: order,
    };
    const url = `/boards/${boardId}/columns`;
    return this.http.post<Column>(url, column);
  }

  getColumns(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`/boards/${boardId}/columns`);
  }

  deleteColumn(columnId: string, boardId: string) {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  updateColumns(columns: ColumnsOrder[]) {
    return this.http.patch<Column[]>('/columnsSet', columns);
  }

  updateColumnTitle(boardId: string, column: Column, columnId: string) {
    return this.http.put<Column>(
      `/boards/${boardId}/columns/${columnId}`,
      column
    );
  }
}
