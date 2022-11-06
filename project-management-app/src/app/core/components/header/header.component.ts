import { Component } from '@angular/core';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isUserAuthorized: boolean = true;

  constructor(private modalsService: ModalsService) {}

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }
}
