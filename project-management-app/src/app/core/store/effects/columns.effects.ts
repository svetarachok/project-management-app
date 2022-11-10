/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';

import * as columnsActions from '../actions/columns.actions';

import { ColumnService } from '../../../boards/services/column-service/column.service';
import { Column } from '../../../boards/models/column.interface';

@Injectable()
export class ColumnsEffects {
  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.CREATE_COLUMN),
      mergeMap((action: Column) => {
        return this.columnsService
          .createColumn(action.title, action.order, action.boardId!)
          .pipe(
            tap(column => console.log(column)),
            map(column => {
              console.log(column);
              return columnsActions.createNewColumnSuccess({ column });
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private columnsService: ColumnService
  ) {}
}
