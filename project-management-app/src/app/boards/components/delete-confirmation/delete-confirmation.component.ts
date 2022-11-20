import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.interface';
import { TasksState } from '../../../core/store/state/tasks.state';
import * as tasksActions from '../../../core/store/actions/tasks.actions';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import { Column } from '../../models/column.interface';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: { item: Task | Column; title: string },
    public dialogRef: DialogRef,
    private columnsStore: Store<ColumnsState>,
    private tasksStore: Store<TasksState>
  ) {}

  confirmDelete() {
    if (this.data.title === 'task') {
      this.tasksStore.dispatch(
        tasksActions.deleteTask({ task: this.data.item as Task })
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
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
