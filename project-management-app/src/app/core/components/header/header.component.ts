import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from '../../services/modals-services/modals.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

import * as fromUser from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthorized: boolean = false;

  private subs!: Subscription;

  constructor(
    private modalsService: ModalsService,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subs = this.store.select(fromUser.getIsAuth).subscribe(status => {
      this.isUserAuthorized = status;
    });
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }

  logout(): void {
    this.userService.logout();
    this.store.dispatch(UserActions.removeUser());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
