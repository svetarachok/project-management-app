import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import { getBoards } from 'src/app/core/store/selectors/boards.selectors';
import { Board } from '../../models/board.interface';
import { Store } from '@ngrx/store';
import { BoardsState } from 'src/app/core/store/state/boards.state';
import * as boardsActions from '../../../core/store/actions/boards.actions';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardService } from '../../services/board-service/board.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  boards$!: Observable<Board[]>;

  getBaordsSubscription!: Subscription;

  constructor(
    public modalsService: ModalsService,
    private store: Store<BoardsState>,
    private boardsService: BoardService
  ) {
    this.getBaordsSubscription = this.boardsService.getBoards();
  }

  ngOnInit(): void {
    this.boards$ = this.store.select(getBoards);
  }

  removeBoard(id: string) {
    this.boards$ = this.boards$.pipe(
      map(boards => boards.filter(board => board._id !== id))
    );
    this.store.dispatch(boardsActions.deleteBoards({ _id: id }));
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }

  ngOnDestroy(): void {
    this.getBaordsSubscription.unsubscribe();
  }
}
