import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ColumnsState } from '../../../core/store/state/columns.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import { getBoards } from '../../../core/store/selectors/boards.selectors';
import { BoardsState } from '../../../core/store/state/boards.state';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';
import { Board } from '../../models/board.interface';
import { Column, ColumnsOrder } from '../../models/column.interface';
import { getColumns } from '../../../core/store/selectors/columns.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  board!: Board;

  boardId!: string;

  columns!: Column[] | [];

  subs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private boardsStore: Store<BoardsState>,
    private columnStore: Store<ColumnsState>,
    public dialog: Dialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => (this.boardId = params['id']));
    this.columnStore.dispatch(
      columnsActions.getColumns({ boardId: this.boardId })
    );
    this.boardsStore
      .pipe(
        select(getBoards),
        map(boards => {
          return boards.filter(board => board._id === this.boardId);
        })
      )
      .subscribe(boards => (this.board = boards[0]));
    this.getAllColumns();
  }

  onColumnCreateClick(): void {
    this.dialog.open(CreateColumnModalComponent, {
      data: { id: this.board._id },
    });
  }

  getAllColumns(): void {
    this.subs = this.columnStore
      .select(getColumns)
      .pipe(map(columns => [...columns].sort((a, b) => a.order - b.order)))
      .subscribe(columns => (this.columns = columns));
  }

  dropColumns(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const newColumnsOrder: ColumnsOrder[] = [];
    this.columns.map((column, index) =>
      newColumnsOrder.push({ _id: column._id!, order: index })
    );
    this.columnStore.dispatch(
      columnsActions.updateColumnsOrder({ columns: newColumnsOrder })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
