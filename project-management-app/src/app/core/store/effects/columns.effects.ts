/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

import * as columnsActions from '../actions/columns.actions';

import { ColumnService } from '../../../boards/services/column-service/column.service';
import { Column, ColumnsOrder } from '../../../boards/models/column.interface';
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

  deleteColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.DELETE_COLUMN),
      mergeMap((action: Column) => {
        return this.columnsService
          .deleteColumn(action._id!, action.boardId!)
          .pipe(
            map(() => {
              return columnsActions.deleteColumnSuccess({ _id: action._id! });
            })
          );
      })
    );
  });

  updateColumnsOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.UPDATE_COLUMNS_ORDER),
      mergeMap((action: { columns: ColumnsOrder[]; type: string }) => {
        return this.columnsService.updateColumns(action.columns).pipe(
          map(columns => {
            return columnsActions.updateColumnsOrderSuccess({ columns });
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
