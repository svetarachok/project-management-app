import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Column } from 'src/app/boards/models/column.interface';
import { Task, TaskForUpdateInSet } from 'src/app/boards/models/task.interface';

import { Store } from '@ngrx/store';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import * as columnsActions from '../../../../core/store/actions/columns.actions';
import * as tasksActions from '../../../../core/store/actions/tasks.actions';

import { FormErrors } from '../../../models/form-errors-enum';
import { CreateTaskModalComponent } from '../../../components/create-task-modal/create-task-modal.component';
import { Subscription } from 'rxjs';
import { getTasks } from 'src/app/core/store/selectors/tasks.selectors';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DeleteConfirmationComponent } from 'src/app/boards/components/delete-confirmation/delete-confirmation.component';
import { TaskService } from 'src/app/boards/services/task-service/task.service';

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
    private taskStore: Store<TasksState>,
    private tasksService: TaskService
  ) {}

  ngOnInit() {
    this.boardId = this.column.boardId!;
    this.formTitleInput = new FormGroup({
      columnTitle: new FormControl(`${this.column.title}`, [
        Validators.required,
      ]),
    });
    this.tasksSubscription = this.taskStore
      .select(getTasks)
      .subscribe(tasks => {
        this.tasks = tasks.filter(task => task.columnId === this.column._id);
        this.tasks.sort((a, b) => a.order - b.order);
      });
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

  onRemoveColumnClick(column: Column) {
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        item: column,
        title: 'column',
      },
    });
  }

  onTaskAddClick(): void {
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
      this.tasks = this.tasks.map(task => {
        const changedOrder = event.container.data.findIndex(
          item => item._id === task._id
        );
        task = { ...task };
        task.order = changedOrder!;
        return task;
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.tasks = this.tasks.map(task => {
        const changedOrder = event.container.data.findIndex(
          item => item._id === task._id
        );
        task = { ...task };
        task.order = changedOrder!;
        task.columnId = event.container.id;
        return task;
      });
    }
    const newTaskSet: TaskForUpdateInSet[] = this.makeTasksSet(
      event.container.data,
      this.column._id!
    );
    this.taskStore.dispatch(tasksActions.updateTaskSet({ tasks: newTaskSet }));
  }

  makeTasksSet(fromArray: Task[], columnId: string): TaskForUpdateInSet[] {
    const newTaskSet: TaskForUpdateInSet[] = fromArray.map((task, index) => {
      let newTask = {
        _id: task._id!,
        order: index,
        columnId: columnId,
      };
      return newTask;
    });
    return newTaskSet;
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }
}
