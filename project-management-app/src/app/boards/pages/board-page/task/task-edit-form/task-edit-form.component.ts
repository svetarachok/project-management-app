import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormErrors } from '../../../../models/form-errors-enum';
import { Task } from '../../../../models/task.interface';

import * as taskActions from '../../../../../core/store/actions/tasks.actions';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
})
export class TaskEditFormComponent implements OnInit {
  task!: Task;

  formTask!: FormGroup;

  constructor(
    @Inject(DIALOG_DATA)
    public data: Task,
    public dialogRef: DialogRef,
    private taskStore: Store<TaskState>
  ) {}

  ngOnInit(): void {
    this.task = this.data;
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
        users: this.task.users,
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

  onClose(): void {
    this.dialogRef.close();
  }
}
