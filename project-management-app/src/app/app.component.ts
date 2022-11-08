import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserAction from './core/store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UserAction.fetchUser());
  }
}
