import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';



@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoardsModule { }
