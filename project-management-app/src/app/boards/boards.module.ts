import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './pages/main-page/board/board.component';

import { ExpCheckGuard } from '../core/guards/exp-check.guard';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { NotAuthGuard } from '../core/guards/not-auth.guard';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    BoardComponent,
    CreateColumnModalComponent,
    ColumnComponent,
    TaskComponent,
    CreateTaskModalComponent,
    TaskPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
      {
        path: 'board/:id',
        component: BoardPageComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
      {
        path: 'board/:id/task/:id',
        component: TaskPageComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
    ]),
  ],
})
export class BoardsModule {}
