import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllTasks } from 'src/app/core/store/actions/tasks.actions';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  currentTask!: Task;

  constructor(public dialog: Dialog, private tasksStore: Store<TasksState>) {}

  ngOnInit(): void {
  }

  onTaskOpen() {
    this.dialog.open(TaskEditFormComponent, { data: this.task });
  }
}
