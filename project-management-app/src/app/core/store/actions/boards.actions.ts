import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.interface';

export const CREATE_BOARD = '[Main Page] Create New Board';
export const CREATE_BOARD_SUCCESS = '[Main Page] New Board Created';
export const GET_BOARDS = '[Boards Service] Get user boards from server';
export const GET_BOARDS_SUCCESS = '[Boards Service] Get user boards at state';
export const DELETE_BOARD = '[Main Page] Delete chosen board';
export const DELETE_BOARD_SUCCESS = '[Main Page] Board deleted';

export const createNewBoard = createAction(
  CREATE_BOARD,
  props<{ title: string; owner: string; users: string[] }>()
);
export const createNewBoardSuccess = createAction(
  CREATE_BOARD_SUCCESS,
  props<{ board: Board }>()
);

export const getBoards = createAction(GET_BOARDS, props<{ id: string }>());
export const getBoardsSuccess = createAction(
  GET_BOARDS_SUCCESS,
  props<{ boards: Board[] }>()
);

export const deleteBoards = createAction(
  DELETE_BOARD,
  props<{ _id: string }>()
);
export const deleteBoardsSuccess = createAction(
  DELETE_BOARD_SUCCESS,
  props<{ _id: string }>()
);
