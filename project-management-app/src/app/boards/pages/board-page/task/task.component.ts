import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;

  currentTask!: Task;

  constructor(public dialog: Dialog) {}

  onTaskOpen() {
    this.dialog.open(TaskEditFormComponent, {
      data: this.task,
    });
  }

  updateTask(newTask: Task) {
    console.log(this.task);
    console.log(newTask);
    this.task = newTask;
  }
}
