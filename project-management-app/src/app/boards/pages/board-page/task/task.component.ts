import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { DeleteConfirmationComponent } from 'src/app/boards/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() currentTask!: Task;

  isDeleted: boolean = false;

  constructor(public dialog: Dialog) {}

  onTaskOpen() {
    this.dialog.open(TaskEditFormComponent, {
      data: this.currentTask,
    });
  }

  onTaskDelete() {
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        item: this.currentTask,
        title: 'task',
      },
    });
  }
}
