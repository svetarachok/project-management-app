import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Column } from 'src/app/boards/models/column.interface';

@Component({
  selector: 'app-column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: Column;
}
