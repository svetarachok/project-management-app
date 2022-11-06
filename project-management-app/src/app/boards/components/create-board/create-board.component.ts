import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import { BoardsState } from 'src/app/core/store/state/boards.state';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import * as BoardActions from '../../../core/store/actions/boards.actions';

import { FormErrors } from '../../../shared/utils/form-errors-enum';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  createBoardForm!: FormGroup;

  constructor(private store: Store<BoardsState>, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.createBoardForm.get('title');
  }

  get description() {
    return this.createBoardForm.get('description');
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.createBoardForm.valid) {
      this.store.dispatch(BoardActions.createNewBoard({ title: this.title?.value, description: this.description?.value }))
      this.createBoardForm.reset();
      formDirective.resetForm();
      this.modalsService.showCreateBoardModal = false;
    }
  }

  get titleErrorMessage(): string {
    return this.title!.hasError('required') ? FormErrors.TITLE_REQUIRED : '' ;
  }

  get descriptionErrorMessage(): string {
    return this.description!.hasError('required') ? FormErrors.DESCRIPTION_REQUIRED : '' ;
  }

  onCloseModal() {
    this.modalsService.showCreateBoardModal = false;
  }

}
