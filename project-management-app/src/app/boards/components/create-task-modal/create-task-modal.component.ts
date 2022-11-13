import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TasksState } from '../../../core/store/state/tasks.state';
import * as tasksActions from '../../../core/store/actions/tasks.actions';
import { UserState } from '../../../core/store/state/user.state';
import { getUserId } from '../../../core/store/selectors/user.selectors';

import { FormErrors } from '../../models/form-errors-enum';
import { getTasksQuantity } from 'src/app/core/store/selectors/tasks.selectors';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit, OnDestroy {
  createTaskForm!: FormGroup;

  userId: string = '';

  userIdSubscription!: Subscription;

  taskQuantitySubscription!: Subscription;

  taskOrder!: number;

  constructor(
    @Inject(DIALOG_DATA) public data: { columnId: string; boardId: string },
    public dialogRef: DialogRef,
    private userStore: Store<UserState>,
    private tasksStore: Store<TasksState>
  ) {}

  ngOnInit(): void {
    this.userIdSubscription = this.userStore
      .select(getUserId)
      .subscribe(user => (this.userId = user?._id!));
    this.taskQuantitySubscription = this.tasksStore
      .select(getTasksQuantity)
      .subscribe(quantity => (this.taskOrder = quantity));
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.createTaskForm.get('title');
  }

  get titleErrorMessage() {
    return this.title!.hasError('required') ? FormErrors.TITLE_REQUIRED : '';
  }

  get description() {
    return this.createTaskForm.get('description');
  }

  get descriptionErrorMessage() {
    return this.description!.hasError('required')
      ? FormErrors.DESCRIPTION_REQUIRED
      : '';
  }

  onSubmit() {
    if (this.createTaskForm.valid) {
      const task: Task = {
        title: this.title?.value,
        order: this.taskOrder,
        boardId: this.data.boardId,
        columnId: this.data.columnId,
        description: this.description?.value,
        userId: this.userId,
        users: [],
      };
      this.tasksStore.dispatch(tasksActions.createNewTask({ task: task }));
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
    this.taskQuantitySubscription.unsubscribe();
  }
}
