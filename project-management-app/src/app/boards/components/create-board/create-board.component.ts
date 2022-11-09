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

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  createBoardForm!: FormGroup;

  constructor(
    private store: Store<BoardsState>,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.createBoardForm.get('title');
  }

  onSubmit(formDirective: FormGroupDirective) {
    const userId = '636aa99c18256515c0ef7d0d';
    if (this.createBoardForm.valid) {
      this.store.dispatch(
        BoardActions.createNewBoard({
          title: this.title?.value,
          owner: userId,
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
