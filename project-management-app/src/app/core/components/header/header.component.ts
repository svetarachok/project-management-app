import { Component } from '@angular/core';
import { ModalsService } from '../../services/modals-services/modals.service';

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
