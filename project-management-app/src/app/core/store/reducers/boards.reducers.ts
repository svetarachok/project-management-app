import { createReducer, on } from '@ngrx/store';

import { initialBoardState } from "../state/boards.state";
import * as BoardsActions from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialBoardState,
  on(BoardsActions.createNewBoard, (state, { title, description }) => ({ boards: [...state.boards, { title, description}]}))
);