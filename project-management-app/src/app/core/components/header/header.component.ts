import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from '../../services/modals-services/modals.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

import * as fromUser from '../../store/selectors/user.selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthorized: boolean = false;

  private subs!: Subscription;

  languageList = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'РУ' },
  ];

  constructor(
    private modalsService: ModalsService,
    private store: Store,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subs = this.store.select(fromUser.getIsAuth).subscribe(status => {
      this.isUserAuthorized = status;
    });
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }

  logout(): void {
    this.userService.logout();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
