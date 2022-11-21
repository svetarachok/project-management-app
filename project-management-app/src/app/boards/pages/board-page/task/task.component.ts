import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { DeleteConfirmationComponent } from 'src/app/boards/components/delete-confirmation/delete-confirmation.component';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import { Store } from '@ngrx/store';
import { getTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() currentTask!: Task;

  task!: Task;

  constructor(public dialog: Dialog, private tasksStore: Store<TasksState>) {}

  // ngOnInit() {
  //   this.tasksStore
  //     .select(getTasks)
  //     .pipe(
  //       map(tasks => tasks.filter(task => task._id === this.currentTask._id))
  //     )
  //     .subscribe(tasks => {
  //       const t: Task = tasks[0];
  //       this.task = t;
  //     });
  // }

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
