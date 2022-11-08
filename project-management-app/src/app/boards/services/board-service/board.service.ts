import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '../../models/board.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  deleteBoards,
  getBoards,
} from '../../../core/store/actions/boards.actions';
import { BoardsState } from '../../../core/store/state/boards.state';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient, private store: Store<BoardsState>) {}

  createNewBoard(newBoard: Board): Observable<Board[]> {
    return this.http.post<Board[]>('/boards', newBoard);
  }

  getBoards() {
    return this.http
      .get<Board[]>('/boards')
      .pipe(
        map(boards => {
          this.store.dispatch(getBoards({ boards: boards }));
        })
      )
      .subscribe(boards => boards);
  }

  deleteBoard(id: string) {
    return this.http
      .delete(`/boards/${id}`)
      .pipe(
        tap(res => {
          console.log(res);
          this.store.dispatch(deleteBoards({ id }));
        })
      )
      // .subscribe();
  }
}
