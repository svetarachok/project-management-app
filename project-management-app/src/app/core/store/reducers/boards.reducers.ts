import { createReducer, on } from '@ngrx/store';

import { initialBoardState } from '../state/boards.state';
import * as BoardsActions from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialBoardState,
  on(BoardsActions.createNewBoardSuccess, (state, { board }) => ({
    boards: [...state.boards, board],
  })),
  on(BoardsActions.getBoardsSuccess, (state, boards) => ({
    boards: [...boards.boards],
  })),
  on(BoardsActions.deleteBoardsSuccess, (state, { _id: id }) => ({
    boards: [...state.boards].filter(board => board._id !== id),
  }))
);
