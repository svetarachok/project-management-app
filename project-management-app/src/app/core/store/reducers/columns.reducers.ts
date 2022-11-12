import { createReducer, on } from '@ngrx/store';

import { initialColumnState } from '../state/columns.state';
import * as ColumnsActions from '../actions/columns.actions';

export const columnsReducer = createReducer(
  initialColumnState,
  on(ColumnsActions.getBoardIdToStore, (state, { boardId }) => ({
    columns: [...state.columns],
    boardId: boardId,
  })),
  on(ColumnsActions.createNewColumnSuccess, (state, { column }) => ({
    columns: [...state.columns, column],
    boardId: state.boardId,
  })),
  on(ColumnsActions.getColumnsSuccess, (state, { columns }) => ({
    columns: [...columns],
    boardId: state.boardId,
  })),
  on(ColumnsActions.deleteColumnSuccess, (state, { _id: id }) => ({
    columns: [...state.columns].filter(column => column._id !== id),
    boardId: state.boardId,
  })),
  on(ColumnsActions.updateColumnsOrderSuccess, (state, { columns }) => ({
    columns: [...columns],
    boardId: state.boardId,
  }))
);
