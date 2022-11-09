import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardsState } from '../../../core/store/state/boards.state';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import * as BoardActions from '../../../core/store/actions/boards.actions';

import { FormErrors } from '../../models/form-errors-enum';
import { UserState } from 'src/app/core/store/state/user.state';
import { getUserId } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  createBoardForm!: FormGroup;

  userId: string = '';

  constructor(
    private store: Store<BoardsState>,
    private userStore: Store<UserState>,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    this.userStore
      .select(getUserId)
      .subscribe(user => (this.userId = user!._id));
  }

  get title() {
    return this.createBoardForm.get('title');
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.createBoardForm.valid) {
      this.store.dispatch(
        BoardActions.createNewBoard({
          title: this.title?.value,
          owner: this.userId,
          users: [],
        })
      );
      this.createBoardForm.reset();
      formDirective.resetForm();
      this.modalsService.showCreateBoardModal = false;
    }
  }

  get titleErrorMessage(): string {
    return this.title!.hasError('required') ? FormErrors.TITLE_REQUIRED : '';
  }

  onCloseModal() {
    this.modalsService.showCreateBoardModal = false;
  }
}
