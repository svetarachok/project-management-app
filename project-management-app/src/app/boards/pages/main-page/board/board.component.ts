import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from '../../../models/board.interface';
import { BoardsState } from '../../../../core/store/state/boards.state';
import * as boardsActions from '../../../../core/store/actions/boards.actions';
import { ColumnsState } from '../../../../core/store/state/columns.state';
import * as columnsActions from '../../../../core/store/actions/columns.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(
    private router: Router,
    private boardsStore: Store<BoardsState>,
    private columnsStore: Store<ColumnsState>
  ) {}

  navigateToBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
    this.columnsStore.dispatch(
      columnsActions.getBoardIdToStore({ boardId: boardId })
    );
  }

  removeBoard(id: string) {
    this.boardsStore.dispatch(boardsActions.deleteBoards({ _id: id }));
  }
}
