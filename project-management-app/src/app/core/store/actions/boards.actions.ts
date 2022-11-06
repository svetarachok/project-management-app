import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.interface';

export const CREATE_BOARD = '[Main Page] Create New Board';
export const CREATE_BOARD_SUCCESS = '[Main Page] New Board Created';

export const createNewBoard = createAction(CREATE_BOARD, props<{ title: string, description: string }>());
export const createNewBoardSuccess = createAction(CREATE_BOARD_SUCCESS, props<{ boards: Board[] }>());