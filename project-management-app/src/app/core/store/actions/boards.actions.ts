import { createAction, props } from '@ngrx/store';

export const CREATE_BOARD = '[Main Page] Create New Board';

export const createNewBoard = createAction(CREATE_BOARD, props<{ title: string, description: string }>());