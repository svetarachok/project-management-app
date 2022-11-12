import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/boards/models/column.interface';
import { ColumnsState } from 'src/app/core/store/state/columns.state';

@Component({
  selector: 'app-column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;

  constructor(private columnsStore: Store<ColumnsState>) {}
  ngOnInit() {

  }

  onRemoveColumnClick(id: string) {
    console.log('deleted', id);
  }
}
