import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/boards/models/column.interface';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import { FormErrors } from '../../models/form-errors-enum';

@Component({
  selector: 'app-column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;

  boardId!: string;

  formTitleInput!: FormGroup;

  isFocused: boolean = false;

  constructor(private columnsStore: Store<ColumnsState>) {}

  ngOnInit() {
    this.boardId = this.column.boardId!;
    this.formTitleInput = new FormGroup({
      columnTitle: new FormControl(`${this.column.title}`, [
        Validators.required,
      ]),
    });
  }

  get columnTitle() {
    return this.formTitleInput.get('columnTitle');
  }

  get titleErrorMessage(): string {
    return this.columnTitle!.hasError('required')
      ? FormErrors.TITLE_REQUIRED
      : '';
  }

  onCloseTitleInput() {
    this.isFocused = false;
    this.formTitleInput.patchValue({ columnTitle: this.column.title });
  }

  onTitleChanged() {
    if (this.formTitleInput.valid) {
      const columnToUpdate: Column = {
        title: this.columnTitle!.value,
        order: this.column.order,
      };
      this.columnsStore.dispatch(
        columnsActions.updateColumnTitle({
          boardId: this.boardId,
          column: columnToUpdate,
          columnId: this.column._id!,
        })
      );
      this.isFocused = false;
    }
  }

  onRemoveColumnClick(id: string) {
    this.columnsStore.dispatch(
      columnsActions.deleteColumn({ _id: id, boardId: this.boardId })
    );
  }
}
