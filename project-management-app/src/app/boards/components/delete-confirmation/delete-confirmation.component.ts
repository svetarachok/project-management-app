import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardsState } from 'src/app/core/store/state/boards.state';
import * as boardsActions from '../../../core/store/actions/boards.actions';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { Column } from '../../models/column.interface';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import { Task } from '../../models/task.interface';
import { TasksState } from '../../../core/store/state/tasks.state';
import * as tasksActions from '../../../core/store/actions/tasks.actions';
import { Board } from '../../models/board.interface';
import { TaskService } from '../../services/task-service/task.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: { item: Board | Column | Task; title: string },
    public dialogRef: DialogRef,
    private boardsStore: Store<BoardsState>,
    private columnsStore: Store<ColumnsState>,
    private tasksStore: Store<TasksState>,
    private tasksService: TaskService
  ) {}

  confirmDelete() {
    if (this.data.title === 'board') {
      this.boardsStore.dispatch(
        boardsActions.deleteBoards({ _id: (this.data.item as Board)._id! })
      );
    }
    if (this.data.title === 'column') {
      this.columnsStore.dispatch(
        columnsActions.deleteColumn({
          _id: (this.data.item as Column)._id!,
          boardId: (this.data.item as Column).boardId!,
        })
      );
    }
    if (this.data.title === 'task') {
      this.tasksStore.dispatch(
        tasksActions.deleteTask({ task: this.data.item as Task })
      );
    }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
