import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { DeleteConfirmationComponent } from 'src/app/boards/components/delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import { getTasks } from 'src/app/core/store/selectors/tasks.selectors';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() taskId!: string;

  task!: Task | undefined;

  taskSubscription!: Subscription;

  constructor(public dialog: Dialog, private tasksStore: Store<TasksState>) {}

  ngOnInit() {
    this.taskSubscription = this.tasksStore
      .select(getTasks)
      .subscribe(tasks => (this.task = tasks.find(t => t._id === this.taskId)));
  }

  onTaskOpen() {
    this.dialog.open(TaskEditFormComponent, {
      data: this.task,
    });
  }

  onTaskDelete() {
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        item: this.task,
        title: 'task',
      },
    });
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
