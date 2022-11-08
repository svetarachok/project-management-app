import { createReducer, on } from '@ngrx/store';

import { initialBoardState } from '../state/boards.state';
import * as BoardsActions from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialBoardState,
  on(BoardsActions.createNewBoard, (state, { title, description }) => ({
    boards: [...state.boards, { title, description }],
  })),
  on(BoardsActions.getBoards, (state, boards) => ({
    boards: [...state.boards, ...boards.boards],
  })),
  on(BoardsActions.deleteBoards, (state, { id }) => ({
    boards: [...state.boards].filter(board => board.id !== id),
  }))
);
