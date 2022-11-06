import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';



@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: MainPageComponent },
    ]),
  ]
})
export class BoardsModule { }
