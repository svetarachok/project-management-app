import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskPageComponent } from '../../pages/task-page/task-page.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  constructor(public dialog: Dialog) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  onTaskOpen() {
    this.dialog.open(TaskPageComponent, { data: this.task });
  }
}
