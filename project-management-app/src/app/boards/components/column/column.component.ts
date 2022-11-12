import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/boards/models/column.interface';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import * as columnsActions from '../../../core/store/actions/columns.actions';

@Component({
  selector: 'app-column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;

  boardId!: string;

  constructor(private columnsStore: Store<ColumnsState>) {}

  ngOnInit() {
    this.boardId = this.column.boardId!;
  }

  onRemoveColumnClick(id: string) {
    this.columnsStore.dispatch(
      columnsActions.deleteColumn({ _id: id, boardId: this.boardId })
    );
  }
}
