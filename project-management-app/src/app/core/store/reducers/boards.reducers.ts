import { createReducer, on } from '@ngrx/store';

import { BoardsState, initialBoardState } from '../state/boards.state';
import * as BoardsActions from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialBoardState,
  on(BoardsActions.createNewBoard, (state, board) => ({
    ...state,
    boards: [...state.boards, board.board],
  }))
);
