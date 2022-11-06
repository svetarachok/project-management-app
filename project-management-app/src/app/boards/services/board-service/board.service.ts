import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Board } from '../../models/board.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  createNewBoard( newBoard: Board): Observable<Board[]> {
    return this.http.put<Board[]>('/boards', newBoard);
  }
}
