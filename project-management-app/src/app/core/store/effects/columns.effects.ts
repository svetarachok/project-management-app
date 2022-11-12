/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

import * as columnsActions from '../actions/columns.actions';

import { ColumnService } from '../../../boards/services/column-service/column.service';
import { Column } from '../../../boards/models/column.interface';
import { Action } from '@ngrx/store';
import { ColumnsState } from '../state/columns.state';

@Injectable()
export class ColumnsEffects {
  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.CREATE_COLUMN),
      mergeMap((action: Column) => {
        return this.columnsService
          .createColumn(action.title, action.order, action.boardId!)
          .pipe(
            map(column => {
              return columnsActions.createNewColumnSuccess({ column });
            })
          );
      })
    );
  });

  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.GET_COLUMNS),
      mergeMap((action: ColumnsState) => {
        return this.columnsService.getColumns(action.boardId).pipe(
          map(columns => {
            return columnsActions.getColumnsSuccess({ columns });
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
