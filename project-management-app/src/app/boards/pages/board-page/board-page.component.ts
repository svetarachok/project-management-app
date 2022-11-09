import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getBoards } from '../../../core/store/selectors/boards.selectors';
import { BoardsState } from '../../../core/store/state/boards.state';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';
import { Board } from '../../models/board.interface';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  board!: Board;

  boardId!: string;

  constructor(
    private route: ActivatedRoute,
    private boardsStore: Store<BoardsState>,
    public dialog: Dialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => (this.boardId = params['id']));
    this.boardsStore
      .pipe(
        select(getBoards),
        map(boards => {
          return boards.filter(board => board._id === this.boardId);
        })
      )
      .subscribe(boards => (this.board = boards[0]));
  }

  onColumnCreate(): void {
    this.dialog.open(CreateColumnModalComponent, {
      data: { id: this.board._id },
    });
  }
}
