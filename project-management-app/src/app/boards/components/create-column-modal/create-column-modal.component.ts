import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrors } from '../../models/form-errors-enum';

import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { Store } from '@ngrx/store';
import * as ColumnsActions from '../../../core/store/actions/columns.actions';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  createColumnFrom!: FormGroup;

  constructor(
    @Inject(DIALOG_DATA) public data: { id: string },
    public dialogRef: DialogRef,
    private columnStore: Store<ColumnsState>
  ) {}

  ngOnInit(): void {
    this.createColumnFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.createColumnFrom.get('title');
  }

  get titleErrorMessage(): string {
    return this.title!.hasError('required') ? FormErrors.TITLE_REQUIRED : '';
  }

  onSubmit() {
    if (this.createColumnFrom.valid) {
      console.log(this.createColumnFrom.valid);
      this.columnStore.dispatch(
        ColumnsActions.createNewColumn({
          title: this.title?.value,
          order: 0,
          boardId: this.data.id,
        })
      );
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
