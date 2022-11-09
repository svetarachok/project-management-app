import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import { getBoards } from '../../../core/store/selectors/boards.selectors';
import { Board } from '../../models/board.interface';
import { Store } from '@ngrx/store';
import { BoardsState } from '../../../core/store/state/boards.state';
import * as boardsActions from '../../../core/store/actions/boards.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/core/store/state/user.state';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  boards$!: Observable<Board[]>;

  userId: string = '';

  constructor(
    public modalsService: ModalsService,
    private boardsStore: Store<BoardsState>,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsStore.select(getBoards);
  }

  removeBoard(id: string) {
    this.boards$ = this.boards$.pipe(
      map(boards => boards.filter(board => board._id !== id))
    );
    this.boardsStore.dispatch(boardsActions.deleteBoards({ _id: id }));
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }
}
