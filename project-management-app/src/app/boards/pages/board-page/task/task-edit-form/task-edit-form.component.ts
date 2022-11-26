import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormErrors } from '../../../../models/form-errors-enum';
import { Task } from '../../../../models/task.interface';

import * as taskActions from '../../../../../core/store/actions/tasks.actions';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { User } from 'src/app/core/models/user.model';
import { getCurrentBoardUsers } from 'src/app/core/store/selectors/columns.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
})
export class TaskEditFormComponent implements OnInit {
  task!: Task;

  formTask!: FormGroup;

  assignedUsersObjects: User[] = [];

  assignedUsersIds: string[] = [];

  constructor(
    @Inject(DIALOG_DATA)
    public data: Task,
    public dialogRef: DialogRef,
    private taskStore: Store<TaskState>,
    private columnsStore: Store<ColumnsState>
  ) {}

  ngOnInit(): void {
    this.task = this.data;
    this.columnsStore
      .select(getCurrentBoardUsers)
      .pipe(
        map(users => users.filter(user => this.task.users.includes(user._id)))
      )
      .subscribe(users => (this.assignedUsersObjects = users));
    this.assignedUsersIds = [...this.task.users];
    this.formTask = new FormGroup({
      title: new FormControl(`${this.task.title}`, [Validators.required]),
      description: new FormControl(`${this.task.description}`),
    });
  }

  get title() {
    return this.formTask.get('title');
  }

  get description() {
    return this.formTask.get('description');
  }

  get titleErrorMessage(): string {
    return this.title!.hasError('required')
      ? FormErrors.TASK_TITLE_REQUIRED
      : '';
  }

  onTaskDataChanged(): void {
    if (this.formTask.valid) {
      const task: Task = {
        title: this.title!.value,
        order: this.task.order,
        columnId: this.task.columnId,
        description: this.description!.value,
        userId: this.task.userId,
        users: this.assignedUsersIds,
      };
      this.taskStore.dispatch(
        taskActions.updateTask({
          task: task,
          taskId: this.task._id!,
          boardId: this.task.boardId!,
        })
      );
      this.dialogRef.close();
    }
  }

  deleteAssignedUser(userId: string) {
    this.assignedUsersIds = this.assignedUsersIds.filter(id => id !== userId);
    this.assignedUsersObjects = this.assignedUsersObjects.filter(
      user => user._id !== userId
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
