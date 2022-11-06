import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  boards = [
    {title: 'Board 1'},
    {title: 'Board 2'},
  ]

  removeBoard(i: number) {
    this.boards = this.boards.filter((board, index) => index !== i)
  }
}
