import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Column } from 'src/app/boards/models/column.interface';
import { Task } from 'src/app/boards/models/task.interface';

import { Store } from '@ngrx/store';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import * as tasksActions from '../../../core/store/actions/tasks.actions';

import { FormErrors } from '../../models/form-errors-enum';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { ConnectableObservable, Subscription } from 'rxjs';
import { getTasks } from 'src/app/core/store/selectors/tasks.selectors';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input() column!: Column;

  @Input() columns!: Column[];

  columnsIds: string[] = [];

  boardId!: string;

  formTitleInput!: FormGroup;

  isFocused: boolean = false;

  tasks: Task[] = [];

  tasksSubscription!: Subscription;

  constructor(
    private columnsStore: Store<ColumnsState>,
    public dialog: Dialog,
    private taskStore: Store<TasksState>
  ) {}

  ngOnInit() {
    this.boardId = this.column.boardId!;
    this.taskStore.dispatch(
      tasksActions.getAllTasks({
        boardId: this.boardId,
        columnId: this.column._id!,
      })
    );
    this.formTitleInput = new FormGroup({
      columnTitle: new FormControl(`${this.column.title}`, [
        Validators.required,
      ]),
    });
    this.tasksSubscription = this.taskStore.select(getTasks).subscribe(tasks =>
      tasks.map(task => {
        if (this.column._id === task.columnId) {
          this.tasks.push(task);
        }
      })
    );
    this.getColumnsIds();
  }

  getColumnsIds() {
    for (let column of this.columns) {
      this.columnsIds.push(column._id!);
    }
  }

  get columnTitle() {
    return this.formTitleInput.get('columnTitle');
  }

  get titleErrorMessage(): string {
    return this.columnTitle!.hasError('required')
      ? FormErrors.TITLE_REQUIRED
      : '';
  }

  onCloseTitleInput() {
    this.isFocused = false;
    this.formTitleInput.patchValue({ columnTitle: this.column.title });
  }

  onTitleChanged() {
    if (this.formTitleInput.valid) {
      const columnToUpdate: Column = {
        title: this.columnTitle!.value,
        order: this.column.order,
      };
      this.columnsStore.dispatch(
        columnsActions.updateColumnTitle({
          boardId: this.boardId,
          column: columnToUpdate,
          columnId: this.column._id!,
        })
      );
      this.isFocused = false;
    }
  }

  onRemoveColumnClick(id: string) {
    this.columnsStore.dispatch(
      columnsActions.deleteColumn({ _id: id, boardId: this.boardId })
    );
  }

  onTaskAddClick() {
    this.dialog.open(CreateTaskModalComponent, {
      data: {
        columnId: this.column._id,
        boardId: this.boardId,
        taskOrder: this.tasks.length,
      },
    });
  }

  dropTasks(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event.container.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }
}
