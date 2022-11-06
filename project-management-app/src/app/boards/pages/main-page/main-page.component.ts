import { Component } from '@angular/core';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

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

  constructor(public modalsService: ModalsService) {}

  removeBoard(i: number) {
    this.boards = this.boards.filter((board, index) => index !== i)
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }
}
