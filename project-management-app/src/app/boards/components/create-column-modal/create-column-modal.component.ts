import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrors } from '../../models/form-errors-enum';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  createColumnFrom!: FormGroup;

  constructor(
    @Inject(DIALOG_DATA) public data: { id: string },
    public dialogRef: DialogRef
  ) {}

  ngOnInit(): void {
    console.log(this.data.id);
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
    console.log(this.createColumnFrom);
  }

  onClose() {
    this.dialogRef.close();
  }
}
