import { createAction, props } from '@ngrx/store';

import { Board } from 'src/app/boards/models/board.interface';

export const CREATE_BOARD = '[Main Page] Create New Board';

export const createNewBoard = createAction(CREATE_BOARD, props<{ board: Board }>());