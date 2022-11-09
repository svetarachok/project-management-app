import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import { getBoards } from '../../../core/store/selectors/boards.selectors';
import { Board } from '../../models/board.interface';
import { Store } from '@ngrx/store';
import { BoardsState } from '../../../core/store/state/boards.state';
import { Observable } from 'rxjs';

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
    private boardsStore: Store<BoardsState>
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsStore.select(getBoards);
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }
}
