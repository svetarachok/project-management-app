import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from '../../../models/board.interface';
import { ColumnsState } from '../../../../core/store/state/columns.state';
import * as columnsActions from '../../../../core/store/actions/columns.actions';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteConfirmationComponent } from 'src/app/boards/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(
    private router: Router,
    private columnsStore: Store<ColumnsState>,
    public dialog: Dialog
  ) {}

  navigateToBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
    this.columnsStore.dispatch(
      columnsActions.getBoardIdToStore({ boardId: boardId })
    );
  }

  removeBoard() {
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        item: this.board,
        title: 'board',
      },
    });
  }
}
