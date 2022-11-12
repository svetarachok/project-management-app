import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './pages/main-page/board/board.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { ColumnComponentComponent } from './components/column/column-component/column-component.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    BoardComponent,
    CreateColumnModalComponent,
    ColumnComponentComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: MainPageComponent },
      { path: 'board/:id', component: BoardPageComponent },
    ]),
  ],
})
export class BoardsModule {}
