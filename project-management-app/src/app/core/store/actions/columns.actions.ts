import { createAction, props } from '@ngrx/store';
import { Column } from 'src/app/boards/models/column.interface';

export const GET_BOARD_ID = '[Board Page] Send Board ID to state';
export const CREATE_COLUMN = '[Board Page] Create New Column';
export const CREATE_COLUMN_SUCCESS = '[Board Page] New Column Created';

export const getBoardIdToStore = createAction(
  GET_BOARD_ID,
  props<{ boardId: string }>()
);

export const createNewColumn = createAction(
  CREATE_COLUMN,
  props<{ title: string; order: number; boardId: string }>()
);
export const createNewColumnSuccess = createAction(
  CREATE_COLUMN_SUCCESS,
  props<{ column: Column }>()
);
